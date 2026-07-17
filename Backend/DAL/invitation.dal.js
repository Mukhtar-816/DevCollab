const invitation = require("../Models/invitation.model");

class invitationDal {
    constructor() { };

    async getInvitation(query) {
        if (!query || typeof query !== 'object' || Object.keys(query).length === 0) {
            return null;
        }

        return await invitation.findOne(query).lean();
    };

    async createInvitation(object) {
        if (Object.entries(object).length == 0) return null;

        return await invitation.create(object);
    }

    async updateInvitationStatus(query, status) {
        if (!query || !['accepted', 'rejected', 'expired'].includes(status)) return null;

        return await invitation.findOneAndUpdate(query, { "$set": { status: status } }, { runValidators: true, returnDocument: 'after' }).lean();
    }

    async getInvitations(key, value) {
        if (!key || !value) return null;

        return await invitation.find({ [key]:value, status: 'pending' }).lean();
    }


};


module.exports = new invitationDal();