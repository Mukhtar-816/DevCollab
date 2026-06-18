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
            message : "Profile Fetched Successfully"
        });

    } catch (error) {
        next(error);
    }
};





const updateUserProfile = async (req, res, next) => {
    try {
        const { name, avatar, bio } = req.body;
        const user = req.user;

        if (!user) throw new CustomError(400, "Forbidden");

        const response = await userService.updateUserProfile(user._id, {name, avatar, bio});

        return res.status(201).json({
            success : true,
            message : "Profile Updated Successfully",
            user:response
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