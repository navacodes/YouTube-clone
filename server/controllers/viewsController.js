import Youtuber from "../models/Youtuber.js";
import Video from "../models/Video.js";
import catchAsync from "../utility/catchAsync.js";
import mongoose from "mongoose";

export const getChannels = catchAsync(async (req, res) => {
  const youtuber = await Youtuber.find();
  res.status(200).json({ status: "success", length: youtuber.length, channels: youtuber });
});

const fetchVideos = async (videos, req, res, startIndex, endIndex) => {
  let next = true;
  let prev = false;
  const videoPromises = videos.map(async (video) => {
    try {
      const { createdBy, ...videoData } = video.toObject();
      const youtuber = await Youtuber.findById(createdBy.toString()).select("name imgUrl");
      if (!youtuber) {
        throw new Error(`Youtuber with id ${createdBy} not found`);
      }

      return { ...videoData, createdBy: youtuber.toObject() };
    } catch (error) {
      console.error(error.message);
      return null;
    }
  });

  const videosWithCreatorDetails = await Promise.all(videoPromises);
  if (endIndex >= 24) {
    next = false;
  }
  if (startIndex > 1) {
    prev = true;
  }
  res.status(200).json({
    status: "success",
    next,
    prev,
    length: videosWithCreatorDetails.length,
    videos: videosWithCreatorDetails,
  });
};

export const getAllVideos = catchAsync(async (req, res) => {
  const { page, pageSize } = req.query;
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  let videos;
  if (page === 1) {
    videos = await Video.find({ privateVid: false, videoType: "video" })
      .sort({ _id: "asc" })
      .limit(endIndex - startIndex);
  } else {
    videos = await Video.find({ privateVid: false, videoType: "video" }).sort({ _id: "asc" }).skip(startIndex).limit(pageSize);
  }

  fetchVideos(videos, req, res, startIndex, endIndex);
});
export const getAllSlimVideos = catchAsync(async (req, res) => {
  const { page, pageSize } = req.query;
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  let videos;
  if (page === 1) {
    videos = await Video.find({ privateVid: false, videoType: "short" })
      .sort({ _id: "asc" })
      .limit(endIndex - startIndex);
  } else {
    videos = await Video.find({ privateVid: false, videoType: "short" }).sort({ _id: "asc" }).skip(startIndex).limit(pageSize);
  }

  fetchVideos(videos, req, res, startIndex, endIndex);
});
