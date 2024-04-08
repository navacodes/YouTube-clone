import React from "react";
import { Box } from "@mui/material";
import VideoBoxWithDetails from "../VideoBoxWithDetails";
import { useTheme } from "@emotion/react";
import VisibilitySelect from "./VisibilitySelect";

const EditMiscellaneous = ({ editedVideoDetails, setEditedVideoDetails, globalMediaUrl, globalTitle }) => {
  const theme = useTheme();
  return (
    <Box sx={{ paddingLeft: "24px" }}>
      <VideoBoxWithDetails mediaUrl={globalMediaUrl} filename={globalTitle} widthVal="352" heightVal="198" />
      <VisibilitySelect theme={theme} editedVideoDetails={editedVideoDetails} setEditedVideoDetails={setEditedVideoDetails} />
    </Box>
  );
};

export default EditMiscellaneous;
