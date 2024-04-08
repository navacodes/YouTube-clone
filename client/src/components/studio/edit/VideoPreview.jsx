import { Box, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { formatVideoTime } from "../../FormatFns";

const VideoPreview = ({ isSideBarOpen, mediaUrl }) => {
  return (
    <Box
      sx={{
        width: isSideBarOpen ? "224px" : "64px",
        height: isSideBarOpen ? "127px" : "36px",
        position: "absolute",
        top: "0px",
      }}
    >
      {mediaUrl !== null ? (
        <>
          <Box sx={{ width: "100%", height: "100%", padding: isSideBarOpen ? "8px 16px 0px" : "8px 4px 12px" }}>
            <video src={mediaUrl} style={{ height: "100%", width: "100%" }}>
              <source src={mediaUrl} type="video/mp4" />
            </video>
          </Box>
        </>
      ) : (
        <Box
          sx={{
            width: isSideBarOpen ? "224px" : "64px",
            height: isSideBarOpen ? "127px" : "36px",
            backgroundColor: "black",
          }}
        ></Box>
      )}
    </Box>
  );
};

export default VideoPreview;
