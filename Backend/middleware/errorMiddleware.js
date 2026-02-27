import CustomError from "../Utils/CustomError.js";

const ErrorMiddleware = async (err, req, res, next) => {
    let error = err;
    if (!(err instanceof CustomError)){
        error = new CustomError({
            message : err?.message || "Server Error",
            status : err?.status || 500,
            error : err?.error || []
        });
    };


    res.status(500).json({
        success : false,
        message : err.message,
        error:    err.error
    });
};


export default ErrorMiddleware;