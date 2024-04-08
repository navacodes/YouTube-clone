import React from "react";
import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import CopyButton from "./CopyButton";
import { truncateString } from "../FormatFns";

const VideoBoxWithDetails = ({ mediaUrl, filename, widthVal = "328", heightVal = "171" }) => {
  const theme = useTheme();
  return (
    <Box style={{ width: `${widthVal}px`, height: "auto", marginBottom: "24px" }}>
      <Box className="video-box-studio" sx={{ width: "auto", height: `${heightVal}px` }}>
        {mediaUrl !== null ? (
          <video controls src={mediaUrl} style={{ width: "100%", height: "100%" }}>
            <source src={mediaUrl} type="video/mp4" />
          </video>
        ) : (
          <Box sx={{ width: "100%", height: "100%", backgroundColor: "black" }}></Box>
        )}
      </Box>
      <Box sx={{ backgroundColor: theme.palette.studioDarkGray, paddingRight: "8px" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontSize: "12px",
                marginTop: "12px",
                padding: "0 16px",
                color: theme.palette.studioLightGray,
              }}
            >
              Video link
            </Typography>
            <Typography variant="h5" sx={{ fontSize: "15px", margin: "0 16px", padding: "0 0 5px", color: theme.palette.studioBlue }}>
              {mediaUrl !== null ? truncateString(mediaUrl) : "Processing"}
            </Typography>
          </Box>
          <CopyButton linkToCopy={mediaUrl || ""} />
        </Box>
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontSize: "12px",
              marginTop: "12px",
              padding: "0 16px",
              color: theme.palette.studioLightGray,
            }}
          >
            Filename
          </Typography>
          <Typography variant="h5" sx={{ fontSize: "15px", margin: "0 16px", padding: "0 0 15px", color: "white" }}>
            {!filename ? "Uploading..." : filename}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoBoxWithDetails;
