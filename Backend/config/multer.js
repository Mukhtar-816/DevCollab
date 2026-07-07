const multer = require("multer");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (!file || !file.mimetype) {
    return cb(new Error("Invalid file upload"), false);
  }

  if (file.mimetype.startsWith("image/")) {
    return cb(null, true);
  }

  return cb(new Error("Only image files are allowed"), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

const uploadSingleAvatar = upload.single("avatar");

module.exports = {
  upload,
  uploadSingleAvatar,
};