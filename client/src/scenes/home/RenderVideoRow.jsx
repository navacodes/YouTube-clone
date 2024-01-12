/* eslint-disable array-callback-return */
import { useContext } from "react";
import { GridSizeContext } from ".";
import VideoRow from "./VideoRow";

export default function VideoRows({ isLoading, videos, row }) {
  const { gridSize, theme } = useContext(GridSizeContext);

  if (isLoading) {
    return <p style={{ color: theme.palette.textPrimaryDark }}>Loading...</p>;
  }

  const renderVideoRows = (startIndex, endIndex) => {
    const chunkArr = videos.slice(startIndex, endIndex);
    return <VideoRow videoDataArr={chunkArr} key={startIndex} />;
  };

  return videos.map((videoData, idx, array) => {
    const topRow = row === "isTopRow" ? idx % gridSize === 0 && idx < 8 : null;
    const restRow =
      row === "isRestRow" ? idx % gridSize === 0 && idx > 8 : null;

    if (topRow) {
      const startIndex = idx;
      const endIndex = Math.min(idx + gridSize, array.length);
      return renderVideoRows(startIndex, endIndex);
    }
    if (restRow) {
      const startIndex = idx;
      const endIndex = Math.min(idx + gridSize, array.length);
      return renderVideoRows(startIndex, endIndex);
    }

    return null; // Return null for non-top and non-rest rows
  });
}
