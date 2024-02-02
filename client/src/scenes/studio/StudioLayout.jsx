import React, { useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import SidebarStudio from "../../components/studio/SidebarStudio";
import NavbarStudio from "../../components/studio/NavbarStudio";

const StudioLayout = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <SidebarStudio isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />
      <Box flexGrow={1} className="center-and-navbar-content">
        <NavbarStudio isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />
        <Box
          sx={{
            ...(isSideBarOpen && {
              marginLeft: "240px",
              width: "calc(100% - 240px)",
            }),
            ...(!isSideBarOpen && {
              marginLeft: "73px",
              width: "calc(100% - 73px)",
            }),
            marginTop: "120px",
          }}
        >
          <Box sx={{ paddingLeft: "20px" }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default StudioLayout;
