const authService = require("../services/auth.Service.js");
const CustomError = require("../utils/CustomError.js");
const zodValidator = require("../validators/zodValidator.js");

const login = async (req, res, next) => {
    try {
        const validatedData = zodValidator.loginSchemaValidator(req.body);
    } catch (error) {

    }
};


const register = async (req, res, next) => {
    try {
        const validatedData = zodValidator.registerSchemaValidator.safeParse(req.body);

        if (!validatedData.success) throw new CustomError({ message: "Invalid Data", status: 402, error: validatedData.error });
        const {username, email, password} = validatedData.data;
        const response = await authService.register(username, email, password);

        
        return res
            .status(200)
            .json({
                success: true,
                message: response?.message || "Otp has been sent to you.",
            })
    } catch (error) {
        next(error);
    };
};


const registerVerify = async (req, res, next) => {
    try {

        const { verificationCode, email } = req.body;
        if (!verificationCode || !email) throw new CustomError({ message: "Missing Required Feilds", status: 404 });

        const response = await authService.registerVerify(verificationCode, email);

        return res.cookie("refreshToken", response.refreshToken, {
            httpOnly: true,
            secure: process.env.PROD,
            sameSite: process.env.PROD ? "strict" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
            .status(201)
            .json({
                success: true,
                message: "you have been successfully registered",
            });

    } catch (error) {
        next(error);
    }
}


module.exports = {
    register, registerVerify
}