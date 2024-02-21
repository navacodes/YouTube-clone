import { Box } from "@mui/material";
import React from "react";
import { YoutubeIcon, EditStudioIcon, AnalyticsIcon, CommentsIcon } from "../../../svgs/Svgs";
import { IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HoverElements = ({ theme, videoId }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/studio/video/edit/${videoId}`);
  };

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-start", gap: 1.2 }}>
      <IconButton onClick={handleNavigate} size="small" children={<EditStudioIcon fill={theme.palette.studioLightGray} size={20} />} />
      <IconButton size="small" children={<AnalyticsIcon fill={theme.palette.studioLightGray} size={20} />} />
      <IconButton size="small" children={<CommentsIcon fill={theme.palette.studioLightGray} size={20} />} />
      <IconButton size="small" children={<YoutubeIcon fill={theme.palette.studioLightGray} size={20} />} />
    </Box>
  );
};

export default HoverElements;
