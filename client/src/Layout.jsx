import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useLoginUserMutation } from "./state/api";
import { useSelector } from "react-redux";

const Layout = () => {
  // const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const userId = useSelector((state) => state.global.user);
  const [loginUser] = useLoginUserMutation(userId);
  // console.log("data", loginUser);

  return (
    <Box>
      <Sidebar
        user={loginUser || {}}
        // isStudio={isStudio}
        // isNonMobile={isNonMobile}
        isSideBarOpen={isSideBarOpen}
        setIsSideBarOpen={setIsSideBarOpen}
      />
      <Box flexGrow={1}>
        <Navbar
          user={loginUser || {}}
          // isStudio={isStudio}
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
