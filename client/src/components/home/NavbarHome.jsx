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
  ListItemText,
  Toolbar,
  InputBase,
  IconButton,
  Modal,
  useMediaQuery,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import FlexBetween from "../FlexBetween.jsx";

import SearchIcon from "@mui/icons-material/Search";
import YoutubeLightIcon from "../../svgs/YoutubeLight.svg";
import { CreateIcon } from "../../svgs/Svgs.jsx";
import BellIcon from "../../svgs/Bell-Icon.svg";
import BlankProfile from "../../img/blankProfile.jpg";
import EmptyProfile from "../../svgs/EmptyProfile.svg";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { navItems6, navItems7, navItems8, navItems9, navItems10, navItems11 } from "./NavItems.js";

import { useSelector } from "react-redux";
import { useLogoutUserMutation } from "../../state/api.js";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "isSideBarOpen",
})(({ theme, isSideBarOpen }) => ({
  height: "59px",
  zIndex: theme.zIndex.drawer + 1,
  display: "block",
}));

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  flex: " 0 1 732px",
  position: "relative",
  borderRadius: 40,
  backgroundColor: theme.palette.searchHomeDark,
  border: `1px solid ${theme.palette.borderHomeDark}`,
  marginLeft: "40px",
  maxWidth: "640px",
  minWidth: "0px",
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

