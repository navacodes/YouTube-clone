import { useTheme } from "@emotion/react";
import { Box, Typography, Button } from "@mui/material";
import React from "react";

const EditHeader = ({ handleVideoEditSave,handleUndoChanges }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        position: "sticky",
        top: "59px",
        backgroundColor: theme.palette.studioMediumGray,
        zIndex: 1100,
      }}
    >
      <Box sx={{ flex: 1, display: "flex", maxWidth: "1072px", minWidth: "0px", justifyContent: "space-between", alignItems: "center" }}>
        <Box sx={{ flex: 1, display: "flex", minWidth: "0px" }}>
          <Typography variant="h3" sx={{ paddingY: "19px", lineHeight: "32px" }}>
            Video details
          </Typography>
        </Box>
        <Box sx={{ alignSelf: "center", minWidth: "0px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* UNDO CHANGES BUTTON  */}
          <Button variant="text" onClick={handleUndoChanges} sx={{ marginLeft: "8px", fontSize: "14px", fontWeight: 600, color: "#3ea6ff" }}>
            UNDO CHANGES
          </Button>

          {/* SAVE BUTTON  */}
          <Button
            variant="contained"
            sx={{ color: "black", fontSize: "14px", fontWeight: 600, backgroundColor: "#3ea6ff", marginLeft: "8px" }}
            onClick={handleVideoEditSave}
          >
            SAVE
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default EditHeader;
