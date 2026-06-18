const profileDal = require("../DAL/profile.dal");
const userDal = require("../DAL/user.dal");
const CustomError = require("../utils/CustomError.js");


class UserService {
    constructor() { };


    async getUserProfile(userId) {

        if (!userId) throw new CustomError(400, "Missing Paraams");

        const [userDoc, profileDoc] = await Promise.all([
            userDal.findUserByKey("_id", userId),
            profileDal.findProfileByUserId(userId)
        ]);


        if (!userDoc || !profileDoc) throw new CustomError(404, "User Profile Not Found");

        const user = userDoc.toObject();
        const profile = profileDoc.toObject();

        return {
            _id: profile._id,
            email: user.email,
            name: profile.name,
            avatar: profile.avatar,
            bio: profile.bio
        };
    };


    async updateUserProfile(userId, profileUpdates) {

        if (!userId || !profileUpdates || typeof profileUpdates !== "object" || Object.keys(profileUpdates).length === 0) throw new CustomError(400, "Forbidden");

        const profileDoc = await profileDal.findProfileByUserId(userId);

        if (!profileDoc) throw new CustomError(404, "Profile Not Found");

        profileDoc.toObject();

        const allowedUpdates = ["avatar", "bio", "name"];
        const filteredUpdates = {};
        let isChanged = false;


        Object.entries(profileUpdates).forEach(([key, value]) => {
            if (allowedUpdates.includes(key) && value != undefined && profileDoc[key] !== value) {
                filteredUpdates[key] = value;
                isChanged = true;
            }
        });

        if (!isChanged) {
            return {
                _id: profileDoc._id,
                name: profileDoc.name,
                avatar: profileDoc.avatar,
                bio: profileDoc.bio,
                message: "No changes detected, profile remains identical"
            };
        };

        const updatedProfile = await profileDal.updateProfile(userId, filteredUpdates);

        if (!updatedProfile) {
            throw new CustomError(400, "Update Failed");
        }

        return {
            _id: updatedProfile._id,
            name: updatedProfile.name,
            avatar: updatedProfile.avatar,
            bio: updatedProfile.bio
        };

    };

};


module.exports = new UserService();