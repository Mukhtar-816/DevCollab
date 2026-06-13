const mongoose = require("mongoose");


const User = mongoose.Schema.create(
    {
        uid : {
            unique : true,
            required:true,
            type : String
        },
        email : {
            type : String,
            required : true,
            unique : true,
            lowercase : true,
            trim:true
        },
        password : {
            type : String,
            required : true,
            minlength : 8
        },
        authType : {
            type : String,
            enum : ["local", "google"],
            default : "local"
        },
        createdAt : {
            type : Date,
            required : true,
            default : Date.now()
        },
        updatedAt : {
            type : Date,
            required : true,
            default : Date.now()
        }
    },
    {
        timestamps : true
    }
);

module.exports = mongoose.model("User", User);