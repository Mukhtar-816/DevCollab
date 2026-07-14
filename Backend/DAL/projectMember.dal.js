const ProjectMember = require("../Models/projectMember.model.js");
const CustomError = require("../utils/CustomError.js");

class projectMemberDal { 
    constructor(){};

   async getProjectMember (userId, projectId) {
        if (!userId || !projectId) return null;
        return await ProjectMember.findOne({ userId, projectId }).lean();
    }

    async createProjectMember (userId, projectId, role='Guest') {
        if (!userId || !projectId) return null;
        return await ProjectMember.create({ projectId, userId, role });
    };

    async deleteProjectMember (userId, projectId) {
        if (!userId || !projectId) return null;
        return await ProjectMember.findOneAndDelete({ projectId, userId });
    };

    async findAllProjectMembers (projectId) {
        if (!projectId) return []; 

        return await ProjectMember.find({ projectId }).lean();
    };

    async deleteProjectMembers (projectId, userId) {
        let idkey = 'projectId';
        let idvalue = projectId;
        if (!projectId && !userId) return null;

        if (!projectId) {
            idkey = 'userId';
            idvalue = userId;
        }

        return await ProjectMember.deleteMany({[idkey] : idvalue});
    }
}

module.exports = new projectMemberDal();