import React, { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import SidebarStudio from "../../components/studio/SidebarStudio";
import NavbarStudio from "../../components/studio/NavbarStudio";
import { useTheme } from "@emotion/react";

const StudioLayout = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const theme = useTheme();

  return (
    <Box sx={{ width: "100%", height: "100%", background: theme.palette.studioMediumGray }}>
      <SidebarStudio isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />
      <Box flexGrow={1} className="center-and-navbar-content">
        <NavbarStudio isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />
        <Box
          sx={{
            ...(isSideBarOpen && {
              marginLeft: "256px",
              width: "calc(100% - 256px)",
              height: "100%",
            }),
            ...(!isSideBarOpen && {
              marginLeft: "73px",
              width: "calc(100% - 73px)",
            }),
            marginTop: "59px",
          }}
        >
          <Box>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StudioLayout;
