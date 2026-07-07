const projectDal = require("../DAL/project.dal");
const projectMemberDal = require("../DAL/projectMember.dal");
const CustomError = require("../utils/CustomError");

class projectService {
    constructor() { };


    async createProject(userId, data) {
        if (!userId || !data) throw new CustomError(500, "Invalid Data");

        const project = await projectDal.createProject(userId, data);

        if (!project) throw new CustomError(400, "Error Creating Project");

        const isAlreadyMember = await projectMemberDal.getProjectMember(userId, project._id);

        if (isAlreadyMember) {
            return project;
        }

        await projectMemberDal.createProjectMember(userId, project._id);

        return project;
    };


    async deleteProject(userId, projectId) {
        const project = await projectDal.getProjectByKey('_id', projectId);
        if (!project) throw new CustomError(404, "Project not Found");

        if (project?.ownerId != userId) throw new CustomError(404, "Forbidden");

        const isProjectDeleted = await projectDal.deleteProject(projectId);

        if (!isProjectDeleted) throw new CustomError(400, "Error Deleting project");

        await projectMemberDal.deleteProjectMembers(projectId);
    };

    async updateProject(userId, projectId, updatedData) {
        const project = await projectDal.getProjectByKey('_id', projectId);
        if (!project) throw new CustomError(404, "Project not Found");

        if (project?.ownerId != userId) throw new CustomError(404, "Forbidden");

        const allowedUpdates = ['title', 'description', 'visibility'];
        const updatedContent = {};
        let hasChange = false;

        Object.entries(updatedData).forEach(([key, value]) => {
            if (allowedUpdates.includes(key) && value !== undefined && String(value).trim().length > 0) {
                updatedContent[key] = value;
                hasChange = true;
            }
        });

        if (!hasChange) return project;

        const updatedProject = await projectDal.updateProject(projectId, updatedContent);

        if (!updatedProject) {
            throw new CustomError(500, "Failed to update project. Please try again.");
        }

        return updatedProject;
    }

    async getProjectById(userId, projectId) {
        const project = await projectDal.getProjectByKey('_id', projectId);

        if (project?.visibility == 'private' && project?.ownerId != userId) throw new CustomError(403, "Forbidden");

        return project;
    };
};



module.exports = new projectService();