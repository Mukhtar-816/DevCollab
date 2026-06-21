const redisDal = require("../DAL/redis.dal.js");
const userDal = require("../DAL/user.dal");
const profileDal = require("../DAL/profile.dal.js");
const reusable = require("../utils/reusable.js");
const sessionService = require("./session.service.js");
const CustomError = require("../utils/CustomError.js");
const {runInTransaction} = require("../utils/transaction.helper.js");

class AuthService {
    constructor() {};

    async login(email, password) {
        if (!email || !password || !email.includes("@")) {
            throw new CustomError(401, "Invalid Credentials Format");
        }

        const userExist = await userDal.findUserByKey("email", email);
        if (!userExist) {
            throw new CustomError(400, "User Doesn't exist");
        }

        const comparePass = await reusable.comparePassword(password, userExist.passwordHash);
        if (!comparePass) {
            throw new CustomError(400, "Invalid email or password");
        }

        const { accessToken, refreshToken } = reusable.generateTokens({ _id: userExist._id });
        await sessionService.createSession(userExist._id, refreshToken);

        return {
            success: true,
            accessToken,
            refreshToken,
            message : "Logged In Successfully"
        };
    };

    async register(email, password, ...reqData) {
        if (!email || !password || !email.includes("@")) {
            throw new CustomError(401, "Invalid Credentials Format");
        }

        const user = await userDal.findUserByKey("email", email);
        if (user) {
            throw new CustomError(400, "user already registered");
        }

        const passwordHash = await reusable.hashPassword(password);
        const otp = reusable.generateOtp();

        const tempUser = {
            email,
            passwordHash,
            isVerified: false
        };

        await redisDal.set(`temp:user:${email}`, tempUser, 600);
        await redisDal.set(`otp:${email}`, otp, 600);

        return {
            success: true,
            message: `Otp sent Successfully to ${email}`
        };
    };

    async registerVerify(email, otp) {
        const redisClient = require("../config/redis.js");
        
        const [userExist, savedOtp] = await Promise.all([
            redisDal.get(`temp:user:${email}`),
            redisDal.get(`otp:${email}`)
        ]);

        if (!userExist) {
            throw new CustomError(404, "Registration session expired");
        }
        if (!savedOtp) {
            throw new CustomError(400, "OTP has expired");
        }
        if (String(savedOtp) !== String(otp)) {
            throw new CustomError(400, "Invalid OTP");
        }

        const results = await redisClient.multi()
            .del(`temp:user:${email}`)
            .del(`otp:${email}`)
            .exec();

        if (!results || results[1][1] === 0) {
            throw new CustomError(409, "Verification processing error, try again");
        }

        return await runInTransaction(async (dbSession) => {
            const user = await userDal.createUser({ ...userExist, isVerified: true }, dbSession);
            await profileDal.createProfile(user._id, { name: userExist.name }, dbSession);

            const { accessToken, refreshToken } = reusable.generateTokens({ _id: user._id });
            await sessionService.createSession(user._id, refreshToken);

            return {
                success: true,
                user,
                accessToken,
                refreshToken,
                message : "Registration Successfull."
            };
        });
    }
    async refreshAccessToken(refreshToken) {
        const { decoded, success } = reusable.verifyToken(refreshToken, "refresh");
        if (!success) {
            throw new CustomError(403, "Invalid Token");
        }

        const _id = decoded._id;
        const currentSession = await sessionService.getCurrentSession(_id);
        
        if (!currentSession || currentSession.revoked) {
            throw new CustomError(403, "Session Expired or Invalid");
        }

        const incomingHash = reusable.generateHash(refreshToken);
        if (currentSession.refreshTokenHashed !== incomingHash) {
            await sessionService.revokeSession(_id);
            throw new CustomError(403, "Token Reuse Detected, Session Revoked");
        }

        const { accessToken, refreshToken: newToken } = reusable.generateTokens({ _id: _id });
        await sessionService.createSession(_id, newToken);

        return {
            success: true,
            accessToken,
            newToken,
            message : "Token Reissued Successfully"
        };
    };
};

module.exports = new AuthService();