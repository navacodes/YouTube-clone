import catchAsync from "../utility/catchAsync.js";
import { v2 as cloudinary } from "cloudinary";
import Video from "../models/Video.js";
import User from "../models/User.js";
import mongoose from "mongoose";

export const postMyVideoOnCloduinary = async (req, res) => {
  try {
    // Upload to Cloudinary
    const cloudinaryResult = await cloudinary.uploader.upload_large(req.file.path, { resource_type: "video" });

    // Return the public URL of the uploaded video
    res.status(200).json({ status: "success", videoUrl: cloudinaryResult.secure_url, vidDuration: cloudinaryResult.duration });
  } catch (e) {
    res.status(e.http_code).json({ status: "error", message: e.message });
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
  });

  await newVideo.save();

  const creator = await User.findById(req.body.createdBy);
  creator.videos.push(newVideo._id);

  await creator.save();
  res.status(200).json({ message: `User created successfully! Video ID: ${newVideo._id}` });
});
