const Router = require("express").Router();
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const projectController = require("../controllers/project.controller.js");
const { requirePermission } = require("../middlewares/permission.middleware.js");
const { Permission } = require("../constants/permission.js");


// Router.route("/");

Router.route("/create").post(authorizationMiddleware, projectController.createProject);

Router.route("/:id")
.delete(authorizationMiddleware, requirePermission(Permission.DELETE_PROJECT), projectController.deleteProject)
.put(authorizationMiddleware,requirePermission(Permission.UPDATE_PROJECT), projectController.updateProject)
.get(authorizationMiddleware, projectController.getProjectById);



module.exports = Router;
