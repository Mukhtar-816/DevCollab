const { default: mongoose } = require("mongoose");

const projectMemberSchema = new mongoose.Schema({
    projectId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Project",
        required : true
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    role: { 
    type: String, 
    required: true,
    enum: ['Owner', 'Admin', 'PM', 'Developer', 'Tester', 'Guest'],
    default: 'Guest'
  }
}, {timestamps : true});
projectMemberSchema.index({ projectId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("ProjectMember", projectMemberSchema);