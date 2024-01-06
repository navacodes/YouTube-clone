import { useContext, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { GridSizeContext } from ".";

const formatTimeAgo = function (dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const timeDifference = now - date;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return years === 1 ? "1 year ago" : `${years} years ago`;
  } else if (months > 0) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  } else if (days > 7) {
    return days === 7 ? "1 week ago" : `${Math.floor(days / 7)} weeks ago`;
  } else if (days < 7 && days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else {
    return "Just now";
  }
};

const formatNumber = function (num) {
  if (num < 1000) {
    return num.toString();
  } else if (num < 1000000) {
    const formattedNum = (num / 1000).toFixed(1);
    return formattedNum.endsWith(".0")
      ? `${formattedNum.slice(0, -2)}k`
      : `${formattedNum}k`;
  } else {
    const formattedNum = (num / 1000000).toFixed(2);
    return formattedNum.endsWith(".00")
      ? `${formattedNum.slice(0, -3)}M`
      : `${formattedNum}M`;
  }
};
const formatVideoTime = function (totalTime, currentTime) {
  const totalSeconds = Math.floor(totalTime);
  const currentSeconds = Math.floor(currentTime);

  const totalHours = Math.floor(totalSeconds / 3600);
  const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
  const totalSecondsRemaining = totalSeconds % 60;

  const currentHours = Math.floor(currentSeconds / 3600);
  const currentMinutes = Math.floor((currentSeconds % 3600) / 60);
  const currentSecondsRemaining = currentSeconds % 60;

  const formatTime = (value) => (value < 10 ? `0${value}` : `${value}`);

  if (totalTime < 3600) {
    const formattedTotalTime = `${formatTime(totalMinutes)}:${formatTime(
      totalSecondsRemaining
    )}`;
    const formattedCurrentTime = `${formatTime(currentMinutes)}:${formatTime(
      currentSecondsRemaining
    )}`;
    return { formattedTotalTime, formattedCurrentTime };
  } else {
    const formattedTotalTime = `${formatTime(totalHours)}:${formatTime(
      totalMinutes
    )}:${formatTime(totalSecondsRemaining)}`;
    const formattedCurrentTime = `${formatTime(currentHours)}:${formatTime(
      currentMinutes
    )}:${formatTime(currentSecondsRemaining)}`;
    return { formattedTotalTime, formattedCurrentTime };
  }
};

const VideoCard = ({ theme, videoData }) => {
  const gridSize = useContext(GridSizeContext);
  const style = {
    width: "100%",
    position: "relative",
    zIndex: 1100,
    borderRadius: "12px",
  };
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const progressBarRef = useRef(null);
  const controllRef = useRef(null);
  const [time, setTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const handleMouseEnter = () => {
    videoRef.current.play();
    videoRef.current.style.borderRadius = "0px";
    controllRef.current.classList.add("visible-visible");
    controllRef.current.classList.remove("visible-hidden");
    setTotalTime(Math.floor(videoRef.current.duration));
    // console.log(time + ":" + totalTime);
  };
  const handleMouseLeave = () => {
    videoRef.current.pause();
    videoRef.current.style.borderRadius = "12px";
    videoRef.current.removeAttribute("controls");
    controllRef.current.classList.add("visible-hidden");
    controllRef.current.classList.remove("visible-visible");
  };
  const togglePlay = () => {
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };
  const handleProgress = () => {
    const progressPercentage =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    progressBarRef.current.style.width = `${progressPercentage}%`;

    setTime(Math.floor(videoRef.current.currentTime));

    // console.log(time + ":" + totalTime);
  };
  return (
    <Box
      sx={{
        width: `calc(100%/${gridSize} - 16px - 0.01px)`,
        marginRight: "16px",
        marginBottom: "39px",
      }}
      className="video-box">
      <Box sx={{ width: "100%" }} className="video-container">
        <video
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={togglePlay}
          onTimeUpdate={handleProgress}
          muted
          preload="metadata"
          ref={videoRef}
          style={style}
          src={videoData.mediaUrl}
          className="video">
          <source src={videoData.mediaUrl} type="video/mp4" />
        </video>
        <div
          className="controls visible-hidden"
          ref={controllRef}
          style={{
            marginTop: "-7px",
            zIndex: 1200,
            position: "relative",
          }}>
          <div
            className="progress"
            style={{ height: "2px", backgroundColor: "white" }}
            ref={progressRef}
            // onClick={scrub}
            // onMouseDown={() => (mousedown = true)}
            // onMouseMove={(e) => mousedown && scrub(e)}
            // onMouseUp={() => (mousedown = false)}
          >
            <div
              className="progress__filled"
              style={{ height: "100%", backgroundColor: "red" }}
              ref={progressBarRef}></div>
            <div
              className="vidTimeStamps"
              style={{
                color: "white",
                marginTop: "-27px",
                paddingBottom: "3px",
                paddingLeft: "8px",
                background:
                  "linear-gradient(180deg, rgba(251,251,251,0) 37%, rgba(94,94,94,0.8225884103641457) 100%)",
              }}>
              <Typography variant="h6">
                {" "}
                {`${formatVideoTime(totalTime, time).formattedCurrentTime} /
            ${formatVideoTime(totalTime, time).formattedTotalTime}`}
              </Typography>
            </div>
          </div>
        </div>
      </Box>
      <Box
        className="video-data"
        sx={{ display: "flex", marginTop: "12px", marginRight: "50px" }}>
        <Box className="channel-image">
          <img
            src={videoData.createdBy.imgUrl} //
            alt="channel-icon"
            style={{ borderRadius: "50%", height: "36px" }}
          />
        </Box>
        <Box className="video-details" sx={{ marginLeft: "12px" }}>
          <Typography
            variant="h5"
            sx={{ color: theme.palette.textPrimaryDark }}>
            {videoData.title}
          </Typography>
          <Box className="video-basic-details" sx={{ marginTop: "4px" }}>
            <Box className="video-basic-detail">
              <Typography variant="h6" sx={{ color: "#AAAAAA" }}>
                {videoData.createdBy.name}
              </Typography>
            </Box>
            <Box className="video-basic-detail">
              <Typography variant="h6" sx={{ color: "#AAAAAA", lineHeight: 1 }}>
                <span>{formatNumber(videoData.views)}</span> {` `}
                <span>• {formatTimeAgo(videoData.createdAt)}</span>
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoCard;
