import Youtuber from "../models/Youtuber.js";
import Video from "../models/Video.js";
import catchAsync from "../utility/catchAsync.js";

export const getChannels = catchAsync(async (req, res) => {
  const youtuber = await Youtuber.find();
  res
    .status(200)
    .json({ status: "success", length: youtuber.length, channels: youtuber });
});

export const getAllVideos = catchAsync(async (req, res) => {
  const videos = await Video.find().select({
    vidUrl: 1,
    createdBy: 1,
    createdAt: 1,
    title: 1,
    views: 1,
    private: 1,
  });
  res.status(200).json({ status: "success", length: videos.length, videos });
});
