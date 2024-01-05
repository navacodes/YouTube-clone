import Youtuber from "../models/Youtuber.js";
import Video from "../models/Video.js";
import catchAsync from "../utility/catchAsync.js";
import mongoose from "mongoose";

export const getChannels = catchAsync(async (req, res) => {
  const youtuber = await Youtuber.find();
  res
    .status(200)
    .json({ status: "success", length: youtuber.length, channels: youtuber });
});

export const getAllVideos = catchAsync(async (req, res) => {
  const videos = await Video.find({ privateVid: false });

  const videoPromises = videos.map(async (video) => {
    try {
      const { createdBy, ...videoData } = video.toObject();
      const youtuber = await Youtuber.findById(createdBy.toString()).select(
        "name imgUrl"
      );
      // console.log(youtuber.name);
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
});


