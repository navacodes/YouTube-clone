import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Video from "./Video.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    channelName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
      select: false,
    },
    profileImg: {
      type: String,
      default: "https://res.cloudinary.com/ddnvqcnmt/image/upload/v1697865248/blankProfile_drmc0g.jpg",
    },
    country: String,
    videos: [String],
  },
  { timestamps: true }
);

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.getVideos = async function (videoType) {
  try {
    const videoIds = this.videos;
    const videos = await Video.find({
      _id: { $in: videoIds },
      videoType: videoType,
    }).select("-_id -createdBy -updatedAt -__v"); // Exclude _id and userId (already included in populate)
    return videos;
  } catch (error) {
    console.error("Error fetching videos:", error);
    throw error; // Re-throw the error for proper handling
  }
};

const User = mongoose.model("User", userSchema);

export default User;
