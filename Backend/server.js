import express from "express"
import dotenv from "dotenv"
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import connectDatabase from "./config/db.js";
import authRoutes from "./Routes/auth.Routes.js";
import mongoSanitizer from "./Utils/mongoosesanitizer.js";
import ErrorMiddleware from "./middleware/errorMiddleware.js";


//constants
const PORT = process.env.PORT || 5000;
const production = process.env.NODE_ENV != 'development' || false;
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
};

//creating server
const app = express();


//built-in Middlewares
app.use(express.json());    //Json Format Parser
app.use(express({ urlencoded: true }));    //Url endcoded parser
app.use(cors(corsOptions));   //security restricted origin
app.use(cookieParser());     //Cookies Parser
app.use(morgan('dev'));      // Logs Reader

//Sanitizer
app.use(mongoSanitizer);


//routes 
app.use("/auth", authRoutes);




//Health check
app.get("/", (req, res) => {
    res.send("DevCollab Api is running");
});



//Error Middleware
app.use(ErrorMiddleware);

//Connect DB and start listening to server
await connectDatabase()
    .then(() => {
        app.listen(PORT, "0.0.0.0", () => {
            !production && console.log(`Server is Running on Port : ${PORT}`)
        });
    });