/* eslint-disable array-callback-return */
import React, { useState } from "react";
import { useJwt, decodeToken } from "react-jwt";
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
  Button,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import FlexBetween from "../FlexBetween.jsx";

import SearchIcon from "@mui/icons-material/Search";
import YoutubeStudioLightIcon from "../../svgs/yt_studio.svg";
import { CreateIcon, HelpIcon } from "../../svgs/Svgs.jsx";
import BlankProfile from "../../img/blankProfile.jpg";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSelector } from "react-redux";
import { navItems1, navItems2, navItems3 } from "../studio/NavItems.js";
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
  borderRadius: 4,
  backgroundColor: theme.palette.studioMediumGray,
  border: `1px solid #606060`,
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
  width: "100%",
  paddingLeft: "56px",
  paddingRight: "56px",
  paddingBottom: "2px",
  color: "#717171",
  fontWeight: "600",
  fontSize: "15px",
  "& .MuiInputBase-input:active,& .MuiInputBase-input:focus": {
    color: "white",
  },
}));

const ChannelModal = ({ open, handleModal, theme, navigate, logout, token }) => {
  const { decodedToken } = useJwt(token);
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
            height: "auto",
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
            <Typography variant="h5">{decodedToken?.name}</Typography>
            <Typography variant="h5">@{decodedToken?.channelName.toLowerCase()}</Typography>
          </Box>
        </Box>
        <Divider />
        <Box className="modal-menu" sx={{ width: "300px" }}>
          <List className="menu-section">
            {navItems1.map(({ text, icon }) => {
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
                      backgroundColor: theme.palette.studioMediumGray,
                      verticalAlign: "middle",
                    }}
                    onClick={() => {
                      if (lctxt === "sign out" || lctxt === "youtube") {
                        if (lctxt === "sign out") handleLogout();
                        navigate("/");
                      }
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
                    {text.includes("Switch") ? <ChevronRightIcon /> : ""}
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <Divider />
          <List className="menu-section">
            {navItems2.map(({ text, icon }) => {
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
                      backgroundColor: theme.palette.studioMediumGray,
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
                    {text.includes("theme") ? <ChevronRightIcon /> : ""}
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

const CreateModal = ({ open, handleModal, theme }) => {
  const style = {
    position: "absolute",
    top: "5.5%",
    right: "3.78%",
    width: "184px",
    bgcolor: "#1f1f1f",
    borderRadius: "4px",
    boxShadow: 24,
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
        <List className="menu-section">
          {navItems3.map(({ text, icon }) => {
            return (
              <ListItem
                key={text}
                sx={{
                  // padding:"0 24px",
                  "& .MuiListItemButton-root:hover": {
                    backgroundColor: "#1f1f1f",
                  },
                  "& .MuiTypography-root": {
                    fontSize: "15px",
                  },
                }}
                disablePadding
              >
                <ListItemButton
                  sx={{
                    backgroundColor: "#1f1f1f1",
                    verticalAlign: "middle",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "white",
                      minWidth: "0px",
                      margin: "4px 16px 4px 0",
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
      </Box>
    </Modal>
  );
};

const RightComponent = ({
  theme,
  openChannelModal,
  handleChannelModal,
  navigate,
  handleCreateModal,
  openCreateModal,
  token,
  decodedToken,
  logout,
}) => {
  return (
    <>
      <Divider orientation="vertical" variant="middle" flexItem sx={{ marginLeft: "18px", height: "38px" }} />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <IconWrapper
          sx={{
            borderRadius: "50%",
            padding: "8px",
            " :hover": {
              backgroundColor: theme.palette.darkGrayHome,
            },
          }}
        >
          <HelpIcon fill={theme.palette.studioGray} />
        </IconWrapper>
        <Button
          variant="outlined"
          onClick={handleCreateModal}
          sx={{
            border: `1px solid ${theme.palette.studioBorder}`,
            margin: "0 8px",
            padding: "0 16px 0 10px",
            " :hover": {
              backgroundColor: "transparent",
              border: `1px solid ${theme.palette.studioBorder}`,
            },
          }}
        >
          <CreateIcon stroke={theme.palette.studioRed} />
          <Typography variant="h6" sx={{ padding: "8px 0 8px 6px" }}>
            CREATE
          </Typography>
        </Button>
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
            src={decodedToken.profileImg}
            alt={BlankProfile}
            style={{
              height: "32px",
              borderRadius: "50%",
            }}
          />
        </IconWrapper>
        <ChannelModal open={openChannelModal} handleModal={handleChannelModal} theme={theme} navigate={navigate} logout={logout} token={token} />
        <CreateModal open={openCreateModal} handleModal={handleCreateModal} theme={theme} />
      </Box>
    </>
  );
};

// const NavbarLoggedOut = ({ theme, navigate, greaterThan590 }) => {
//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         minWidth: greaterThan590 ? "225px" : "0px",
//         justifyContent: "flex-end",
//       }}
//     >
//       <IconButton sx={{ marginRight: "8px" }}>
//         <MoreVertIcon
//           sx={{
//
//             fontSize: "24px",
//           }}
//         />
//       </IconButton>
//       <Box
//         sx={{
//           display: "inline-flex",
//           alignItems: "center",
//           border: "1px solid #ffffff33",
//           padding: "5px 15px",
//           borderRadius: "40px",
//           cursor: "pointer",
//           pointerEvents: "all",
//           ":hover": {
//             backgroundColor: "#263850",
//           },
//         }}
//         onClick={() => navigate("/login")}
//       >
//         <img src={EmptyProfile} alt="empty-profile" style={{ marginRight: "6px", marginLeft: "-6px" }} />
//         <Typography variant="h6" sx={{ color: "#3ea6ff" }}>
//           Sign in
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

export default function NavbarStudio({ isSideBarOpen, setIsSideBarOpen }) {
  const theme = useTheme();
  const navigate = useNavigate();
  const token = useSelector((state) => state.global.token);
  const decodedToken = !token ? null : decodeToken(token);
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

  return !token ? (
    <div>Login First...</div>
  ) : (
    <AppBar
      position="fixed"
      isSideBarOpen={isSideBarOpen}
      sx={{
        position: "fixed",
        background: theme.palette.studioMediumGray,
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
          boxShadow: "0 1px 4px 1px rgba(0,0,0,0.2)",
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
                marginRight: "16px",
              }}
            >
              <MenuIcon sx={{ fontSize: "28px" }} />
            </IconButton>
            {/* change the yt icon to dynamic icon */}
            <Box sx={{ marginRight: "96px", paddingTop: "8px", cursor: "pointer", pointerEvents: "all" }}>
              <img onClick={() => navigate(`/studio/${decodedToken.id}`)} src={YoutubeStudioLightIcon} alt="" />
            </Box>
          </Box>
          {greaterThan590 && (
            <Search className="search-bar">
              <IconWrapper
                sx={{
                  position: "absolute",
                  left: "0px",
                  padding: theme.spacing(0, 2),
                  pointerEvents: "all",
                  borderColor: theme.palette.studioBorder,
                  borderRadius: "4px",
                  backgroundColor: theme.palette.studioMediumGray,
                }}
              >
                <SearchIcon
                  sx={{
                    color: "#606060",
                    fontSize: "24px",
                  }}
                />
              </IconWrapper>
              <StyledInputBase placeholder="Search…" inputProps={{ "aria-label": "search" }} />
            </Search>
          )}

          <RightComponent
            theme={theme}
            openChannelModal={openChannelModal}
            handleChannelModal={handleChannelModal}
            navigate={navigate}
            handleCreateModal={handleCreateModal}
            openCreateModal={openCreateModal}
            token={token}
            decodedToken={decodedToken}
            logout={logout}
          />
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}
