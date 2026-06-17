const Profile = require("../Models/profile.model.js");

class ProfileDal {
    async createProfile(userId, profileDetails = {}, session = null) {
        if (!userId) return null;

        const profileData = {
            userId,
            name: profileDetails.name || "",
            avatar: profileDetails.avatar || "",
            bio: profileDetails.bio || "Write Your bio"
        };

        const [profile] = await Profile.create([profileData], { session });
        return profile;
    }

    async findProfileByUserId(userId) {
        if (!userId) return null;
        return await Profile.findOne({ userId });
    }
}

module.exports = new ProfileDal();