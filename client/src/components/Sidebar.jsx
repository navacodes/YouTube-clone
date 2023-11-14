/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
import React, { useEffect, useRef, useState } from "react";
import { useJwt } from "react-jwt";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetSubsriptionQuery } from "../state/api";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import YoutubeLightIcon from "../svgs/YoutubeLight.svg";
import EmptyProfile from "../svgs/EmptyProfile.svg";

import {
  navItems1,
  navItems2LoggedIn,
  navItems2LoggedOut,
  navItems3,
  navItems4,
  navItems5,
} from "./NavItems.js";
import { useMediaQuery } from "@mui/material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: 73,
  },
});

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "left",
//   padding: "11px 18px 16px 16px",
//   height: "59px",
// }));

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

const SubscriptionsSectionLoggedIn = ({
  isSideBarOpen,
  theme,
  data,
  isLoading,
  showMoreSubscriptionRef,
  addMoreSubscriptions,
  elementsToAdd,
}) => {
  return (
    isSideBarOpen && (
      <>
        <Divider />
        <Typography
          variant="h5"
          component="div"
          sx={{
            padding: "18px 108px 4px 20px",
            color: theme.palette.textPrimaryDark,
          }}>
          Subscriptions
        </Typography>

        {!data || isLoading ? (
          <Typography
            sx={{
              padding: "18px 108px 4px 20px",
              color: theme.palette.textPrimaryDark,
            }}>
            Loading...
          </Typography>
        ) : (
          <List
            sx={{
              paddingTop: "0px",
              paddingBottom: "10px",
            }}>
            {data.channels.map((channel, idx, array) => {
              if (idx <= 7) {
                return (
                  <ListItem
                    key={channel.name}
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
                    disablePadding>
                    <ListItemButton
                      sx={{
                        backgroundColor: theme.palette.bgHomeDark,
                        color: theme.palette.textPrimaryDark,
                        padding: isSideBarOpen
                          ? "8px 12px"
                          : " 12px 10px 12px 16px",
                        borderRadius: "10px",
                      }}>
                      <ListItemIcon
                        sx={{
                          color: "white",
                          borderRadius: "50%",
                        }}>
                        <img
                          src={channel?.imgUrl}
                          width="24px"
                          alt={channel?.imgUrl}
                          style={{
                            borderRadius: "50%",
                          }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          channel.name.length <= 18
                            ? channel.name
                            : channel.name.substring(0, 17).concat("...")
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                );
              }
            })}
            <ListItem
              ref={showMoreSubscriptionRef}
              key={`Show ${data.channels.length - 7} more`}
              className="showMoreSubscription"
              sx={{
                paddingX: "12px",
                "& .MuiListItemButton-root:hover": {
                  backgroundColor: theme.palette.darkGrayHome,
                },
                "& .MuiTypography-root": {
                  fontSize: "14px",
                },
              }}
              onClick={addMoreSubscriptions}
              disablePadding>
              <ListItemButton
                sx={{
                  backgroundColor: theme.palette.bgHomeDark,
                  color: theme.palette.textPrimaryDark,
                  padding: isSideBarOpen ? "8px 12px" : " 8px 14px",
                  borderRadius: "10px",
                }}>
                <ListItemIcon>{<ExpandMoreOutlinedIcon />}</ListItemIcon>
                <ListItemText
                  primary={`Show ${data.channels.length - 7} more`}
                />
              </ListItemButton>
            </ListItem>
            {elementsToAdd}
          </List>
        )}
      </>
    )
  );
};
const SubscriptionsSectionLoggedOut = ({ isSideBarOpen, theme, navigate }) => {
  return (
    isSideBarOpen && (
      <>
        <Divider />
        <Box sx={{ padding: "16px 32px" }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: theme.palette.textPrimaryDark,
              width: "176px",
            }}>
            Sign in to like videos, <br /> comment and subscribe.
          </Typography>
          <Box sx={{ mt: "12px" }}>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                border: "1px solid #ffffff33",
                padding: "8px 15px",
                borderRadius: "40px",
                cursor: "pointer",
                pointerEvents: "all",
                ":hover": {
                  backgroundColor: "#263850",
                },
              }}
              onClick={() => navigate("/login")}>
              <img
                src={EmptyProfile}
                alt="empty-profile"
                style={{ marginRight: "6px", marginLeft: "-6px" }}
              />
              <Typography variant="h6" sx={{ color: "#3ea6ff" }}>
                Sign in
              </Typography>
            </Box>
          </Box>
        </Box>
      </>
    )
  );
};

