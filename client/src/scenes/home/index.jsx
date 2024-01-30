/* eslint-disable array-callback-return */
import React, { createContext, useEffect, useRef, useState } from "react";
import InfiniteScroll from "./infinte-scroll/index.jsx";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useGetSlimVideosQuery, useGetVideosQuery } from "../../state/api";
import { useMediaQuery } from "@mui/material";

import VideoRows from "./RenderVideoRow";
import SlimVideoRows from "./RenderSlimVideoRow";
import Spinner from "./spinner";
import LoadMoreBtn from "./loadMoreBtn/";

const GridSizeContext = createContext(null);
const Home = () => {
  const theme = useTheme();
  const _infiniteScroll = useRef(null);
  const moreShorts = useRef(null);
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

  // Video hoooks
  const [videoPage, setVideoPage] = useState(1);
  const [vidState, setVidState] = useState([]);
  const [topRowVids, setTopRowVids] = useState(null);
  const [videoPageSize, setVideoPageSize] = useState(gridSize);
  const vidNext = useRef(true);

  // Slim Video hooks
  const [slimVideoPage, setSlimVideoPage] = useState(1);
  const [slimVidState, setSlimVidState] = useState([]);
  const [topRowSlimVids, setTopRowSlimVids] = useState(null);
  const [slimVideoPageSize, setSlimVideoPageSize] = useState(slimGridSize);
  const slimVidNext = useRef(true);

  const { data: videoData, isLoading: vidLoading, refetch: vidRefetch } = useGetVideosQuery({ page: videoPage, pageSize: 8 });

  const { data: slimVideoData, isLoading: slimVideoLoading, refetch: slimVidRefetch } = useGetSlimVideosQuery({ page: slimVideoPage, pageSize: slimGridSize });

  useEffect(() => {
    // Only set cachedData if it's currently null or gridSize changes
    if (!topRowVids && !vidLoading && videoData.videos) {
      setTopRowVids({ actualData: videoData.videos, currVal: videoData.videos.slice(0, gridSize * 2) });
    }
    if (videoPageSize !== gridSize) {
      setTopRowVids((prev) => {
        return {
          actualData: prev.actualData,
          currVal: prev.actualData.slice(0, gridSize * 2),
        };
      });
      setVideoPageSize(gridSize);
    }
  }, [videoData, topRowVids, vidLoading, gridSize, videoPageSize]);

  useEffect(() => {
    // Only set cachedData if it's currently null or slimGridSize changes
    if (!topRowSlimVids && !slimVideoLoading && slimVideoData.videos) {
      setTopRowSlimVids({ actualData: slimVideoData.videos, currVal: slimVideoData.videos.slice(0, slimGridSize) });
    }
    if (slimVideoPageSize !== slimGridSize) {
      setTopRowSlimVids((prev) => {
        return {
          actualData: prev.actualData,
          currVal: prev.actualData.slice(0, slimGridSize),
        };
      });
      setSlimVideoPageSize(slimGridSize);
    }
  }, [slimVideoData, topRowSlimVids, slimVideoLoading, slimGridSize, slimVideoPageSize]);

  useEffect(() => {
    // This effect will trigger whenever slimVideoPage changes
    if (slimVideoPage > 1) {
      fetchSlimVidData(); // Fetch data when slimVideoPage is updated
    }
    // eslint-disable-next-line
  }, [slimVideoPage]);

  useEffect(() => {
    // This effect will trigger whenever videoPage changes
    if (videoPage > 1) {
      fetchVidData(); // Fetch data when videoPage is updated
    }
    // eslint-disable-next-line
  }, [videoPage]);

  const fetchVidData = async function () {
    try {
      const newVids = await vidRefetch({ page: videoPage, pageSize: gridSize * 2 });
      const temp = (newVids.data.videos || []).filter((el) => !topRowVids.currVal.includes(el));
      setVidState((prev) => {
        return prev.concat(temp || []);
      });
      vidNext.current = newVids.data.next || false;
    } catch (error) {
      // Handle error if necessary
      console.error("Error fetching slim videos:", error);
    }
  };

  const fetchSlimVidData = async function () {
    try {
      // Use the updated page number for refetch
      const newVids = await slimVidRefetch({ page: slimVideoPage, pageSize: slimGridSize });

      const temp = (newVids.data.videos || []).filter((el) => !topRowSlimVids.currVal.includes(el));

      setSlimVidState((prev) => {
        return prev.concat(temp || []);
      });

      slimVidNext.current = newVids.data.next || false;
    } catch (error) {
      // Handle error if necessary
      console.error("Error fetching slim videos:", error);
    }
  };

  const handleButtonClick = () => {
    setSlimVideoPage((prev) => prev + 1);
  };

  // Initially fetch for 8 videos for the top row
  // and if the gridSize value changes the videos in the topRow will be rendered and no refetching will be
  // required because the data was already fetched in the first request
  // Then according to the gridSize value I can fetch other videos for the bottom rows
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
          <VideoRows key={topRowVids?.length * Math.random() * Math.random()} videos={topRowVids === null ? [] : topRowVids.currVal} isLoading={vidLoading} />

          {/* Slim Videos */}
          <Box>
            <SlimVideoRows key={topRowSlimVids?.length} slimVideos={topRowSlimVids === null ? [] : topRowSlimVids.currVal} isLoading={slimVideoLoading} />

            {!slimVideoLoading && (
              <div ref={moreShorts} className="more-shorts" style={{ display: "block" }}>
                {" "}
                <SlimVideoRows slimVideos={slimVidState} isLoading={slimVideoLoading} />{" "}
              </div>
            )}

            <Box className="loadMoreBtn--container" sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
              <LoadMoreBtn moreShortsRef={moreShorts} refetch={handleButtonClick} showMore={slimVidNext.current} />
            </Box>
          </Box>

          {/* Rest of the rows */}
          {/* work on the manual refetch of data in infiniteScroll  */}
          <InfiniteScroll
            ref={_infiniteScroll}
            dataLength={() => {
              return vidState.length;
            }}
            next={() => setVideoPage((prev) => prev + 1)}
            hasMore={vidNext.current}
            loader={<Spinner />}
            endMessage={
              <p style={{ textAlign: "center", color: theme.palette.textPrimaryDark }}>
                <b>You have seen it all</b>
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
