import User from "../models/User.js";
import AppError from "../utility/AppError.js";
import catchAsync from "../utility/catchAsync.js";

const myVideos = catchAsync(async (videoType, req, res) => {
  const { userID } = req.params;
  const { page, pageSize } = req.query;
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  let next = true;
  let prev = false;
  let resultVideos = [];

  const user = await User.findById(userID).select({ name: 1, videos: 1 });
  const videos = await user.getVideos(videoType);
  if (videos.length == 0) {
    console.log("NO VIDEOS FOUND !");
    console.log(videos);
  } else {
    console.log(`${videos.length} videos found`);
    resultVideos = videos?.slice(startIndex, endIndex);
  }

  if (endIndex >= videos.length) {
    next = false;
  }
  if (startIndex > 1) {
    prev = true;
  }
  res.status(200).json({
    status: "success",
    next,
    prev,
    length: resultVideos.length,
    videos: resultVideos,
  });
});

export const getMyVideos = (req, res) => {
  myVideos("video", req, res);
};
export const getMySlimVideos = (req, res) => {
  myVideos("short", req, res);
};
