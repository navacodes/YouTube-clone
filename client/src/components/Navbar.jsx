/* eslint-disable array-callback-return */
import React, { useState } from "react";
import { useJwt } from "react-jwt";
import { useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import FlexBetween from "../components/FlexBetween.jsx";
import Modal from "@mui/material/Modal";

import SearchIcon from "@mui/icons-material/Search";
import YoutubeLightIcon from "../svgs/YoutubeLight.svg";
import CreateIcon from "../svgs/Create.svg";
import BellIcon from "../svgs/Bell-Icon.svg";
import BlankProfile from "../img/blankProfile.jpg";
import EmptyProfile from "../svgs/EmptyProfile.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSelector } from "react-redux";
import {
  navItems6,
  navItems7,
  navItems8,
  navItems9,
  navItems10,
} from "./NavItems.js";
import { useLogoutUserMutation } from "../state/api.js";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "isSideBarOpen",
})(({ theme, isSideBarOpen }) => ({
  height: "59px",
  zIndex: theme.zIndex.drawer + 1,
  ...(isSideBarOpen && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
  }),
}));

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  flex: " 0 1 732px",
  position: "relative",
  borderRadius: 40,
  backgroundColor: theme.palette.searchHomeDark,
  border: `1px solid ${theme.palette.borderHomeDark}`,
  marginLeft: 0,
  maxWidth: "640px",
  minWidth: "300px",
  justifyContent: "flex-end",
  alignItems: "center",
}));

const IconWrapper = styled("div")(({ theme }) => ({
  height: "100%",
  pointerEvents: "auto",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  paddingLeft: "16px",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 1),
    fontSize: "16px",
    color: theme.palette.textPrimaryDark,
    // vertical padding + font size from searchIcon
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    width: "100%",
  },
}));

