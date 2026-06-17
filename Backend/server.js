const express = require("express");
const { logger } = require("./utils/reusable");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();
const morgan = require("morgan");
const authRoutes = require("./Routes/auth.routes.js");
const errorMiddleware = require("./middlewares/error.middleware.js");


const CORSOPTIONS = {
    origin : "http://localhost:3000",
    credentials : true,
};

const PORT = process.env.PORT || 3000;
const DEV = process.env.NODE_ENV == "DEV";

const app = express();

app.use(express.json())
app.use(express({urlencoded : true}));
app.use(cors(CORSOPTIONS));
app.use(morgan("dev"));


app.use("/auth", authRoutes);



//health check
app.get("/", (req, res) => {
    res.send("Server Running...!");
});

//error middleware
app.use(errorMiddleware);

connectDB()
    .then(() => {
        require("./config/redis.js");
        app.listen(PORT, "0.0.0.0", () => {
            logger(`Server Initiated at http://localhost:${PORT}`);
        });
    });