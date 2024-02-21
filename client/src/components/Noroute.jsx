import { Box, Typography } from "@mui/material";
import React from "react";
import Monkey404 from "../svgs/monkey.png";
import YoutubeIcon from "../svgs/YoutubeLight.svg";

const Noroute = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100%" }}>
      <Box sx={{ marginBottom: "20px", display: "flex", alignItems: "center", flexDirection: "column" }}>
        <img src={Monkey404} alt="" />
        <Typography variant="h5" sx={{  marginTop: "10px" }}>
          This page isn't developed yet. Sorry about that.
        </Typography>
      </Box>
      <img style={{ transform: "scale(1.5)" }} src={YoutubeIcon} alt="" />
    </Box>
  );
};

export default Noroute;
