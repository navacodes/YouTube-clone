import User from "../models/User.js";
import AppError from "../utility/AppError.js";
import catchAsync from "../utility/catchAsync.js";

export const getMyVideos = catchAsync(async (req, res, next) => {
  const { userID } = req.params;
  const user = await User.findById(userID).select({ name: 1, videos: 1 });
  if (user.videos.length == 0) {
    console.log("NO VIDEOS FOUND ! ");
    res.status(200).json({
      status: "success",
      videos: user.videos,
    });
  } else {
    console.log(`${user.videos.length} videos found`);
    res.status(200).json({
      status: "success",
      videos: user.videos,
    });
  }
});
