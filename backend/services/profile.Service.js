const profileDal = require("../DAL/profileDal.js");
const CustomError = require("../utils/CustomError.js");

class profileService {
    constructor() {};


    async createUserProfile(user) {
        const profileData= {
            userId : user._id,
            name : user.username,
            socials : {}
        };

        const profile = await profileDal.createProfile(profileData);
        if (!profile) throw new CustomError({message : "Error creating profile", status : 400});

        return profile;
    };


    async getUserProfile(id) {
        const userProfile = await profileDal.findProfileByKey({userId:id});

        if (!userProfile) throw new CustomError({message : "Profile doesnt exist", status : 404});

        return userProfile;
    }

    async updateUserProfile(userId, data) {
        const updatedData = {};
        
        // Use Object.keys to iterate through the data object
        Object.keys(data).forEach(key => {
            if (data[key] !== undefined) {
                updatedData[key] = data[key];
            }
        });

        // Pass BOTH the userId and the filtered data to the DAL
        const profile = await profileDal.updateProfile(userId, updatedData);
        
        if (!profile) throw new CustomError({message: "Update failed", status: 400});
        return profile;
    }
};


module.exports = new profileService();