import { Box, Typography } from "@mui/material";
import React from "react";
import Monkey404 from "../svgs/monkey.png";
import YoutubeIcon from "../svgs/YoutubeLight.svg";
import { useTheme } from "@emotion/react";

const Page404 = () => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "100%" }}>
      <Box sx={{ marginBottom: "20px", display: "flex", alignItems: "center", flexDirection: "column" }}>
        <img src={Monkey404} alt="" />
        <Typography variant="h5" sx={{ color: theme.palette.textPrimaryDark, marginTop: "10px" }}>
          This page isn't available. Sorry about that. <br />
          Try searching for something else.
        </Typography>
      </Box>
      <img style={{ transform: "scale(1.5)" }} src={YoutubeIcon} />
    </Box>
  );
};

export default Page404;
