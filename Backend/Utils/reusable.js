import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CustomError from "./CustomError.js";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();


const hashPassword = async (pwd, saltRounds = 12) => {
    return await bcrypt.hash(pwd, saltRounds);
};

const comparePassword = async (plainPwd, hashPwd) => {
    return await bcrypt.compare(plainPwd, hashPwd);
};


const generateTokens = async (payload) => {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
    const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET_KEY, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY })

    return {
        accessToken, refreshToken
    };
};

const verifyToken = async (token, type = "access") => {
    try {
        const verify = jwt.verify(token, type == "access" ? process.env.ACCESS_TOKEN_SECRET_KEY : process.env.REFRESH_TOKEN_SECRET_KEY);
        return verify;
    } catch (error) {
        throw new CustomError({
            message: error.message || "Invalid Token",
            status: error.status || 401,
            error: error || "Token Error"
        })
    }
};


const hashKey = (key) => {
    if (!key) {
        throw new Error("hashKey: key is required and must be a string");
    }

    return crypto
        .createHash("sha512")
        .update(String(key))
        .digest("hex");
};

const generateRandomId = () => {
    return crypto.randomUUID();
};


export default {
    hashPassword,
    comparePassword,
    generateTokens,
    verifyToken,
    hashKey,
    generateRandomId
};