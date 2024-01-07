import { Box } from "@mui/material";
import VideoCard from "./VideoCard";
import { useContext } from "react";
import { GridSizeContext } from ".";

const VideoRow = ({ theme, videoDataArr }) => {
  const gridSize = useContext(GridSizeContext);
  const single = gridSize === 1;
  return (
    <Box
      sx={{
        maxWidth: `calc(calc(${gridSize}*(590px) - 16px) - 16px)`,
        width: "100%",
        display: "flex",
        marginRight: `${single ? "0px" : "24px"}`,
      }}>
      {/* {videoData.map((data))} */}
      {videoDataArr.map((videoData, idx) => {
        return (
          <VideoCard
            key={idx}
            theme={theme}
            gridSize={gridSize}
            videoData={videoData}
          />
        );
      })}
    </Box>
  );
};

export default VideoRow;
