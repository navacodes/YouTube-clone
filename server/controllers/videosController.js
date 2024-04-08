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
  console.log(deletedCloudinary);
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

export const getMyEditVideo = async (req, res) => {
  const { videoId, userId } = req.query;

  try {
    // Check if the user exists and has the video in their videos array
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.videos.includes(videoId)) {
      return res.status(403).json({ error: "User does not have access to this video" });
    }

    // Retrieve the video by its ID
    const video = await Video.findById(videoId).select("-__v -createdBy -updatedAt -createdAt -_id");
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }

    // Return the video data
    return res.status(200).json({
      message: "success",
      videoData: video,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const postMyEditVideo = async (req, res) => {
  const { videoId, userId, title, description, privateVid } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (!user.videos.includes(videoId)) {
      return res.status(403).json({ message: "User does not have access to this video" });
    }

    const video = await Video.findById(videoId).select("-__v -createdBy -updatedAt -createdAt");
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    video.title = title || video.title;
    video.description = description || video.description;
    video.privateVid = privateVid || video.privateVid;

    // Saving the video
    await video.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error", message: error });
  }

  res.status(200).json({
    message: "Video successfully updated!",
    data: {
      videoId,
      userId,
      title,
      description,
      privateVid,
    },
  });
};
