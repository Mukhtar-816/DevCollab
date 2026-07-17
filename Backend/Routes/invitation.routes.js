const authorizationMiddleware = require("../middlewares/authorization.middleware");
const invitationController = require("../controllers/invitation.controller");

const Router = require("express").Router();



Router.route("/accept")
.post(authorizationMiddleware, invitationController.acceptInvitation);
Router.route("/reject")
.post(authorizationMiddleware, invitationController.rejectInvitation);

Router.route("/me").get(authorizationMiddleware, invitationController.getMyInvitations);

module.exports = Router;