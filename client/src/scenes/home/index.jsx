/* eslint-disable array-callback-return */
import React, { createContext } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useGetVideosQuery } from "../../state/api";
import { useMediaQuery } from "@mui/material";

import VideoRows from "./RenderVideoRow";
import SlimVideoRows from "./RenderSlimVideoRow";

const GridSizeContext = createContext(null);
const Home = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetVideosQuery();
  const moreThan1500 = useMediaQuery("(min-width:1590px)");
  // gives true when window size > 1500 grid size 4
  const moreThan1100 = useMediaQuery("(min-width:1100px)");
  // gives true when window size > 1500 grid size 3
  const moreThan700 = useMediaQuery("(min-width:700px)");
  // gives true when window size > 1500 grid size 2

  // anything less than 700 then grid size 1
  let gridSize = 1;
  let slimGridSize = 2;
  if (moreThan700) {
    gridSize = 2;
    slimGridSize = 3;
  }
  if (moreThan1100) {
    gridSize = 3;
    slimGridSize = 5;
  }
  if (moreThan1500) {
    gridSize = 4;
    slimGridSize = 6;
  }
  const videos = !isLoading
    ? data.videos.filter((video) => video.videoType === "video")
    : [];
  const slimVideos = !isLoading
    ? data.videos.filter((slimVideo) => slimVideo.videoType === "short")
    : [];

  return (
    <GridSizeContext.Provider
      value={{ gridSize: gridSize, slimGridSize: slimGridSize, theme: theme }}>
      <Box sx={{ position: "relative" }}>
        <Box
          className="video-box-container"
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}>
          {/* Starting Rows */}
          <VideoRows videos={videos} isLoading={isLoading} row={"isTopRow"} />
          {/* Slim Videos */}
          <SlimVideoRows isLoading={isLoading} slimVideos={slimVideos} />
          {/* Rest of the rows */}
          <VideoRows videos={videos} isLoading={isLoading} row={"isRestRow"} />
        </Box>
      </Box>
    </GridSizeContext.Provider>
  );
};

export default Home;
export { GridSizeContext };
