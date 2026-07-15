const invitationService = require("../services/invitation.service");
const CustomError = require("../utils/CustomError");

const acceptInvitation = async (req, res, next) => {
    try {
        const { token } = req.body;
        const user = req.user; 

        if (!token) throw new CustomError(400, "Invitation token is required");

        await invitationService.acceptInvitation(token, user);

        return res.status(200).json({
            success: true,
            message: "Invitation accepted successfully. You have joined the project!"
        });
    } catch (error) {
        next(error); 
    }
};

const rejectInvitation = async (req, res, next) => {
    try {
        const { token } = req.body;
        const user = req.user;

        if (!token) throw new CustomError(400, "Invitation token is required");

        await invitationService.rejectInvitation(token, user);

        return res.status(200).json({
            success: true,
            message: "Invitation rejected successfully."
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    acceptInvitation,
    rejectInvitation
};