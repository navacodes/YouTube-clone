import { useContext, useRef } from "react";
import { GridSizeContext } from "../../scenes/home";
import { Box, Typography } from "@mui/material";
import { formatNumber } from "./FormatFns";

const SlimVideoCard = ({ slimVideo }) => {
  const { slimGridSize, theme } = useContext(GridSizeContext);
  const videoRef = useRef(null);
  const controllRef = useRef(null);
  const style = {
    width: "100%",
    position: "relative",
    zIndex: 1100,
    borderRadius: "12px",
  };

  const handleMouseEnter = () => {
    videoRef.current.play();
    controllRef.current.classList.add("visible-visible");
    controllRef.current.classList.remove("visible-hidden");
    // console.log(time + ":" + totalTime);
  };
  const handleMouseLeave = () => {
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
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
  return (
    <Box
      sx={{
        width: `calc(100%/${slimGridSize} - 16px - 0.01px)`,
        marginRight: "16px",
        marginBottom: "19px",
      }}
      className="video-box">
      <Box sx={{ width: "100%" }} className="video-container">
        <video
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={togglePlay}
          muted
          preload="metadata"
          ref={videoRef}
          style={style}
          src={slimVideo.mediaUrl}
          className="video">
          <source src={slimVideo.mediaUrl} type="video/mp4" />
        </video>
        <div
          className="controls visible-hidden"
          ref={controllRef}
          style={{
            marginTop: "-7px",
            zIndex: 1200,
            position: "relative",
          }}></div>
      </Box>
      <Box
        className="video-data"
        sx={{ display: "flex", marginTop: "12px", marginRight: "50px" }}>
        <Box className="video-details" sx={{ marginLeft: "2px" }}>
          <Typography
            variant="h5"
            sx={{ color: theme.palette.textPrimaryDark }}>
            {slimVideo.title}
          </Typography>
          <Box className="video-basic-details" sx={{ marginTop: "4px" }}>
            <Box className="video-basic-detail">
              <Typography variant="h6" sx={{ color: "#AAAAAA", lineHeight: 1 }}>
                <span>{formatNumber(slimVideo.views)} views</span> {` `}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SlimVideoCard;
