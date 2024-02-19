import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import HoverElements from "./HoverElements";
import { useDispatch } from "react-redux";
import { setVideoId } from "../../state/";

const StudioVideoCardComponent = ({ videoData }) => {
  const theme = useTheme();
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();

  return (
    <div
      onMouseEnter={() => {
        setHover(true);
        dispatch(setVideoId({ videoId: videoData.videoId }));
      }}
      onMouseLeave={() => setHover(false)}
      className="studio-videocard"
      style={{ height: "100%", width: "100%", display: "flex" }}
    >
      <Box className="left" sx={{ width: "120px", height: "68px" }}>
        <video muted preload="metadata" src={videoData.mediaUrl} className="video" style={{ height: "100%" }}>
          <source src={videoData.mediaUrl} type="video/mp4" />
        </video>
      </Box>
      <Box className="right" sx={{ width: "calc(100% - 130px)", marginLeft: "16px", flex: "1 1" }}>
        <Typography variant="h6" sx={{ fontSize: "13px", paddingTop: "8px" }}>
          {videoData.title}
        </Typography>
        <Box
          sx={{
            fontSize: "12px",
            whiteSpace: "wrap",
            width: "100%",
            height: "34px",
            letterSpacing: "0.011em",
            lineHeight: "16px",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            color: theme.palette.studioLightGray,
          }}
        >
          {hover ? <HoverElements theme={theme} videoId={videoData.videoId} /> : videoData.description}
        </Box>
      </Box>
    </div>
  );
};

export default StudioVideoCardComponent;