const ChannelModal = ({ open, handleModal, theme, navigate, logout, token }) => {
  const { decodedToken } = useJwt(token);
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
    <Modal
      open={open}
      onClose={handleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        "& .MuiBackdrop-root": {
          opacity: 0.1,
        },
      }}
    >
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
          }}
        >
          <Box className="modal-profileImg">
            <IconWrapper
              sx={{
                borderRadius: "50%",
                marginRight: "16px",
              }}
            >
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
            <Typography variant="h5" sx={{ color: theme.palette.textPrimaryDark }}>
              {decodedToken?.name}
            </Typography>
            <Typography variant="h5" sx={{ color: theme.palette.textPrimaryDark }}>
              @{decodedToken?.channelName.toLowerCase()}
            </Typography>
            <Typography
              onClick={() => {
                navigate(`/studio/${decodedToken?.id}`);
              }}
              variant="h6"
              sx={{ color: "#3Ea6FF", marginTop: "8px", cursor: "pointer" }}
            >
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
                  disablePadding
                >
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
                    {text.includes("Switch") ? <ChevronRightIcon /> : ""}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <Divider />
          <List className="menu-section">
            {navItems7.map(({ text, icon }) => {
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
                  disablePadding
                >
                  <ListItemButton
                    onClick={() => {
                      if (lctxt === "youtube studio") {
                        navigate(`/studio/${decodedToken?.id}`);
                      }
                    }}
                    sx={{
                      color: theme.palette.textPrimaryDark,
                      backgroundColor: theme.palette.darkGrayHome,
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
                  disablePadding
                >
                  <ListItemButton
                    sx={{
                      color: theme.palette.textPrimaryDark,
                      backgroundColor: theme.palette.darkGrayHome,
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
                    <ListItemText primary={`${text} ${text === "Location:" ? `${decodedToken?.country}` : ""}`} />{" "}
                    {!text.includes("data") && !text.includes("Keyboard") ? <ChevronRightIcon /> : ""}
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
                  disablePadding
                >
                  <ListItemButton
                    sx={{
                      color: theme.palette.textPrimaryDark,
                      backgroundColor: theme.palette.darkGrayHome,
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
                    <ListItemText primary={`${text} ${text === "Location:" ? `${decodedToken?.country}` : ""}`} />{" "}
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
                  disablePadding
                >
                  <ListItemButton
                    sx={{
                      color: theme.palette.textPrimaryDark,
                      backgroundColor: theme.palette.darkGrayHome,
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
                    <ListItemText primary={`${text} ${text === "Location:" ? `${decodedToken?.country}` : ""}`} />{" "}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
    </Modal>
  );
};

const CreateModal = ({ open, handleModal, theme, navigate, token }) => {
  const style = {
    position: "absolute",
    top: "5.5%",
    right: "0.5%",
    width: "177px",
    bgcolor: "#282828",
    borderRadius: "12px",
    boxShadow: 24,
  };
  const { decodedToken } = useJwt(token);
  return (
    <Modal
      open={open}
      onClose={handleModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        "& .MuiBackdrop-root": {
          opacity: 0.1,
        },
      }}
    >
      <Box sx={style} className="modal-container">
        <List className="menu-section">
          {navItems11.map(({ text, icon }) => {
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
                disablePadding
              >
                <ListItemButton
                  sx={{
                    color: theme.palette.textPrimaryDark,
                    backgroundColor: theme.palette.darkGrayHome,
                    verticalAlign: "middle",
                  }}
                  onClick={() => {
                    navigate(`/studio/${decodedToken?.id}`);
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
                  {text.includes("Switch") ? <ChevronRightIcon /> : ""}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Modal>
  );
};

const NavbarLoggedIn = ({ theme, openChannelModal, handleChannelModal, navigate, logout, handleCreateModal, openCreateModal, token }) => {
  return (
    <FlexBetween
      sx={{
        width: "136px",
      }}
    >
      <IconWrapper
        onClick={handleCreateModal}
        sx={{
          borderRadius: "50%",
          " :hover": {
            backgroundColor: theme.palette.darkGrayHome,
          },
        }}
      >
        <CreateIcon />
      </IconWrapper>
      <IconWrapper
        sx={{
          borderRadius: "50%",
          " :hover": {
            backgroundColor: theme.palette.darkGrayHome,
          },
        }}
      >
        <img src={BellIcon} alt={BellIcon} />
      </IconWrapper>
      <IconWrapper
        onClick={handleChannelModal}
        sx={{
          borderRadius: "50%",
          " :hover": {
            backgroundColor: theme.palette.darkGrayHome,
          },
        }}
      >
        <img
          src={BlankProfile}
          alt={BlankProfile}
          style={{
            height: "32px",
            borderRadius: "50%",
          }}
        />
      </IconWrapper>
      <ChannelModal open={openChannelModal} handleModal={handleChannelModal} theme={theme} navigate={navigate} logout={logout} token={token} />
      <CreateModal open={openCreateModal} handleModal={handleCreateModal} token={token} theme={theme} navigate={navigate} />
    </FlexBetween>
  );
};

const NavbarLoggedOut = ({ theme, navigate, greaterThan590 }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        minWidth: greaterThan590 ? "225px" : "0px",
        justifyContent: "flex-end",
      }}
    >
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
          padding: "5px 15px",
          borderRadius: "40px",
          cursor: "pointer",
          pointerEvents: "all",
          ":hover": {
            backgroundColor: "#263850",
          },
        }}
        onClick={() => navigate("/login")}
      >
        <img src={EmptyProfile} alt="empty-profile" style={{ marginRight: "6px", marginLeft: "-6px" }} />
        <Typography variant="h6" sx={{ color: "#3ea6ff" }}>
          Sign in
        </Typography>
      </Box>
    </Box>
  );
};

export default function NavbarHome({ isSideBarOpen, setIsSideBarOpen }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.global.token);
  const [openChannelModal, setOpenChannelModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  // eslint-disable-next-line
  const [logout, { isLoading }] = useLogoutUserMutation();
  const greaterThan590 = useMediaQuery("(min-width:590px)"); // true when greaterThan590

  const handleChannelModal = () => {
    setOpenChannelModal(!openChannelModal);
  };
  const handleCreateModal = () => {
    setOpenCreateModal(!openCreateModal);
  };

  const handleDrawer = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  return (
    <AppBar
      position="fixed"
      isSideBarOpen={isSideBarOpen}
      sx={{
        position: "fixed",
        background: theme.palette.bgHomeDark,
        boxShadow: "none",
        display: "block",
        "& .MuiToolbar-regular": {
          minHeight: "59px",
        },
      }}
    >
      <Toolbar
        sx={{
          width: "100%",
          paddingX: "24px",
        }}
      >
        <FlexBetween className="space-between-navbar" sx={{ width: "100%", flexDirection: "row" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawer}
              edge="start"
              sx={{
                padding: "8px",
                color: theme.palette.textPrimaryDark,
              }}
            >
              <MenuIcon fontSize={"40"} />
            </IconButton>
            {/* change the yt icon to dynamic icon */}
            <img
              onClick={() => navigate("/")}
              src={YoutubeLightIcon}
              alt=""
              style={{
                marginLeft: "11px",
                cursor: "pointer",
                pointerEvents: "all",
              }}
            />
          </Box>
          {!greaterThan590 && (
            <Box
              sx={{
                display: "flex",
                flex: 1,
                fleBbasis: "0.000000001px",
                justifyContent: "flex-end",
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                sx={{
                  padding: "8px",
                  color: theme.palette.textPrimaryDark,
                }}
              >
                <SearchIcon
                  sx={{
                    color: theme.palette.textPrimaryDark,
                    fontSize: "24px",
                  }}
                />
              </IconButton>
            </Box>
          )}
          {greaterThan590 && (
            <Search className="search-bar">
              <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
              <IconWrapper
                sx={{
                  position: "absolute",
                  padding: theme.spacing(0, 2),
                  pointerEvents: "all",
                  borderRadius: "0 40px 40px 0",
                  backgroundColor: "#222222",
                }}
              >
                <SearchIcon
                  sx={{
                    color: theme.palette.textPrimaryDark,
                    fontSize: "24px",
                  }}
                />
              </IconWrapper>
            </Search>
          )}
          {token ? (
            <NavbarLoggedIn
              theme={theme}
              openChannelModal={openChannelModal}
              handleChannelModal={handleChannelModal}
              navigate={navigate}
              logout={logout}
              openCreateModal={openCreateModal}
              handleCreateModal={handleCreateModal}
              token={token}
            />
          ) : (
            <NavbarLoggedOut greaterThan590={greaterThan590} theme={theme} navigate={navigate} />
          )}
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}
