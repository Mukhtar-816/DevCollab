const mongoose = require("mongoose");

const Profile = mongoose.Schema.create(
    {
        uid : {
            type : String,
            required : true,
            unique : true
        },
        userId : {
            type : mongoose.Schema.ObjectId,
            ref : User
        },
        name : {
            type : String,
            trim : true,
            maxlength : 30
        },
        avatar : {
            type : String,
            default : ""
        },
        bio : {
            type : String,
            maxlength : 100
        },
    },
    { timestamps : true}
);