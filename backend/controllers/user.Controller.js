const profileService = require("../services/profile.Service");

const getUserProfile = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) throw new CustomError({ message: "Unauthorized", status: 403 });

        const response = await profileService.getUserProfile(user._id);

        return res.status(200).json({
            success: true,
            message: "Profile Found Successfully",
            profile: response
        });
    } catch (error) {
        next(error);
    }
};

const updateUserProfile = async (req, res, next) => {
    try {
        const { name, skills, socials, bio } = req.body;
        const userId = req.user._id;

        if (!name && !skills && !socials && !bio) {
            return res.status(400).json({
                success: false,
                message: "No update data provided"
            });
        }

        const updatedProfile = await profileService.updateUserProfile(userId, { 
            name, 
            skills, 
            socials, 
            bio, 
        });

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            profile: updatedProfile
        });

    } catch (error) {
        next(error);
    }
};


module.exports = {
    getUserProfile,
    updateUserProfile
}



