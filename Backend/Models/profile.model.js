const mongoose = require("mongoose");

const Profile = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    name: {
      type: String,
      trim: true,
      maxlength: 30
    },
    avatar: {
      type: String,
      default: ""
    },
    bio: {
      type: String,
      maxlength: 100
    },
    skills: {
      type: String,
      default: ""
    },
    socials: {
      github: {
        type: String,
        default: ""
      },
      portfolio: {
        type: String,
        default: ""
      }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Profile", Profile);