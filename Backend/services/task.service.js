const taskDal = require("../DAL/task.dal");
const CustomError = require("../utils/CustomError");

class taskService  {
    constructor() {};


    async createTask (reporterId, projectId, projectData) {
        if (!reporterId || !projectId || Object.entries(projectData)?.length == 0) throw new CustomError(400, "Required Details Missing");

        if (projectData?.assigneesId?.length == 0) throw new CustomError(400, "Task must be assigned to atleast one member");

        if (projectData?.dueDate && new Date(projectData.dueDate) < Date.now()) throw new CustomError(400, "Invalid Due Date");

        if (!['low', 'medium', 'high'].includes(projectData?.priority?.toLowerCase())) throw new CustomError(400, "Invalid Priority");

        const createdTask = await taskDal.createTask({
            projectId,
            reporterId,
            title : projectData?.title,
            description : projectData?.description,
            status : projectData?.status,
            priority : projectData?.priority || 'medium',
            dueDate : projectData?.dueDate || null,
            assigneesId : projectData?.assigneesId
        });

        if (!createdTask) throw new CustomError(400, "Error Creating Task");

        return createdTask;
    };


    async getTasks(projectId) {
        if (!projectId) throw new CustomError(400, "ProjectId is required");

        const tasks = await taskDal.getTasksByProjectId(projectId);

        if (!tasks) return [];

        return tasks;
    }
}

module.exports = new taskService();