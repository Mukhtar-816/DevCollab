const userDal = require("../DAL/user.Dal.js");
const redisDal = require("../DAL/redis.Dal.js");
const CustomError = require("../utils/CustomError");
const reusable = require("../utils/reusable.js");

class AuthService {
    constructor() { };

    async register(username, email, password, ...data) {
        const userExistByUsername = await userDal.findUserByKey({username});
        const userExistByEmail = await userDal.findUserByKey({email});


        if (userExistByEmail) throw new CustomError({ message: "Email already registered", status: 402, error: "Email already Taken" });
        if (userExistByUsername) throw new CustomError({ message: "username already registered", status: 402, error: "username already Taken" });

        const passwordHash = await reusable.hashPassword(password);

        const otp = reusable.generateOtp();

        const user = {
            username,
            email, 
            passwordHash,
            isVerified : false,
        };

        // save in redis both the otp and temp user data;
        await redisDal.set(`temp:user:${email}`, user);
        await redisDal.set(`otp:${email}`, otp);

        return {
            success : true,
            message : `Otp sent successfully to ${email || "your email"}`
        };
    };


    async registerVerify (otp, email) {
        const userExist = await redisDal.getDel(`temp:user:${email}`);

        if (!userExist) throw new CustomError({message : "user registeration Expired.", status : 404});

        const savedOtp = await redisDal.getDel(`otp:${email}`);

        if (!savedOtp) throw new CustomError({message : "OTP has been expired" ,status : 404});

        if (savedOtp != otp) throw new CustomError({message : "Invalid Otp", status : 402, error : "Invalid Otp"});

        // save in db

        const user = await userDal.createUser(userExist);

        const {accessToken, refreshToken} = reusable.generateTokens({_id : user._id});

        //createSessions later

        return {
            success : true,
            user,
            accessToken, refreshToken
        };
    }
};


module.exports = new AuthService();