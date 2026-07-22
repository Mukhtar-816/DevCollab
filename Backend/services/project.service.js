const invitationDal = require("../DAL/invitation.dal");
const projectDal = require("../DAL/project.dal");
const projectMemberDal = require("../DAL/projectMember.dal");
const CustomError = require("../utils/CustomError");

class projectService {
    constructor() { };


    async createProject(user, data) {
        if (!user._id || !user.email || !data) throw new CustomError(500, "Invalid Data");

        const project = await projectDal.createProject(user._id, data);

        if (!project) throw new CustomError(400, "Error Creating Project");

        const isAlreadyMember = await projectMemberDal.getProjectMember(user._id, project._id);

        if (isAlreadyMember) {
            return project;
        }
        const memberAdded = await projectMemberDal.createProjectMember({
            projectId : project._id,
            userId : user._id,
            email : user.email,
            role : 'Owner'
        });
        if (!memberAdded) throw new CustomError(400, "Project Owner didn't become owner");

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

        if (project?.visibility === 'private') {
            const isMember = await projectMemberDal.getProjectMember(userId, projectId);
            if (project?.ownerId != userId && !isMember) {
                throw new CustomError(403, "Forbidden");
            }
        }
        return project;
    };

    async getProjectMembers(projectId) {
        if (!projectId) throw new CustomError(404, "Project ID is required");

        const projectMembers = await projectMemberDal.getProjectMembers(projectId);

        return projectMembers;
    }

    async getProjectInvitations(projectId) {
        if (!projectId) throw new CustomError(404, "Project ID is required");

        const projectInvitations = await invitationDal.getInvitations('projectId',projectId);

        return projectInvitations;
    }
};



module.exports = new projectService();