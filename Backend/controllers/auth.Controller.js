import { success } from "zod";
import Auth from "../Services/auth.Service.js";
import CustomError from "../Utils/CustomError.js";
import ZodValidator from "../validators/ZodValidator.js";


const auth = new Auth;


const register = async (req, res, next) => {
    try {
        const validatedData = ZodValidator.registerSchemaValidator.safeParse(req.body);

        if (!validatedData.success) {
            return next(
                new CustomError({
                    message: "Invalid input data",
                    statusCode: 400,
                    error: validatedData.error
                })
            );
        }

        const { username, email, password } = validatedData?.data;

        const response = await auth.register(username, email, password);

        res.cookie("refreshToken", response.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'prod',
            sameSite: process.env.NODE_ENV == 'prod' ? "strict" : "lax",
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        return res.status(200).json({
            success: true,
            message: "Registered Successfully",
            accessToken: response.accessToken
        });

    } catch (error) {
        next(error);
    }
};


const login = async (req, res, next) => {
    try {
        const validatedData = ZodValidator.loginSchemaValidator.safeParse(req.body);

        if (!validatedData.success) {
            return next(
                new CustomError({
                    message: "Invalid input data",
                    statusCode: 400,
                    error: validatedData.error
                })
            );
        }

        const {  email, password } = validatedData?.data;

        const response = await auth.login(email, password);


        res.cookie("refreshToken", response.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'prod',
            sameSite: process.env.NODE_ENV == 'prod' ? "strict" : "lax",
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        });

        return res.status(200).json({
            success: true,
            message: "Logged In Successfully",
            accessToken: response.accessToken
        });

    } catch (error) {
        next(error);
    }
};

const refreshAccessToken = async (req, res) => {
    try {

    } catch (error) {

    }
};


export default {
    login, register, refreshAccessToken
};