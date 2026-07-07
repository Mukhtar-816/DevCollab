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
}, {timestamps : true});

module.exports = mongoose.model("ProjectMember", projectMemberSchema);