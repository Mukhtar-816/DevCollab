const { ActivityLog } = require("../Models/activityLog.model");

class activityLogDal {
    constructor() { };


    async findLogsByProjectId(projectId, { skip = 0, limit = 10 }) {
        if (!projectId) return null;

        return await ActivityLog.find({ projectId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('actorId', 'email')
            .lean();
    };

    async countLogsByProjectId (projectId) {
        return await ActivityLog.countDocuments({ projectId });
    };
};

module.exports =  new activityLogDal();