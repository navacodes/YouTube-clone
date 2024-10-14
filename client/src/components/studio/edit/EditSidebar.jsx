/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useContext, useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  List,
  Typography,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import MuiDrawer from "@mui/material/Drawer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { navItems7, navItems5 } from "../NavItems.js";
import { useMediaQuery } from "@mui/material";
import { ArrowBackIcon } from "../../../svgs/Svgs.jsx";
import { StudioLayoutContext } from "../../../scenes/studio/StudioLayout.jsx";
import VideoPreview from "./VideoPreview.jsx";
import { handleRefetch } from "../../../scenes/studio/index.jsx";

const drawerWidth = 256;

const openedMixin = (theme) => ({
  width: drawerWidth,
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  overflowX: "hidden",
  width: `calc(${theme.spacing(9)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: 73,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "isSideBarOpen",
})(({ theme, isSideBarOpen }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(isSideBarOpen && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!isSideBarOpen && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function EditSidebar({ isSideBarOpen, setIsSideBarOpen }) {
  const { editVideoData } = useContext(StudioLayoutContext);

  const theme = useTheme();
  const navigate = useNavigate();
  const videoId = useSelector((state) => state.global.videoId);
  const windowSize1310 = useMediaQuery("(min-width:1310px)");
  const token = useSelector((state) => state.global.token);
  const decodedToken = !token ? null : decodeToken(token);

  const [mediaUrl, setMediaUrl] = useState(null);

  useEffect(() => {
    if (windowSize1310) setIsSideBarOpen(true);
    if (!windowSize1310) setIsSideBarOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize1310]);

  useEffect(() => {
    setMediaUrl(editVideoData.mediaUrl);
  }, [editVideoData]);

  return !token ? (
    <div>Login First.. </div>
  ) : (
    <Box component="nav">
      <Drawer
        variant="permanent"
        isSideBarOpen={isSideBarOpen}
        sx={{
          display: "flex",
          position: "relative",
          "& .MuiDrawer-paper": {
            paddingTop: "59px",
            backgroundColor: theme.palette.studioMediumGray,
            borderRight: "none",
            height: "100%",
            display: "flex",
            flexGrow: 1,
            flexDirection: "column",
            overflow: "hidden",
          },
        }}
      >
        <List
          sx={{
            paddingTop: "0px",
            paddingBottom: "10px",
            width: "auto",
          }}
        >
          <ListItem
            key={videoId}
            sx={{
              width: "99%",
              paddingTop: "8px",
              position: "relative",
              "& .MuiListItemButton-root:hover": {
                backgroundColor: theme.palette.studioDarkGray,
              },
              "& .MuiTypography-root": {
                fontSize: "15px",
                color: "white",
              },
            }}
            disablePadding
          >
            <ListItemButton
              onClick={() => {
                navigate(`/studio/${decodedToken.id}`);
                handleRefetch();
              }}
              sx={{
                backgroundColor: theme.palette.studioMediumGray,
                padding: isSideBarOpen
                  ? "8.75px 20px 8.75px 16px"
                  : " 12px 10px 12px 22px",
                verticalAlign: "middle",
              }}
            >
              <ListItemIcon
                sx={{
                  color: "white",
                }}
              >
                <ArrowBackIcon fill="#909090" />
              </ListItemIcon>
              <ListItemText primary={"Channel content"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Box
          sx={{
            height: isSideBarOpen ? "208px" : "60px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            flex: "0 0 auto",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <VideoPreview isSideBarOpen={isSideBarOpen} mediaUrl={mediaUrl} />
          <Box
            sx={{
              boxSizing: "border-box",
              width: "100%",
              paddingX: "24px",
              display: "flex",
              flexDirection: "column",
              position: "absolute",
              top: "136px",
            }}
          >
            {isSideBarOpen && (
              <>
                <Typography
                  sx={{
                    fontSize: "15px",
                    paddingTop: "14px",
                    color: "#FFFFFF",
                  }}
                >
                  Your Video{" "}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: theme.palette.studioLightGray,
                  }}
                >
                  {editVideoData.title}
                </Typography>
              </>
            )}
          </Box>
        </Box>
        <List
          sx={{
            paddingTop: "0px",
            paddingBottom: "10px",
            flex: "1 1 auto",
            width: "auto",
          }}
        >
          {navItems7.map(({ text, icon }) => {
            const lcText = text.toLowerCase();
            const beforeStyle = {
              "& ::before": {
                content: `" "`,
                width: "4px",
                height: "100%",
                backgroundColor: theme.palette.studioRed,
                position: "absolute",
                left: "0px",
                top: "0px",
                bottom: "0px",
                zIndex: 2,
              },
            };

            return (
              <ListItem
                key={text}
                sx={
                  ({
                    width: "99%",
                    position: "relative",
                    "& .MuiListItemButton-root:hover": {
                      backgroundColor: theme.palette.studioDarkGray,
                    },
                    "& .MuiTypography-root": {
                      fontSize: "15px",
                      color: theme.palette.studioLightGray,
                    },
                  },
                  text === "Details" ? { ...beforeStyle } : {})
                }
                disablePadding
              >
                <ListItemButton
                  sx={{
                    backgroundColor:
                      text === "Details"
                        ? theme.palette.studioDarkGray
                        : theme.palette.studioMediumGray,
                    padding: isSideBarOpen
                      ? "8.75px 20px 8.75px 16px"
                      : " 12px 10px 12px 22px",
                    verticalAlign: "middle",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "white",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <List
          sx={{
            paddingTop: "0px",
            paddingBottom: "10px",
          }}
        >
          {navItems5.map(({ text, icon }) => {
            const lcText = text.toLowerCase();

            return (
              <ListItem
                key={text}
                sx={{
                  width: "99%",
                  "& .MuiListItemButton-root:hover": {
                    backgroundColor: theme.palette.studioDarkGray,
                  },
                  "& .MuiTypography-root": {
                    fontSize: "15px",
                    color: theme.palette.studioLightGray,
                  },
                }}
                disablePadding
              >
                <ListItemButton
                  sx={{
                    backgroundColor:
                      text === "Content"
                        ? theme.palette.studioDarkGray
                        : theme.palette.studioMediumGray,
                    padding: isSideBarOpen
                      ? "8.75px 20px 8.75px 16px"
                      : " 12px 10px 12px 22px",
                    verticalAlign: "middle",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "white",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
}
