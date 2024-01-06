import { Box } from "@mui/material";
import VideoCard from "./VideoCard";
import { useContext } from "react";
import { GridSizeContext } from ".";

const VideoRow = ({ theme, videoData }) => {
  const gridSize = useContext(GridSizeContext);
  return (
    <Box
      sx={{
        maxWidth: `calc(calc(${gridSize}*(516px) - 16px) - 16px)`,
        width: "100%",
        display: "flex",
        marginRight: "24px",
      }}>
      <VideoCard theme={theme} gridSize={gridSize} videoData={videoData} />
    </Box>
  );
};

export default VideoRow;
