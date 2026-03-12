const CustomError = require("../utils/CustomError");

const errorMiddleware = (err, req, res, next) => {

  // Convert unknown errors into CustomError
  const error =
    err instanceof CustomError
      ? err
      : new CustomError({
          message: err.message,
          status: 500
        });

  return res.status(error.status).json({
    success: false,
    message: error.message,
    errors: error.errors || null,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack
    }),
  });

};

module.exports = errorMiddleware;