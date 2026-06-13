const mongoose = require("mongoose");
const { logger } = require("../utils/reusable");

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        logger("\nDatabase connected..!");
    })
    .catch((err) => {
        logger("Database connection error : ", err);
    })
};


module.exports = connectDB;