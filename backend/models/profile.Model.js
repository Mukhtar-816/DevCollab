const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required for a profile"],
    unique: true,
    index: true // Speeds up lookups in the ProfileService
  },

  name: {
    type: String,
    maxlength: [20, "Name cannot exceed 20 characters"],
    trim: true
  },

  avatar: {
    type: String,
    trim: true,
    // Tip: Store the full URL if using Cloudinary/S3, 
    // or just the filename if using local Multer storage.
    default: "default-avatar.png"
  },

  bio: {
    type: String,
    maxlength: [200, "Bio is too long"],
    trim: true
  },

  skills: {
    type: [String],
    default: [] // Good for filtering developers by tech stack
  },
  
  location: {
    type: {
      type: String,
      enum: ['Point'], // 'type' must be 'Point'
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },

  // Flattened socials for easier "Service Layer" updates
  socials: {
    github: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    twitter: { type: String, trim: true },
    portfolio: { type: String, trim: true }
  }

}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);