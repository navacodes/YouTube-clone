import React from "react";
import NoContentImg from "../../img/noContent.png";
import { Box, Button, Typography } from "@mui/material";

const NoContent = () => {
  return (
    <Box className="no-content-box" sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <img src={NoContentImg} alt="" />
      <Typography sx={{ fontSize: "15px", color: "#aaa", marginBottom: "15px" }}>No content available</Typography>
      <Button variant="contained" sx={{ color: "#0b0b0b", fontSize: "15px", fontWeight: "600", backgroundColor: "#3a99eb" }}>
        UPLOAD VIDEOS
      </Button>
    </Box>
  );
};

export default NoContent;
