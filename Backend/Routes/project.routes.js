const Router = require("express").Router();
const authorizationMiddleware = require("../middlewares/authorization.middleware.js");
const projectController = require("../controllers/project.controller.js");


// Router.route("/");

Router.route("/create").post(authorizationMiddleware, projectController.createProject);

Router.route("/:id")
.delete(authorizationMiddleware, projectController.deleteProject)
.put(authorizationMiddleware, projectController.updateProject)
.get(authorizationMiddleware, projectController.getProjectById);



module.exports = Router;
