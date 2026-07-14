const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    ownerId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
    title : {
        type : String,
        required : true,
        minlength : 5
    },
    description : {
        type : String,
        maxlength : 300,
        default : "Write your project desription here"
    },
    visibility : {
        type : String,
        required : true,
        enum : ['private', 'public'],
        default : 'private'
    },
    memberCount : {
        type : Number,
        default : 1
    },
    status : {
        type : String,
        default : 'active',
    }
}, {timestamps : true});


module.exports = mongoose.model("Project", projectSchema);