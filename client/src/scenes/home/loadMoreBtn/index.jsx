import React, { useContext, useEffect, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { GridSizeContext } from "..";
import Divider from "@mui/material/Divider";

const LoadMoreBtn = ({ refetch, showMore, moreShortsRef }) => {
  const [show, setShow] = useState(showMore);
  const toggle = () => {
    const currentDisplay = moreShortsRef.current.style.display;

    if (currentDisplay === "block") {
      moreShortsRef.current.style.display = "none";
      setShow(true);
    } else {
      moreShortsRef.current.style.display = "block";
      setShow(false);
    }
  };

  const showMoreOrLess = () => {
    if (showMore) {
      refetch();
    } else {
      toggle();
    }
  };

  useEffect(() => {
    setShow(showMore);
  }, [showMore]);
  const { theme } = useContext(GridSizeContext);

  useEffect(() => {});
  return (
    <Box className="showMore--slimVids" sx={{ marginBottom: "32px", width: "100%" }}>
      <Divider sx={{ marginRight: "16px" }}>
        <IconButton sx={{ borderRadius: "18em", width: "358px", height: "34px", border: `1px solid ${theme.palette.borderHomeDark}` }} onClick={showMoreOrLess}>
          <Typography variant="h6"> Show more </Typography> {show ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </IconButton>
      </Divider>
    </Box>
  );
};

export default LoadMoreBtn;
