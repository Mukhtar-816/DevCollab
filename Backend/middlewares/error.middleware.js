const { logger } = require("../utils/reusable");
const CustomError = require("../utils/CustomError");

const errorMiddleware = (err, req, res, next) => {
    
    if (err instanceof Error) {
        logger(err.message);
    } else {
        logger(String(err));
    }

    let statusCode = 500;
    let message = "Internal Server Error";
    let details = null;

    if (err instanceof CustomError) {
        statusCode = err.status;
        message = err.message;
        details = err.details;
    } else if (err?.name === "ZodError") {
        // Handle direct/unwrapped Zod Errors gracefully
        statusCode = 400;
        message = "Validation Failed";
        details = err.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message
        }));
    } else if (err instanceof Error) {
        message = err.message;
        if (err.name === "ValidationError") {
            statusCode = 400;
        }
    } else if (typeof err === "string") {
        message = err;
    }

    const responsePayload = {
        success: false,
        error: message,
        ...(details && { details }),
        ...(process.env.NODE_ENV === "DEV" && { stack: err instanceof Error ? err.stack : null })
    };

    return res.status(statusCode).json(responsePayload);
};

module.exports = errorMiddleware;