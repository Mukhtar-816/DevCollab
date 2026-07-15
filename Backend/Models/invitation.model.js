const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
            required: true
        },
        invitedEmail: {
            type: String,
            lowercase : true,
            trim : true,
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ['Admin', 'Developer', 'Tester', 'Guest'],
            default: 'Developer'
        },
        token: {
            type: String,
            required: true,
            unique : true
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'rejected', 'expired'],
            default: 'pending'
        },
        expiresAt: {
            type : Date,
            default : () => {
            new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
        }
    },
    { timestamps: true }
);

invitationSchema.index({ expiresAt: 1 }, { expiresAfterSeconds:0 });

module.exports = mongoose.model("Invitation", invitationSchema);