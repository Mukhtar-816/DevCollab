import express from "express";
import authController from "../controllers/auth.Controller.js";


const Router = express.Router();


Router.route("/login").post(authController.login);
Router.route("/register").post(authController.register);
Router.route("/refresh-access-token").post(authController.refreshAccessToken);
Router.route("/register/verify").post(authController.register);

export default Router;