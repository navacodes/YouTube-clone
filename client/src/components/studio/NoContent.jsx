import React, { useContext } from "react";
import NoContentImg from "../../img/noContent.png";
import { Box, Button, Typography } from "@mui/material";
import { StudioLayoutContext } from "../../scenes/studio/StudioLayout";

const NoContent = () => {
  const { setUploadDialogOpen } = useContext(StudioLayoutContext);

  return (
    <Box className="no-content-box" sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <img src={NoContentImg} alt="No-Content" />
      <Typography sx={{ fontSize: "15px", color: "#aaa", marginBottom: "15px" }}>No content available</Typography>
      <Button
        onClick={() => setUploadDialogOpen(true)}
        variant="contained"
        sx={{
          color: "#0b0b0b",
          fontSize: "15px",
          fontWeight: "600",
          backgroundColor: "#3a99eb",
          ":hover": {
            backgroundColor: "#3a99eb",
          },
        }}
      >
        UPLOAD VIDEOS
      </Button>
    </Box>
  );
};

export default NoContent;
