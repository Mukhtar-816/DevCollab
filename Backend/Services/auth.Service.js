import UserDal from "../Dal/userDal.js"
import CustomError from "../Utils/CustomError.js";
import reusable from "../Utils/reusable.js";


class Auth {

    userDal = new UserDal;

    register = async (username, email, password, ...reqData) => {
        const userExistByUsername = await this.userDal.findUserByKey({ username });
        const userExistByEmail = await this.userDal.findUserByKey({ email });

        if (userExistByEmail) throw new CustomError({ message: "Email Already Registered", status: 402, error: "Email Registered" })
        if (userExistByUsername) throw new CustomError({ message: "Username Already Taken", status: 402, error: "UserName Taken" })

        const passwordHash = await reusable.hashPassword(password);

        //save user in db for now
        const user = await this.userDal.createUser({
            username,
            email,
            passwordHash,
            isVerified: false
        });

        const { accessToken, refreshToken } = await reusable.generateTokens({ userId: user._id });
        const sessionId = reusable.generateRandomId();
        const sessionHashed = reusable.hashKey(refreshToken);
        //create Session
        const session = {
            sessionId,
            userId: user._id,
            sessionHashed,
            revoked: false,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        };

        //kept session id beacuse will use redis here for saving it now now


        return {
            user,
            accessToken,
            refreshToken
        };


    };


    login = async (email, password) => {
        const userExist = this.userDal.findUserByKey({ email });

        if (!userExist) throw new CustomError({ message: "User Doesn't Exist", status: 402 });

        const validate = await reusable.comparePassword(password, userExist.passwordHash);

        if (!validate) return new CustomError({ message: "Invalid Email or Password", status: 403 });

        //for future check session count

        const { accessToken, refreshToken } = await reusable.generateTokens({ userId: userExist._id });
        const sessionId = reusable.generateRandomId();
        const sessionHashed = reusable.hashKey(refreshToken);
        //create Session
        const session = {
            sessionId,
            userId: user._id,
            sessionHashed,
            revoked: false,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        };

        //kept session id beacuse will use redis here for saving it now now


        return {
            user,
            accessToken,
            refreshToken
        };

    }
};


export default Auth;