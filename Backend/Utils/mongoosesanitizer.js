import {sanitize} from "mongo-sanitizer";

const mongoSanitizer = async (req, res, next) => {
    try {
        req.params = sanitize(req.params);
        req.body = sanitize(req.body);
        console.log("Sanitized");

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            success : false,
            message : "Invalid Input",
            error : error.message
        });
    }
};

export default mongoSanitizer;