import { useTheme } from "@emotion/react";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

import { AddRelatedVideoStudio, SubtitlesIcon } from "../../../../svgs/Svgs";

const VideoElements = () => {
  const theme = useTheme();
  return (
    <Box className="video-elements">
      <Typography variant="h6">
        Use cards and an end screen to show viewers related videos, websites, and calls to action.{" "}
        <span style={{ color: theme.palette.studioBlue }}>Learn more</span>
      </Typography>
      <Box
        sx={{
          width: "868px",
          height: "88px",
          margin: "24px 0 0",
          padding: "18px 16px 18px 24px",
          display: "flex",
          alignItems: "center",
          borderRadius: "4px",
          color: theme.palette.studioLightGray,
          backgroundColor: theme.palette.studioDarkGray,
        }}
      >
        <AddRelatedVideoStudio fill={theme.palette.studioLightGray} />
        <Box sx={{ marginRight: "auto", marginLeft: "32px", maxWidth: "610px" }}>
          <Typography variant="h5" sx={{ fontSize: "15px", color: "white" }}>
            Add related video
          </Typography>
          <Typography variant="h6">Connect another of your videos to your video</Typography>
        </Box>
        <Button sx={{ mr: 1 }}>Add</Button>
      </Box>
      <Box
        sx={{
          width: "868px",
          height: "88px",
          margin: "24px 0 0",
          padding: "18px 16px 18px 24px",
          display: "flex",
          alignItems: "center",
          borderRadius: "4px",
          color: theme.palette.studioLightGray,
          backgroundColor: theme.palette.studioDarkGray,
        }}
      >
        <SubtitlesIcon fill={theme.palette.studioLightGray} />
        <Box sx={{ marginRight: "auto", marginLeft: "32px", maxWidth: "610px" }}>
          <Typography variant="h5" sx={{ fontSize: "15px", color: "white" }}>
            Add subtitles
          </Typography>
          <Typography variant="h6">Reach a broader audience by adding subtitles to your video</Typography>
        </Box>
        <Button sx={{ mr: 1 }}>Add</Button>
      </Box>
    </Box>
  );
};

export default VideoElements;