export default function Sidebar({ isSideBarOpen, setIsSideBarOpen }) {
  const theme = useTheme();
  // eslint-disable-next-line no-unused-vars
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const { data, isLoading } = useGetSubsriptionQuery();
  const [elementsToAdd, setElementsToAdd] = useState([]);
  const windowSize1310 = useMediaQuery("(min-width:1310px)");
  const token = useSelector((state) => state.global.token);
  const { decodedToken, isExpired } = useJwt(token);
  const showMoreSubscriptionRef = useRef(null);

  // const handleDrawer = () => {
  //   setIsSideBarOpen(!isSideBarOpen);
  // };
  const showLessSubscriptions = () => {
    setElementsToAdd([]);
    showMoreSubscriptionRef.current.style.display = "flex";
    console.log(showMoreSubscriptionRef.current);
  };
  const addMoreSubscriptions = () => {
    const newElements = data.channels.map((channel, idx, array) => {
      if (idx >= 8) {
        return (
          <ListItem
            key={Math.random() * 1000 - Math.random() * 10}
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
            disablePadding>
            <ListItemButton
              key={`${channel.name}-${idx}-listitembtn`}
              sx={{
                backgroundColor: theme.palette.bgHomeDark,
                color: theme.palette.textPrimaryDark,
                padding: isSideBarOpen ? "8px 12px" : " 12px 10px 12px 16px",
                borderRadius: "10px",
              }}>
              <ListItemIcon
                key={`${channel.name}-${idx}`}
                sx={{
                  color: "white",
                  borderRadius: "50%",
                }}>
                <img
                  src={channel?.imgUrl}
                  width="24px"
                  alt={channel?.imgUrl}
                  style={{
                    borderRadius: "50%",
                  }}
                />
              </ListItemIcon>
              <ListItemText
                key={`${channel.name}-${idx}-listitemtext`}
                primary={
                  channel.name.length <= 18
                    ? channel.name
                    : channel.name.substring(0, 17).concat("...")
                }
              />
            </ListItemButton>
          </ListItem>
        );
      }
    });
    const showLessElement = (
      <>
        <ListItem
          key={`ShowLessElement`}
          className="ShowLessElement"
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
          onClick={showLessSubscriptions}
          disablePadding>
          <ListItemButton
            sx={{
              backgroundColor: theme.palette.bgHomeDark,
              color: theme.palette.textPrimaryDark,
              padding: isSideBarOpen ? "8px 12px" : " 12px 10px 12px 16px",
              borderRadius: "10px",
            }}>
            <ListItemIcon
              sx={{
                color: "white",
                borderRadius: "50%",
              }}>
              <ExpandLessOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={`Show less`} />
          </ListItemButton>
        </ListItem>
      </>
    );

    showMoreSubscriptionRef.current.style.display = "none";
    console.log(showMoreSubscriptionRef.current);

    // Set the state variable to null so that the element is not added again
    setElementsToAdd([...elementsToAdd, ...newElements, showLessElement]);
  };

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
        }}>
        {/* <DrawerHeader>
          <IconButton
            onClick={handleDrawer}
            sx={{
              marginTop: "5px",
              marginLeft: "-3px",
            }}>
            <MenuIcon fontSize={"40"} />
          </IconButton>
          <img
            src={YoutubeLightIcon}
            alt=""
            style={{
              ...(!isSideBarOpen && { display: "none" }),
              marginLeft: "11px",
              marginTop: "5px",
            }}
          />
        </DrawerHeader> */}
        <List
          sx={{
            paddingTop: "0px",
            paddingBottom: "10px",
          }}>
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
                disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate(`/${lcText}`);
                    setActive(lcText);
                  }}
                  sx={{
                    color: theme.palette.textPrimaryDark,
                    backgroundColor:
                      text === "Home"
                        ? theme.palette.darkGrayHome
                        : theme.palette.bgHomeDark,
                    borderRadius: "10px",
                    padding: isSideBarOpen
                      ? "8px 12px"
                      : " 12px 10px 12px 16px",
                    verticalAlign: "middle",
                  }}>
                  <ListItemIcon
                    sx={{
                      color: "white",
                    }}>
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
          }}>
          {(token ? navItems2LoggedIn : navItems2LoggedOut).map(
            ({ text, icon }) => {
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
                    disablePadding>
                    <ListItemButton
                      sx={{
                        color: theme.palette.textPrimaryDark,
                        padding: isSideBarOpen ? "8px 12px" : " 8px 14px",
                        borderRadius: "10px",
                      }}>
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
                  disablePadding>
                  <ListItemButton
                    onClick={() => {
                      navigate(
                        `/${lcText === "your videos" ? "studio" : "noroute"}/${
                          decodedToken.id
                        }`
                      );
                      setActive(lcText);
                    }}
                    sx={{
                      backgroundColor: theme.palette.bgHomeDark,
                      color: theme.palette.textPrimaryDark,
                      padding: isSideBarOpen
                        ? "8px 12px"
                        : " 12px 10px 12px 16px",
                      borderRadius: "10px",
                    }}>
                    <ListItemIcon
                      sx={{
                        color: "white",
                      }}>
                      <img src={icon} alt={icon} />
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              );
            }
          )}
        </List>

        {token ? (
          <SubscriptionsSectionLoggedIn
            isSideBarOpen={isSideBarOpen}
            theme={theme}
            data={data}
            isLoading={isLoading}
            showMoreSubscriptionRef={showMoreSubscriptionRef}
            addMoreSubscriptions={addMoreSubscriptions}
            elementsToAdd={elementsToAdd}
          />
        ) : (
          <SubscriptionsSectionLoggedOut
            isSideBarOpen={isSideBarOpen}
            theme={theme}
            navigate={navigate}
          />
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
              }}>
              Explore
            </Typography>

            <List
              sx={{
                paddingTop: "10px",
                paddingBottom: "10px",
              }}>
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
                      disablePadding>
                      <ListItemButton
                        sx={{
                          color: theme.palette.textPrimaryDark,
                          padding: isSideBarOpen ? "8px 12px" : " 8px 14px",
                          borderRadius: "10px",
                        }}>
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
              }}>
              More from YouTube
            </Typography>

            <List
              sx={{
                background: theme.palette.bgHomeDark,
                paddingTop: "10px",
                paddingBottom: "10px",
              }}>
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
                      disablePadding>
                      <ListItemButton
                        sx={{
                          color: theme.palette.textPrimaryDark,
                          padding: isSideBarOpen ? "8px 12px" : " 8px 14px",
                          borderRadius: "10px",
                        }}>
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
              }}>
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
                    disablePadding>
                    <ListItemButton
                      sx={{
                        color: theme.palette.textPrimaryDark,
                        padding: isSideBarOpen ? "8px 12px" : " 8px 14px",
                        borderRadius: "10px",
                      }}>
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
              }}>
              {[
                "About",
                "Press",
                "Copyright",
                "Contact us",
                "Creators",
                "Advertise",
                "Developers",
              ].map((el, idx) => {
                return (
                  <Typography
                    sx={{
                      marginRight: "8px",
                      fontSize: "13px",
                      color: "#AAAAAA",
                    }}
                    key={idx}>
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
              }}>
              {[
                "Terms",
                "Privacy",
                "Poilicy & Safety",
                "How YouTube works",
                "Test new features",
              ].map((el, idx) => {
                return (
                  <Typography
                    sx={{
                      marginRight: "8px",
                      fontSize: "13px",
                      color: "#AAAAAA",
                    }}
                    key={idx}>
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
