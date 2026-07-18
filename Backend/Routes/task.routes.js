const router = require("express").Router();
const AuthorizationMiddleware = require("../middlewares/authorization.middleware");
const taskController = require("../controllers/task.controller.js");
const { requirePermission } = require("../middlewares/permission.middleware.js");
const { Permission } = require("../constants/permission.js");

router.route("/:id/task")
.get(AuthorizationMiddleware, taskController.getProjectTasks)
.post(AuthorizationMiddleware, requirePermission(Permission.CREATE_TASK), taskController.createProjectTask);

module.exports = router;