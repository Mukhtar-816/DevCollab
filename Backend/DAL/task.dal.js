const Task = require("../Models/task.model.js");

class taskDal {
    constructor() { };


    async createTask(taskData) {
        if (!taskData || Object.entries(taskData)?.length == 0) return null;

        return await Task.create(taskData);
    };

    async getTasksByProjectId(projectId) {
        if (!projectId) return null;

        return await Task.find({ projectId }).lean();
    }

    async getTaskByKey(key) {
        if (!key || Object.entries(key).length === 0) return null;

        return await Task.findOne(key)
            .populate({
                path: 'assigneesId',
                select: 'email',
                model: 'ProjectMember'
            })
            .lean();
    };

    async updateTask(key, data) {
        if (!key || Object.entries(key).length == 0 || !data || Object.entries(data).length == 0) return null;

        return await Task.findOneAndUpdate(key, { '$set': data }, { returnDocument: 'after' }).lean();
    };

    async deleteTask(key) {
        if (!key || Object.entries(key).length == 0) return null;

        return await Task.findOneAndDelete(key);
    };


};


module.exports = new taskDal;