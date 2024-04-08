/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavbarHome from "../../components/home/NavbarHome";
import SidebarHome from "../../components/home/SidebarHome";
import FeedFilter from "../../components/home/FeedFilter";

const HomeLayout = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  useEffect(() => {
    let bgColor = "#121212";
    if (window.location.pathname.startsWith("/home")) bgColor = "#121212";
    document.body.style.backgroundColor = bgColor;
    return () => {
      document.body.style.backgroundColor = "#121212";
    };
  }, []);

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <SidebarHome isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />
      <Box flexGrow={1} className="center-and-navbar-content">
        <NavbarHome isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />
        <FeedFilter isSideBarOpen={isSideBarOpen} />
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
          <Box sx={{ paddingLeft: "20px", backgroundColor: "#121212" }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeLayout;
