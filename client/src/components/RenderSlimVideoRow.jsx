/* eslint-disable array-callback-return */
import SlimVideoRow from "./SlimVideoRow";
import { useContext } from "react";
import { GridSizeContext } from "../scenes/home";

export default function SlimVideoRows({ isLoading, slimVideos }) {
  const { slimGridSize } = useContext(GridSizeContext);
  return isLoading ? (
    <div style={{ width: "100%" }}></div>
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
