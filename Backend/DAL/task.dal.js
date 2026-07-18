const Task = require("../Models/task.model.js");

class taskDal {
    constructor () {};


    async createTask (taskData) {
        if (!taskData || Object.entries(taskData)?.length == 0) return null;
        
        return await Task.create(taskData);
    };

    async getTasksByProjectId (projectId) {
        if (!projectId) return null;

        return await Task.find({projectId}).lean();
    }

    
};


module.exports = new taskDal;