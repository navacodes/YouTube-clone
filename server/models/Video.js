import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    mediaUrl: String,
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      max: 200,
    },
    views: {
      type: Number,
      default: 0,
    },
    videoType: {
      type: String,
      enum: ["video", "short"],
    },
    cloudinaryPublicId: {
      type: String,
      required: true,
    },
    privateVid: {
      type: Boolean,
      default: false,
    },
    createdBy: mongoose.Types.ObjectId,
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

export default Video;
