/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import FeedFilter from "./components/FeedFilter";

const Layout = () => {
  // const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Sidebar
        // isStudio={isStudio}
        // isNonMobile={isNonMobile}
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <Box flexGrow={1} className="center-and-navbar-content">
        <Box>
          <Navbar
            // isStudio={isStudio}
            isSideBarOpen={isSideBarOpen}
            setIsSideBarOpen={setIsSideBarOpen}
          />
          <Box>
            <FeedFilter isSideBarOpen={isSideBarOpen} />
          </Box>
        </Box>
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
          }}>
          <Box sx={{ paddingLeft: "20px" }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
