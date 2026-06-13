const express = require("express");
const { logger } = require("./utils/reusable");
const connectDB = require("./config/db");
require("dotenv").config();



const PORT = process.env.PORT || 3000;
const DEV = process.env.NODE_ENV == "DEV";

const app = express();


connectDB()
    .then(() => {
        app.listen(PORT, "0.0.0.0", () => {
            logger(`Server Initiated at http://localhost:${PORT}`);
        });
    });