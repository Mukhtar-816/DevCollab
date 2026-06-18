const Router = require("express").Router();
const userController = require("../controllers/user.controller.js");
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

Router.route("/profile").get(authorizationMiddleware, userController.getUserProfile);
Router.route("/profile").put(authorizationMiddleware, userController.updateUserProfile);


module.exports = Router;