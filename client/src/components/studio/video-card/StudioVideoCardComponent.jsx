import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import HoverElements from "./HoverElements";
import { useDispatch } from "react-redux";
import { setVideoId } from "../../../state";
import HoverElementsModal from "./HoverElementsModal";

const StudioVideoCardComponent = ({ videoData }) => {
  const theme = useTheme();
  const [hover, setHover] = useState(false);
  const dispatch = useDispatch();
  const [hoverModal, setHoverModal] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => {
          setHover(true);
          dispatch(setVideoId({ videoId: videoData.videoId }));
        }}
        onMouseLeave={() => {
          if (!hoverModal) setHover(false);
        }}
        className="studio-videocard"
        style={{ height: "100%", width: "100%", display: "flex", position: "relative" }}
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
            {hover ? <HoverElements setOpen={setHoverModal} theme={theme} videoData={videoData} /> : videoData.description}
          </Box>
        </Box>
      </div>
      <HoverElementsModal videoData={videoData} open={hoverModal} setOpen={setHoverModal} />
    </>
  );
};

export default StudioVideoCardComponent;
