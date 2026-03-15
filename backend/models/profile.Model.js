const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required for a profile"],
    unique: true,
    index: true 
  },

  name: {
    type: String,
    required: [true, "A display name is required"],
    maxlength: [20, "Name cannot exceed 20 characters"],
    trim: true
  },

  avatar: {
    type: String,
    trim: true,
    default: "https://res.cloudinary.com/demo/image/upload/d_avatar.png/default.png"
  },

  bio: {
    type: String,
    maxlength: [200, "Bio is too long"],
    trim: true,
    default: "New developer on DevCollab!"
  },

  // Added role here to match your UI's "Senior Frontend Engineer" etc.
  roleTitle: {
    type: String,
    trim: true,
    default: "Full Stack Developer"
  },

  skills: {
    type: [String],
    default: [],
    index: true // Indexing this allows for fast matchmaking searches
  },
  
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      default: [0, 0] // Default to center of the world or null
    }
  },

  socials: {
    github: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    twitter: { type: String, trim: true },
    portfolio: { type: String, trim: true }
  }

}, { timestamps: true });

// Crucial for Geospatial queries (finding nearby devs)
profileSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Profile", profileSchema);