const HomeModal = ({
  open,
  handleModal,
  theme,
  token,
  navigate,
  logout,
  isLoadingLogout,
}) => {
  // eslint-disable-next-line no-unused-vars
  const { decodedToken, isExpired } = useJwt(token);
  // console.log(decodedToken);
  const style = {
    position: "absolute",
    top: "5.5%",
    right: "1.5%",
    width: "300px",
    bgcolor: "#282828",
    borderRadius: "12px",
    boxShadow: 24,
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{
          "& .MuiBackdrop-root": {
            opacity: 0.1,
          },
        }}>
        <Box sx={style} className="modal-container">
          <Box
            className="modal-header"
            sx={{
              padding: "16px",
              width: "300px",
              height: "105px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
            }}>
            <Box className="modal-profileImg">
              <IconWrapper
                sx={{
                  borderRadius: "50%",
                  marginRight: "16px",
                }}>
                <img
                  src={decodedToken?.profileImg}
                  alt="profile"
                  style={{
                    height: "40px",
                    borderRadius: "50%",
                  }}
                />
              </IconWrapper>
            </Box>
            <Box className="modal-userData">
              <Typography
                variant="h5"
                sx={{ color: theme.palette.textPrimaryDark }}>
                {decodedToken?.name}
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: theme.palette.textPrimaryDark }}>
                @{decodedToken?.channelName.toLowerCase()}
              </Typography>
              <Typography
                onClick={() => {
                  navigate(`/studio/${decodedToken?.id}`);
                }}
                variant="h6"
                sx={{ color: "#3Ea6FF", marginTop: "8px", cursor: "pointer" }}>
                View your channel
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box className="modal-menu" sx={{ width: "300px" }}>
            <List className="menu-section">
              {navItems6.map(({ text, icon }) => {
                const lctxt = text.toLowerCase();
                return (
                  <ListItem
                    key={text}
                    sx={{
                      "& .MuiListItemButton-root:hover": {
                        backgroundColor: "#404040",
                      },
                      "& .MuiTypography-root": {
                        fontSize: "14px",
                      },
                    }}
                    disablePadding>
                    <ListItemButton
                      sx={{
                        color: theme.palette.textPrimaryDark,
                        backgroundColor: theme.palette.darkGrayHome,
                        verticalAlign: "middle",
                      }}
                      onClick={() => {
                        if (lctxt === "sign out") {
                          handleLogout();
                          navigate("/");
                        }
                      }}>
                      <ListItemIcon
                        sx={{
                          color: "white",
                        }}>
                        <img src={icon} alt={icon} />
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {text.includes("Switch") ? <ChevronRightIcon /> : ""}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            <Divider />
            <List className="menu-section">
              {navItems7.map(({ text, icon }) => {
                return (
                  <ListItem
                    key={text}
                    sx={{
                      "& .MuiListItemButton-root:hover": {
                        backgroundColor: "#404040",
                      },
                      "& .MuiTypography-root": {
                        fontSize: "14px",
                      },
                    }}
                    disablePadding>
                    <ListItemButton
                      sx={{
                        color: theme.palette.textPrimaryDark,
                        backgroundColor: theme.palette.darkGrayHome,
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
            <List className="menu-section">
              {navItems8.map(({ text, icon }) => {
                return (
                  <ListItem
                    key={text}
                    sx={{
                      "& .MuiListItemButton-root:hover": {
                        backgroundColor: "#404040",
                      },
                      "& .MuiTypography-root": {
                        fontSize: "14px",
                      },
                    }}
                    disablePadding>
                    <ListItemButton
                      sx={{
                        color: theme.palette.textPrimaryDark,
                        backgroundColor: theme.palette.darkGrayHome,
                        verticalAlign: "middle",
                      }}>
                      <ListItemIcon
                        sx={{
                          color: "white",
                        }}>
                        <img src={icon} alt={icon} />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${text} ${
                          text === "Location:" ? `${decodedToken?.country}` : ""
                        }`}
                      />{" "}
                      {!text.includes("data") && !text.includes("Keyboard") ? (
                        <ChevronRightIcon />
                      ) : (
                        ""
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            <Divider />
            <List className="menu-section">
              {navItems9.map(({ text, icon }) => {
                return (
                  <ListItem
                    key={text}
                    sx={{
                      "& .MuiListItemButton-root:hover": {
                        backgroundColor: "#404040",
                      },
                      "& .MuiTypography-root": {
                        fontSize: "14px",
                      },
                    }}
                    disablePadding>
                    <ListItemButton
                      sx={{
                        color: theme.palette.textPrimaryDark,
                        backgroundColor: theme.palette.darkGrayHome,
                        verticalAlign: "middle",
                      }}>
                      <ListItemIcon
                        sx={{
                          color: "white",
                        }}>
                        <img src={icon} alt={icon} />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${text} ${
                          text === "Location:" ? `${decodedToken?.country}` : ""
                        }`}
                      />{" "}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            <Divider />
            <List className="menu-section">
              {navItems10.map(({ text, icon }) => {
                return (
                  <ListItem
                    key={text}
                    sx={{
                      "& .MuiListItemButton-root:hover": {
                        backgroundColor: "#404040",
                      },
                      "& .MuiTypography-root": {
                        fontSize: "14px",
                      },
                    }}
                    disablePadding>
                    <ListItemButton
                      sx={{
                        color: theme.palette.textPrimaryDark,
                        backgroundColor: theme.palette.darkGrayHome,
                        verticalAlign: "middle",
                      }}>
                      <ListItemIcon
                        sx={{
                          color: "white",
                        }}>
                        <img src={icon} alt={icon} />
                      </ListItemIcon>
                      <ListItemText
                        primary={`${text} ${
                          text === "Location:" ? `${decodedToken?.country}` : ""
                        }`}
                      />{" "}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
const NavbarLoggedIn = ({
  theme,
  open,
  handleModal,
  token,
  navigate,
  logout,
  isLoadingLogout,
}) => {
  return (
    <FlexBetween
      sx={{
        width: "136px",
      }}>
      <IconWrapper
        sx={{
          borderRadius: "50%",
          " :hover": {
            backgroundColor: theme.palette.darkGrayHome,
          },
        }}>
        <img src={CreateIcon} alt={CreateIcon} />
      </IconWrapper>
      <IconWrapper
        sx={{
          borderRadius: "50%",
          " :hover": {
            backgroundColor: theme.palette.darkGrayHome,
          },
        }}>
        <img src={BellIcon} alt={BellIcon} />
      </IconWrapper>
      <IconWrapper
        onClick={handleModal}
        sx={{
          borderRadius: "50%",
          " :hover": {
            backgroundColor: theme.palette.darkGrayHome,
          },
        }}>
        <img
          src={BlankProfile}
          alt={BlankProfile}
          style={{
            height: "32px",
            borderRadius: "50%",
          }}
        />
      </IconWrapper>
      <HomeModal
        open={open}
        handleModal={handleModal}
        theme={theme}
        token={token}
        navigate={navigate}
        logout={logout}
        isLoadingLogout={isLoadingLogout}
      />
    </FlexBetween>
  );
};

const NavbarLoggedOut = ({ theme, navigate }) => {
  return (
    <FlexBetween>
      <IconButton sx={{ marginRight: "8px" }}>
        <MoreVertIcon
          sx={{
            color: theme.palette.textPrimaryDark,
            fontSize: "24px",
          }}
        />
      </IconButton>
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
    </FlexBetween>
  );
};

export default function Navbar({ isSideBarOpen, setIsSideBarOpen }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.global.token);
  const [open, setOpen] = useState(false);
  const [logout, { isLoading }] = useLogoutUserMutation();
  const handleModal = () => {
    setOpen(!open);
  };

  const handleDrawer = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        isSideBarOpen={isSideBarOpen}
        sx={{
          background: theme.palette.bgHomeDark,
          boxShadow: "none",
          "& .MuiToolbar-regular": {
            padding: "0px 25px",
            minHeight: "59px",
          },
        }}>
        <Toolbar
          sx={{
            width: "100%",
          }}>
          <FlexBetween className="space-between-navbar" sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawer}
                edge="start"
                sx={{
                  ...(isSideBarOpen && { display: "none" }),
                  padding: "8px",
                  color: theme.palette.textPrimaryDark,
                }}>
                <MenuIcon fontSize={"40"} />
              </IconButton>
              {/* change the yt icon to dynamic icon */}
              <img
                src={YoutubeLightIcon}
                alt=""
                style={{
                  ...(isSideBarOpen && { display: "none" }),
                  marginLeft: "11px",
                }}
              />
            </Box>
            <Search className="search-bar">
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
              <IconWrapper
                sx={{
                  position: "absolute",
                  padding: theme.spacing(0, 2),
                  pointerEvents: "all",
                  borderRadius: "0 40px 40px 0",
                  backgroundColor: "#222222",
                }}>
                <SearchIcon
                  sx={{
                    color: theme.palette.textPrimaryDark,
                    fontSize: "24px",
                  }}
                />
              </IconWrapper>
            </Search>
            {token ? (
              <NavbarLoggedIn
                theme={theme}
                open={open}
                handleModal={handleModal}
                token={token}
                navigate={navigate}
                logout={logout}
                isLoadingLogout={isLoading}
              />
            ) : (
              <NavbarLoggedOut theme={theme} navigate={navigate} />
            )}
          </FlexBetween>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
