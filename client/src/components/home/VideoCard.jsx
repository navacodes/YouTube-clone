import { useContext, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { GridSizeContext } from "../../scenes/home";
import { formatNumber, formatTimeAgo, formatVideoTime } from "../FormatFns";

const VideoCard = ({ videoData }) => {
  const { gridSize, theme } = useContext(GridSizeContext);
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
    const progressPercentage = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    progressBarRef.current.style.width = `${progressPercentage}%`;

    setTime(Math.floor(videoRef.current.currentTime));

  };
  return (
    <Box
      sx={{
        width: `calc(100%/${gridSize} - 16px - 0.01px)`,
        marginRight: "16px",
        marginBottom: "39px",
      }}
      className="video-box"
    >
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
          className="video"
        >
          <source src={videoData.mediaUrl} type="video/mp4" />
        </video>
        <div
          className="controls visible-hidden"
          ref={controllRef}
          style={{
            marginTop: "-7px",
            zIndex: 1200,
            position: "relative",
          }}
        >
          <div
            className="progress"
            style={{ height: "2px", backgroundColor: "white" }}
            ref={progressRef}
            // onClick={scrub}
            // onMouseDown={() => (mousedown = true)}
            // onMouseMove={(e) => mousedown && scrub(e)}
            // onMouseUp={() => (mousedown = false)}
          >
            <div className="progress__filled" style={{ height: "100%", backgroundColor: "red" }} ref={progressBarRef}></div>
            <div
              className="vidTimeStamps"
              style={{
                color: "white",
                marginTop: "-27px",
                paddingBottom: "3px",
                paddingLeft: "8px",
                background: "linear-gradient(180deg, rgba(251,251,251,0) 37%, rgba(94,94,94,0.8225884103641457) 100%)",
              }}
            >
              <Typography variant="h6">
                {" "}
                {`${formatVideoTime(totalTime, time).formattedCurrentTime} /
            ${formatVideoTime(totalTime, time).formattedTotalTime}`}
              </Typography>
            </div>
          </div>
        </div>
      </Box>
      <Box className="video-data" sx={{ display: "flex", marginTop: "12px", marginRight: "50px" }}>
        <Box className="channel-image">
          <img
            src={videoData.createdBy.imgUrl} //
            alt="channel-icon"
            style={{ borderRadius: "50%", height: "36px" }}
          />
        </Box>
        <Box className="video-details" sx={{ marginLeft: "12px" }}>
          <Typography variant="h5">{videoData.title}</Typography>
          <Box className="video-basic-details" sx={{ marginTop: "4px" }}>
            <Box className="video-basic-detail">
              <Typography variant="h6" sx={{ color: "#AAAAAA" }}>
                {videoData.createdBy.name}
              </Typography>
            </Box>
            <Box className="video-basic-detail">
              <Typography variant="h6" sx={{ color: "#AAAAAA", lineHeight: 1 }}>
                <span>{formatNumber(videoData.views)} views</span> {` `}
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
