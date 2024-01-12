/* eslint-disable array-callback-return */
import { Typography } from "@mui/material";
import SlimVideoRow from "./SlimVideoRow";
import { useContext } from "react";
import { GridSizeContext } from ".";

export default function SlimVideoRows({ isLoading, slimVideos }) {
  const { slimGridSize, theme } = useContext(GridSizeContext);
  return isLoading ? (
    <Typography variant="h3" sx={{ color: theme.palette.textPrimaryDark }}>
      Loading Shorts...
    </Typography>
  ) : (
    slimVideos.map((slimVideoData, idx, array) => {
      if (idx % slimGridSize === 0) {
        // Calculate the start index for each chunk
        const startIndex = idx;
        const endIndex = Math.min(idx + slimGridSize, array.length);
        const chunkArr = array.slice(startIndex, endIndex);

        return <SlimVideoRow slimVideoData={chunkArr} key={idx} />;
      }
    })
  );
}
