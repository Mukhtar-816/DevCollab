const Profile = require("../models/profile.Model.js");

class profileDal {
    constructor() { };


    async createProfile(data) {
        if (!data) return null;
        console.log(data);

        return await Profile.create(data);
    };

    async findProfileByKey(key) {
        if (!key) return null;

        return await Profile.findOne(key);
    };

    async findProfileById(id) {
        if (!id) return null;

        return await Profile.findById(id);
    };

    async updateProfile(userId, data) {
        if (!data || !userId) return null;

        // Use { new: true } to get the document AFTER the update
        return await Profile.findOneAndUpdate(
            { userId: userId },
            { "$set": data },
            { new: true }
        );
    }
};


module.exports = new profileDal();