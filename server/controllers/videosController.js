import catchAsync from "../utility/catchAsync.js";
import { v2 as cloudinary } from "cloudinary";
import Video from "../models/Video.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const postMyVideoOnCloudinary = async (req, res) => {
  try {
    // Upload to Cloudinary
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    // console.log("datauri", dataURI);
    const cloudinaryResult = await cloudinary.uploader.upload(dataURI, { resource_type: "video" });

    // Return the public URL of the uploaded video
    res.status(200).json({
      status: "success",
      videoUrl: cloudinaryResult.secure_url,
      vidDuration: cloudinaryResult.duration,
      public_id: cloudinaryResult.public_id,
    });
  } catch (e) {
    res.status(500).json({ status: "error", message: e.message || "Server Error" });
  }
};

export const publishMyVideo = catchAsync(async (req, res) => {
  const newVideo = new Video({
    title: req.body.title,
    description: req.body.description,
    privateVid: req.body.privateVid,
    mediaUrl: req.body.mediaUrl,
    videoType: req.body.videoType,
    createdBy: new mongoose.Types.ObjectId(req.body.createdBy),
    cloudinaryPublicId: req.body.cloudinaryPublicId,
  });

  await newVideo.save();

  const creator = await User.findById(req.body.createdBy);
  creator.videos.push(newVideo._id);

  await creator.save();
  res.status(200).json({ message: `Video uploaded successfully!` });
});

export const permanentDeleteMyVideo = async (req, res) => {
  const { videoId, userId, cloudinaryPublicId } = req.body;

  const deletedVideo = await Video.deleteOne({ _id: videoId });
  const deletedCloudinary = await cloudinary.uploader.destroy(cloudinaryPublicId, {
    resource_type: "video",
  });
  if (deletedVideo.deletedCount === 1 && deletedCloudinary.result === "ok") {
    const updatedUser = await User.findByIdAndUpdate(userId, { $pull: { videos: videoId } }, { new: true });
    console.log(`Video with public ID ${cloudinaryPublicId} deleted successfully.`);
    console.log("Updated User:", updatedUser);

    if (updatedUser) {
      res.status(200).json({ message: "Video deleted successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    console.log(deletedCloudinary.result);
    res.status(404).json({ error: "Video not found" });
  }
};
