const taskService = require("../services/task.service.js");

const createProjectTask = async (req, res, next) => {
    try {
        const projectId = req.params?.id;
        const userId = req.user?._id;
        const {...projectData} = req.body;

        const response = await taskService.createTask(userId, projectId, projectData);

        return res.status(201).json({
            success : true,
            message : "Task created Successfully",
            task : response
        });
    } catch (error) {
        next(error);
    }
};


const getProjectTasks = async (req, res, next) => {
    try {
        const projectId = req.params?.id;

        const response = await taskService.getTasks(projectId);

        return res.status(200).json({
            success : true,
            message : "Tasks Fetched Successfully",
            tasks : response
        })
    } catch (error) {
        next(error);
    }
};


module.exports = {
    createProjectTask,
    getProjectTasks
};