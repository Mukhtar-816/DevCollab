const CustomError = require("../utils/CustomError.js");
const reusable = require("../utils/reusable.js");

const authorizationMiddleware = async (req, res, next) => {
    try {
        const headers = req.headers?.authorization || false; //Custom for security

        if (!headers) throw new CustomError(400, "Missing headers" );

        const [scheme, token] = headers.split(" ");
        if (scheme != "Bearer" || !token) throw new CustomError(400, "Forbidden");

        const decoded = reusable.verifyToken(token, "access");

        if (!decoded) throw new CustomError(400, "invalid Token");

        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
};


module.exports = authorizationMiddleware;