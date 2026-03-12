const { ZodError } = require("zod");

class CustomError extends Error {
  constructor({ message, status = 500, error = null } = {}) {

    // Handle Zod validation errors
    if (error instanceof ZodError) {
      const formattedErrors = error.issues.map((e) => ({
        field: e.path.join("."),
        message: e.message
      }));

      super(message || "Validation Failed");
      this.status = status || 400;
      this.errors = formattedErrors;

    } else {

      super(message || "Internal Server Error");
      this.status = status;

      // Ensure errors is always an array or null
      this.errors = Array.isArray(error) ? error : null;
    }

    this.name = "CustomError";

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CustomError;