/* eslint-disable array-callback-return */
import React, { createContext, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useGetSlimVideosQuery, useGetVideosQuery } from "../../state/api";
import { useMediaQuery } from "@mui/material";

import VideoRows from "./RenderVideoRow";
import SlimVideoRows from "./RenderSlimVideoRow";

const GridSizeContext = createContext(null);
const Home = () => {
  const theme = useTheme();
  const [videoPage, setVideoPage] = useState(1);
  const [slimVideoPage, setSlimVideoPage] = useState(1);
  const [vidState, setVidState] = useState([]);
  const [topRowVids, setTopRowVids] = useState(null);
  const next = useRef(true);
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

  const { data: videoData, isLoading: vidLoading, refetch: vidRefetch, originalArgs } = useGetVideosQuery({ page: videoPage, pageSize: gridSize * 2 });

  const { data: slimVidData, isLoading: slimVidLoading, refetch: slimVidRefetch } = useGetSlimVideosQuery({ page: slimVideoPage, pageSize: slimGridSize });

  useEffect(() => {
    // Only set cachedData if it's currently null
    if (!topRowVids && !vidLoading && videoData.videos) {
      setTopRowVids(videoData.videos);
    }
  }, [videoData, topRowVids, vidLoading]); // Include cachedData in dependencies

  const slimVideos = !slimVidLoading ? slimVidData.videos : [];

  const fetchData = async function () {
    setVideoPage((prev) => prev + 1);
    const newVids = await vidRefetch();
    const temp = (newVids.data.videos || []).filter((el) => !topRowVids.includes(el));
    setVidState((prev) => {
      return prev.concat(temp || []);
    });
    next.current = newVids.data.next || false;
    console.log(newVids.data.videos);
  };

  return (
    <GridSizeContext.Provider value={{ gridSize: gridSize, slimGridSize: slimGridSize, theme: theme }}>
      <Box sx={{ position: "relative" }}>
        <Box
          className="video-box-container"
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {/* Starting Rows */}
          <VideoRows videos={topRowVids === null ? [] : topRowVids} isLoading={vidLoading} />

          {/* Slim Videos */}
          <SlimVideoRows slimVideos={slimVideos} isLoading={slimVidLoading} />

          {/* Rest of the rows */}
          <InfiniteScroll
            dataLength={() => {
              console.log("vidState.length:", vidState.length);
              return vidState.length;
            }}
            next={() => fetchData()}
            hasMore={next.current}
            loader={<p style={{ color: theme.palette.textPrimaryDark }}>Loading...</p>}
            endMessage={
              <p style={{ textAlign: "center", color: theme.palette.textPrimaryDark }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <VideoRows videos={vidState} isLoading={vidLoading} />
          </InfiniteScroll>
        </Box>
      </Box>
    </GridSizeContext.Provider>
  );
};

export default Home;
export { GridSizeContext };
