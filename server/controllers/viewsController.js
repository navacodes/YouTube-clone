import Youtuber from "../models/Youtuber.js";
import Video from "../models/Video.js";
import catchAsync from "../utility/catchAsync.js";
import User from "../models/User.js";

export const getChannels = catchAsync(async (req, res) => {
  const youtuber = await Youtuber.find();
  res
    .status(200)
    .json({ status: "success", length: youtuber.length, channels: youtuber });
});

export const getAllVideos = catchAsync(async (req, res) => {
  const finalOutput = [];
  const videos = await Video.find({ privateVid: false });
  // a function which takes in the _id of the creator and then returns all the details of the creator
  const user = await User.find();
  

  res.status(200).json({ status: "success", length: videos.length, videos });
});
