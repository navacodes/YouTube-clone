import React, { createContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import SidebarStudio from "../../components/studio/SidebarStudio";
import NavbarStudio from "../../components/studio/NavbarStudio";
import { useTheme } from "@emotion/react";
import EditSidebar from "../../components/studio/edit/EditSidebar";

export const StudioLayoutContext = createContext(null);

const StudioLayout = () => {
  const location = useLocation();
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [editVideoPageInUse, seteditVideoPageInUse] = useState(false);
  const [editVideoData, setEditVideoData] = useState({
    title: "Made by RLM ( Dev Code )",
    description: "Made by RLM ( Dev Code )",
    mediaUrl: "",
    visibility: "",
  });
  const theme = useTheme();
  useEffect(() => {
    let bgColor = "#121212";
    if (location.pathname.startsWith("/studio")) bgColor = "#282828";
    document.body.style.backgroundColor = bgColor;
    return () => {
      document.body.style.backgroundColor = "#121212";
    };
  }, [location]);

  useEffect(() => {
    const updateState = () => {
      if (location.pathname.startsWith("/studio/video/edit")) seteditVideoPageInUse(true);
      else seteditVideoPageInUse(false);
    };
    updateState();

    return () => {
      seteditVideoPageInUse(false);
    };
  }, [location]);


  return (
    <StudioLayoutContext.Provider
      value={{
        uploadDialogOpen: uploadDialogOpen,
        setUploadDialogOpen: setUploadDialogOpen,
        isSideBarOpen: isSideBarOpen,
        setEditVideoData: setEditVideoData,
        editVideoData: editVideoData,
        editVideoPageInUse: editVideoPageInUse,
      }}
    >
      <Box sx={{ width: "100%", height: "100%" }}>
        {editVideoPageInUse ? (
          <EditSidebar isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />
        ) : (
          <SidebarStudio isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />
        )}

        <Box flexGrow={1} className="center-and-navbar-content">
          <NavbarStudio isSideBarOpen={isSideBarOpen} setIsSideBarOpen={setIsSideBarOpen} />
          <Box
            sx={{
              backgroundColor: "#282828",
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
            <Box sx={{ background: theme.palette.studioMediumGray }}>
              <Outlet />
            </Box>
          </Box>
        </Box>
      </Box>
    </StudioLayoutContext.Provider>
  );
};

export default StudioLayout;
