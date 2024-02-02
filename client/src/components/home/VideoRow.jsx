import { Box } from "@mui/material";
import VideoCard from "./VideoCard";
import { useContext } from "react";
import { GridSizeContext } from "../../scenes/home";

const VideoRow = ({ videoDataArr }) => {
  const { gridSize } = useContext(GridSizeContext);
  return (
    <Box
      className="VideoRow"
      sx={{
        maxWidth: `calc(calc(${gridSize}*(625px) - 16px) - 16px)`,
        width: "100%",
        display: "flex",
        marginRight: `${gridSize === 1 ? "0px" : "8px"}`,
      }}
    >
      {videoDataArr.map((videoData, idx) => {
        return <VideoCard key={idx} videoData={videoData} />;
      })}
    </Box>
  );
};

export default VideoRow;
