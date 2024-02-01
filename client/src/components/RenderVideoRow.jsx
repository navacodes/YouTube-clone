/* eslint-disable array-callback-return */
import { useContext } from "react";
import { GridSizeContext } from "../scenes/home";
import VideoRow from "./VideoRow";

export default function VideoRows({ isLoading, videos, row }) {
  const { gridSize, theme } = useContext(GridSizeContext);

  if (isLoading) {
    return <div style={{ width: "100%" }}></div>;
  }

  return videos.map((videoData, idx, array) => {
    if (idx % gridSize === 0) {
      const startIndex = idx;
      const endIndex = Math.min(idx + gridSize, array.length);
      const chunkArr = videos.slice(startIndex, endIndex);
      return <VideoRow videoDataArr={chunkArr} key={startIndex} />;
    }
  });
}
