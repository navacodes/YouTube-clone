import React from "react";
import { Box, Button, Divider, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const Checks = () => {
  const theme = useTheme();
  return (
    <div>
      <Typography variant="h6" sx={{ fontSize: "13px" }}>
        We’ll check your video for issues that may restrict its visibility and then you will have the
      </Typography>
      <Typography variant="h6" sx={{ fontSize: "13px" }}>
        opportunity to fix issues before publishing your video. <span style={{ color: theme.palette.studioBlue }}>Learn more</span>
      </Typography>
      <Box sx={{ padding: "16px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="h5" sx={{ fontSize: "15px", marginBottom: "8px" }}>
            Copyright
          </Typography>
          <Typography sx={{ width: "536px" }}>
            Your Short’s visibility is not affected. The copyright-protected content detected doesn’t affect your Short.{" "}
            <span style={{ color: theme.palette.studioBlue }}>Learn more</span>
          </Typography>
        </Box>
        <Button sx={{ mr: 1 }}>SEE DETAILS</Button>
      </Box>
      <Divider />
      <Typography sx={{ width: "500px", margin: "16px 0 0", padding: "0 0 8px" }}>
        Remember: These check results aren’t final. Issues may come up in the future that impact your video.{" "}
        <span style={{ color: theme.palette.studioBlue }}>Learn more</span>
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button sx={{ mr: 1 }}>Send feedback</Button>
      </Box>
    </div>
  );
};

export default Checks;
