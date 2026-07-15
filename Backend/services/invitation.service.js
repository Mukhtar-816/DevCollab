const invitationDal = require("../DAL/invitation.dal");
const projectMemberDal = require("../DAL/projectMember.dal");
const userDal = require("../DAL/user.dal");
const CustomError = require("../utils/CustomError");
const reusable = require("../utils/reusable");

class invitationService {
    constructor() { };

    async inviteMemberByEmail(invitedEmail, role, projectId, userEmail) {
        if (invitedEmail.toLowerCase() === userEmail.toLowerCase()) {
            throw new CustomError(400, "You cannot invite yourself to this project");
        };

        const user = await userDal.findUserByKey('email', invitedEmail);
        if (user) {
            const isAlreadyMember = await projectMemberDal.getProjectMember({
                userId: user._id,
                projectId
            });
            if (isAlreadyMember) {
                throw new CustomError(400, "This user is already a member of this project");
            }
        }
        const invitationExist = await invitationDal.getInvitation({ projectId, invitedEmail });

        if (invitationExist) throw new CustomError(400, "Invitation Already sent");

        const token = reusable.generateRandomId();

        const invitation = await invitationDal.createInvitation({
            projectId,
            invitedEmail,
            role,
            token
        });

        if (!invitation) throw new CustomError(400, "Error Creating Invitation");

        // await reusable.sendMail({to, subject:"Invitation to Project on DevCollab", body:`You have been invited as ${role} in the project ${projectId}. You can join by clicking the link within 7 days, Link:http://localhost:5173/invite?token=${token}`});

        return;
    };


    async acceptInvitation (token, user) {
        const invitation = await invitationDal.getInvitation({token, invitedEmail:user.email});

        if (!invitation) throw new CustomError(404, "Invitation expired or doesn't exist");

        if (invitation.status !== 'pending') throw new CustomError(404, `Invitation Already ${invitation.status}`);

        await invitationDal.updateInvitationStatus({token, invitedEmail:user.email}, 'accepted');

        await projectMemberDal.createProjectMember({
            projectId : invitation.projectId,
            userId : user._id,
            role : invitation.role
        });

        return true;
    };

    async rejectInvitation (token, user) {
        const invitation = await invitationDal.getInvitation({token, invitedEmail:user.email});

        if (!invitation) throw new CustomError(404, "Invitation expired or doesn't exist");

        if (invitation.status !== 'pending') throw new CustomError(404, `Invitation Already ${invitation.status}`);

        await invitationDal.updateInvitationStatus({token, invitedEmail:user.email}, 'rejected');

        return true;
    }
};


module.exports = new invitationService();