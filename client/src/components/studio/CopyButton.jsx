// eslint-disable-next-line
import React, { useState } from "react";
import { Box } from "@mui/material";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { useTheme } from "@emotion/react";

const CopyButton = ({ linkToCopy }) => {
  // eslint-disable-next-line
  const [isCopied, setIsCopied] = useState(false);
  const theme = useTheme();

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(linkToCopy);
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  return (
    <Box
      aria-label="Copy"
      onClick={handleCopyClick}
      sx={{
        color: theme.palette.studioLightGray,
        ":hover": { color: "white" },
        display: "flex",
        alignItems: "center",
        marginRight: "8px",
        cursor: "pointer",
      }}
    >
      {<ContentCopyOutlinedIcon />}
    </Box>
  );
};

export default CopyButton;
