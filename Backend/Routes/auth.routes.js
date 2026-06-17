const Router = require("express").Router();
const authController = require("../controllers/auth.controller.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const validate = require("../middlewares/validator.middleware.js");
const { loginSchema, registerSchema } = require("../validators/zodValidator.js");

Router.route("/login").post(validate(loginSchema), authController.loginController);
Router.route("/register/verify").post(authController.registerVerifyController);
Router.route("/register").post(validate(registerSchema), authController.registerController);
Router.route("/refresh-access-token").post(authController.refreshAccessTokenController);
Router.route("/logout").post(authorizationMiddleware, authController.logoutController);
// Router.route("/forgot-password").post((req, res) => res.send("login"));

module.exports = Router;