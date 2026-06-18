const multer = require("multer");
const CustomError = require("../utils/CustomError.js");

const storage = multer.memoryStorage();

const fileFilter = (req, file, next) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    
    if (!allowedTypes.includes(file.mimetype)) throw new CustomError(404, "Invalid Format");

    next(null, true);
}

const upload = multer({
    storage,
    fileFilter,
    limits : 2 * 1024 * 1024 //2mb
});

// const uploadSingleFile = ()