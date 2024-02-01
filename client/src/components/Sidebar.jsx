/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import { decodeToken } from "react-jwt";
import { styled, useTheme } from "@mui/material/styles";
import { Box, List, Typography, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import MuiDrawer from "@mui/material/Drawer";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SubscriptionsSectionLoggedOut from "./SubscriptionsSectionLoggedOut.jsx";

import { navItems1, navItems2LoggedIn, navItems2LoggedOut, navItems3, navItems4, navItems5 } from "./NavItems.js";
import { useMediaQuery } from "@mui/material";

const drawerWidth = 240;

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
  background: theme.palette.mode.bgHomeDark,
  ...(isSideBarOpen && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!isSideBarOpen && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar({ isSideBarOpen, setIsSideBarOpen }) {
  const theme = useTheme();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const windowSize1310 = useMediaQuery("(min-width:1310px)");
  const token = useSelector((state) => state.global.token);
  let decodedToken = !token ? null : decodeToken(token);

  const showMoreSubscriptionRef = useRef(null);

  const SubscriptionsSectionLoggedIn = lazy(() => import("./SubscriptionsSectionLoggedIn.jsx"));

  // const handleDrawer = () => {
  //   setIsSideBarOpen(!isSideBarOpen);
  // };
  useEffect(() => {
    if (windowSize1310) setIsSideBarOpen(true);
    if (!windowSize1310) setIsSideBarOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowSize1310]);

  return (
    <Box component="nav" sx={{}}>
      <Drawer
        variant="permanent"
        isSideBarOpen={isSideBarOpen}
        sx={{
          position: "relative",
          "& .MuiDrawer-paper": {
            marginTop: "70px",
            backgroundColor: theme.palette.bgHomeDark,
            borderRight: "none",
            height: "100%",
            display: "block",
          },
        }}
      >
        <List
          sx={{
            paddingTop: "0px",
            paddingBottom: "10px",
          }}
        >
          {navItems1.map(({ text, icon }) => {
            const lcText = text.toLowerCase();

            return (
              <ListItem
                key={text}
                sx={{
                  padding: "0px 12px",
                  borderRadius: "10px",
                  "& .MuiListItemButton-root:hover": {
                    backgroundColor: theme.palette.darkGrayHome,
                  },
                  "& .MuiTypography-root": {
                    fontSize: "14px",
                  },
                }}
                disablePadding
              >
                <ListItemButton
                  onClick={() => {
                    navigate(`/${lcText}`);
                    setActive(lcText);
                  }}
                  sx={{
                    color: theme.palette.textPrimaryDark,
                    backgroundColor: text === "Home" ? theme.palette.darkGrayHome : theme.palette.bgHomeDark,
                    borderRadius: "10px",
                    padding: isSideBarOpen ? "8px 12px" : " 12px 10px 12px 16px",
                    verticalAlign: "middle",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "white",
                    }}
                  >
                    <img src={icon} alt={icon} />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <List
          sx={{
            paddingTop: "10px",
            paddingBottom: "10px",
          }}
        >
          {(token ? navItems2LoggedIn : navItems2LoggedOut).map(({ text, icon }) => {
            if (!icon) {
              return (
                <ListItem
                  key={text}
                  sx={{
                    paddingX: "12px",
                    "& .MuiListItemButton-root:hover": {
                      backgroundColor: theme.palette.darkGrayHome,
                    },
                    "& .MuiTypography-root": {
                      fontSize: "14px",
                    },
                  }}
                  disablePadding
                >
                  <ListItemButton
                    sx={{
                      color: theme.palette.textPrimaryDark,
                      padding: isSideBarOpen ? "8px 12px" : " 8px 14px",
                      borderRadius: "10px",
                    }}
                  >
                    <ListItemIcon>{<ExpandMoreOutlinedIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              );
            }
            const lcText = text.toLowerCase();

            return (
              <ListItem
                key={text}
                sx={{
                  padding: "0px 12px",
                  borderRadius: "10px",
                  "& .MuiListItemButton-root:hover": {
                    backgroundColor: theme.palette.darkGrayHome,
                  },
                  "& .MuiTypography-root": {
                    fontSize: "14px",
                  },
                }}
                disablePadding
              >
                <ListItemButton
                  onClick={() => {
                    navigate(`/${lcText === "your videos" ? "studio" : "noroute"}/${decodedToken.id}`);
                    setActive(lcText);
                  }}
                  sx={{
                    backgroundColor: theme.palette.bgHomeDark,
                    color: theme.palette.textPrimaryDark,
                    padding: isSideBarOpen ? "8px 12px" : " 12px 10px 12px 16px",
                    borderRadius: "10px",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "white",
                    }}
                  >
                    <img src={icon} alt={icon} />
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        {token ? (
          <Suspense fallback={<div>Loading Subscriptions...</div>}>
            <SubscriptionsSectionLoggedIn isSideBarOpen={isSideBarOpen} theme={theme} showMoreSubscriptionRef={showMoreSubscriptionRef} />
          </Suspense>
        ) : (
          <SubscriptionsSectionLoggedOut isSideBarOpen={isSideBarOpen} theme={theme} navigate={navigate} />
        )}

        {isSideBarOpen && (
          <>
            <Divider />
            <Typography
              variant="h5"
              component="div"
              sx={{
                padding: "18px 108px 4px 20px",
                color: theme.palette.textPrimaryDark,
              }}
            >
              Explore
            </Typography>

            <List
              sx={{
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              {navItems3.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <ListItem
                      key={text}
                      sx={{
                        paddingX: "12px",
                        "& .MuiListItemButton-root:hover": {
                          backgroundColor: theme.palette.darkGrayHome,
                        },
                        "& .MuiTypography-root": {
                          fontSize: "14px",
                        },
                      }}
                      disablePadding
                    >
                      <ListItemButton
                        sx={{
                          color: theme.palette.textPrimaryDark,
                          padding: isSideBarOpen ? "8px 12px" : " 8px 14px",
                          borderRadius: "10px",
                        }}
                      >
                        <ListItemIcon>
                          <Box
                            sx={{
                              height: "24px",
                              width: "24px",
                              backgroundColor: "#FF0000",
                              display: "block",
                              borderRadius: "50%",
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  );
                }
              })}
            </List>
          </>
        )}

        {isSideBarOpen && (
          <>
            <Divider />
            <Typography
              variant="h5"
              component="div"
              sx={{
                padding: "18px 108px 4px 20px",
                color: theme.palette.textPrimaryDark,
              }}
            >
              More from YouTube
            </Typography>

            <List
              sx={{
                background: theme.palette.bgHomeDark,
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              {navItems4.map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <ListItem
                      key={text}
                      sx={{
                        paddingX: "12px",
                        "& .MuiListItemButton-root:hover": {
                          backgroundColor: theme.palette.darkGrayHome,
                        },
                        "& .MuiTypography-root": {
                          fontSize: "14px",
                        },
                      }}
                      disablePadding
                    >
                      <ListItemButton
                        sx={{
                          color: theme.palette.textPrimaryDark,
                          padding: isSideBarOpen ? "8px 12px" : " 8px 14px",
                          borderRadius: "10px",
                        }}
                      >
                        <ListItemIcon>
                          <Box
                            sx={{
                              height: "24px",
                              width: "24px",
                              backgroundColor: "#FF0000",
                              display: "block",
                              borderRadius: "50%",
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                      </ListItemButton>
                    </ListItem>
                  );
                }
              })}
            </List>
          </>
        )}

        {isSideBarOpen && (
          <>
            <Divider />
            <List
              sx={{
                background: theme.palette.bgHomeDark,
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              {navItems5.map(({ text, icon }) => {
                return (
                  <ListItem
                    key={text}
                    sx={{
                      paddingX: "12px",
                      "& .MuiListItemButton-root:hover": {
                        backgroundColor: theme.palette.darkGrayHome,
                      },
                      "& .MuiTypography-root": {
                        fontSize: "14px",
                      },
                    }}
                    disablePadding
                  >
                    <ListItemButton
                      sx={{
                        color: theme.palette.textPrimaryDark,
                        padding: isSideBarOpen ? "8px 12px" : " 8px 14px",
                        borderRadius: "10px",
                      }}
                    >
                      <ListItemIcon>
                        <img src={icon} alt={text} />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            <Divider />
          </>
        )}

        {isSideBarOpen && (
          <Box>
            <Box
              sx={{
                display: "flex",
                width: drawerWidth,
                flexWrap: "wrap",
                padding: "12px 23px 0px",
              }}
            >
              {["About", "Press", "Copyright", "Contact us", "Creators", "Advertise", "Developers"].map((el, idx) => {
                return (
                  <Typography
                    sx={{
                      marginRight: "8px",
                      fontSize: "13px",
                      color: "#AAAAAA",
                    }}
                    key={idx}
                  >
                    {el}
                  </Typography>
                );
              })}
            </Box>
            <Box
              sx={{
                display: "flex",
                width: drawerWidth,
                flexWrap: "wrap",
                padding: "12px 23px 0px",
              }}
            >
              {["Terms", "Privacy", "Poilicy & Safety", "How YouTube works", "Test new features"].map((el, idx) => {
                return (
                  <Typography
                    sx={{
                      marginRight: "8px",
                      fontSize: "13px",
                      color: "#AAAAAA",
                    }}
                    key={idx}
                  >
                    {el}
                  </Typography>
                );
              })}
            </Box>
          </Box>
        )}
      </Drawer>
    </Box>
  );
}

// See this subscription component is meant to load only when a user logs in, and then the api getting all this data should be fetched, but when this component is loaded from the beginning the api starts throwing an error 304 because the user in not logged in at that moment, so I want the api should fetch all this data only when this a user is logs in.
