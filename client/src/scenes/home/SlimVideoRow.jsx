import { Box } from "@mui/material";

import { useContext } from "react";
import { GridSizeContext } from ".";
import SlimVideoCard from "./SlimVideoCard";

const SlimVideoRow = ({ slimVideoData, theme }) => {
  const { slimGridSize } = useContext(GridSizeContext);
  return (
    <Box
      sx={{
        maxWidth: `calc(calc(${slimGridSize}*(500px) - 16px) - 16px)`,
        width: "100%",
        display: "flex",
        marginRight: `${slimGridSize === 2 ? "0px" : "8px"}`,
      }}
    >
      {slimVideoData.map((slimVideo, idx) => {
        return <SlimVideoCard key={idx} slimVideo={slimVideo} />;
      })}
    </Box>
  );
};

export default SlimVideoRow;
