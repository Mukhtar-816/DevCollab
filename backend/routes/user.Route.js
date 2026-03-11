const {Router : router} = require("express");
const Authorization = require("../middleware/Authorization.js");
const userController = require("../controllers/user.Controller.js");

const Router = router();


Router.route("/profile").get(Authorization, userController.getUserProfile);
Router.route("/profile").post(Authorization, userController.updateUserProfile);
Router.route("/profile/:id")

module.exports = Router;