import Youtuber from "../models/Youtuber.js";
import Video from "../models/Video.js";
import catchAsync from "../utility/catchAsync.js";
import mongoose from "mongoose";

export const getChannels = catchAsync(async (req, res) => {
  const youtuber = await Youtuber.find();
  res.status(200).json({ status: "success", length: youtuber.length, channels: youtuber });
});

const fetchVideos = async (videos, req, res) => {
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

  res.status(200).json({
    status: "success",
    length: videosWithCreatorDetails.length,
    videos: videosWithCreatorDetails,
  });
};

export const getAllVideos = catchAsync(async (req, res) => {
  const { page, pageSize } = req.query;
  console.log("page :", req.query.page);
  console.log("pageSize :", req.query.pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  let videos;
  if (page === 1) {
    videos = await Video.find({ privateVid: false, videoType: "video" })
      .sort({ _id: "asc" })
      .limit(endIndex - startIndex);
  } else {
    prevStartIdx = (page - 2) * pageSize;
    videos = await Video.find({ privateVid: false, videoType: "video" }).sort({ _id: "asc" }).skip(startIndex).limit(pageSize);
  }

  fetchVideos(videos, req, res);
});
export const getAllSlimVideos = catchAsync(async (req, res) => {
  const { page, pageSize } = req.query;
  console.log("page :", req.query.page);
  console.log("pageSize :", req.query.pageSize);
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  let videos;
  if (page === 1) {
    videos = await Video.find({ privateVid: false, videoType: "short" })
      .sort({ _id: "asc" })
      .limit(endIndex - startIndex);
  } else {
    prevStartIdx = (page - 2) * pageSize;
    videos = await Video.find({ privateVid: false, videoType: "short" }).sort({ _id: "asc" }).skip(startIndex).limit(pageSize);
  }

  fetchVideos(videos, req, res);
});
