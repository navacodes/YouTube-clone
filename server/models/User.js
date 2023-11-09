import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
      default:
        "https://res.cloudinary.com/ddnvqcnmt/image/upload/v1697865248/blankProfile_drmc0g.jpg",
    },
    country: String,
    videos: [String],
  },
  { timestamps: true }
);

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

export default User;
