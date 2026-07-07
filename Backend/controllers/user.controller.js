const userService = require("../services/user.service");
const CustomError = require("../utils/CustomError.js");

const getUserProfile = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) throw new CustomError(400, "Forbidden");

        const response = await userService.getUserProfile(user._id);

        res.status(200).json({
            success: true,
            user: response,
            profile : response,
            message: "Profile Fetched Successfully"
        });

    } catch (error) {
        next(error);
    }
};





const updateUserProfile = async (req, res, next) => {
    try {
        const { name, bio, skills, avatar } = req.body;
        const user = req.user;
        const file = req?.file;

        if (!user) throw new CustomError(400, "Forbidden");

        const response = await userService.updateUserProfile(user._id, { name, bio, skills, avatar }, file);

        return res.status(201).json({
            success: true,
            message: "Profile Updated Successfully",
            profile: response
        });


    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {

    } catch (error) {

    }
};


module.exports = {
    getUserById, getUserProfile, updateUserProfile
};