const CustomError = require("../utils/CustomError.js");

const validate = (schema) => (req, res, next) => {
    if (!schema) return next();

    const result = schema.safeParse(req.body);

    if (!result.success) {
        const errorDetails = result.error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message
        }));

        return next(new CustomError(400, "Validation Failed", errorDetails));
    }

    req.body = result.data;
    next();
};

module.exports = validate;