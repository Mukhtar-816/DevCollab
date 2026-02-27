import { ZodError } from "zod";

class CustomError extends Error {
  constructor({ message, status = 500, error = null }) {
    super(message);

    this.status = status;
    this.success = false;
    this.error = [];

    if (error instanceof ZodError) {
      this.status = 400;
      this.message = "Validation failed";
      this.error = error.issues.map(issue => ({
        field: issue.path.join("."),
        message: issue.message
      }));
    }

    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default CustomError;