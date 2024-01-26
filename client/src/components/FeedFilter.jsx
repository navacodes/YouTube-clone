/* eslint-disable array-callback-return */
import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import FlexBetween from "./FlexBetween.jsx";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "isSideBarOpen",
})(({ theme, isSideBarOpen }) => ({
  height: "56px",
  zIndex: theme.zIndex.drawer + 1,
  display: "block",
}));

export default function FeedFilter({ isSideBarOpen }) {
  const theme = useTheme();

  return (
    <AppBar
      position="fixed"
      isSideBarOpen={isSideBarOpen}
      sx={{
        zIndex: "1199",
        marginTop: "59px",
        position: "fixed",
        background: theme.palette.bgHomeDark,
        boxShadow: "none",
        display: "block",
        flex: 1,
        "& .MuiToolbar-root": {
          paddingLeft: "20px",
          ...(isSideBarOpen && {
            marginLeft: "240px",
            width: "calc(100% - 240px)",
          }),
          ...(!isSideBarOpen && {
            marginLeft: "73px",
            width: "calc(100% - 73px)",
          }),
        },
        "& .MuiToolbar-regular": {
          minHeight: "50px",
        },
      }}>
      <Toolbar
        sx={{
          width: "100%",
        }}>
        <FlexBetween className="space-between-navbar" sx={{ width: "100%" }}>
          <List
            sx={{
              paddingTop: "0px",
              display: "flex",
              overflowX: "scroll",
              "&::-webkit-scrollbar": {
                display: "none",
              },
            }}>
            {[
              "all",
              "mixes",
              "music",
              "anime",
              "apple",
              "coding",
              "computer hardware",
              "computer programming",
              "formula 1",
              "gadgets",
              "software developer",
              "supercar",
              "motorcycles",
              "iphone 15 pro",
              "recently uploaded",
              "watched",
              "new",
            ].map((text) => {
              return (
                <ListItem
                  key={text}
                  sx={{
                    borderRadius: "10px",
                    flex: 1,
                    "& .MuiListItemButton-root:hover": {
                      backgroundColor:
                        text === "all"
                          ? theme.palette.textPrimaryDark
                          : theme.palette.lightGrayHome,
                    },
                    "& .MuiTypography-root": {
                      fontSize: "14px",
                    },
                    "& .MuiButtonBase-root": {
                      width: "max-content",
                    },
                  }}
                  disablePadding>
                  <ListItemButton
                    sx={{
                      color:
                        text === "all"
                          ? "black"
                          : theme.palette.textPrimaryDark,
                      backgroundColor:
                        text === "all"
                          ? theme.palette.textPrimaryDark
                          : theme.palette.darkGrayHome,
                      borderRadius: "10px",
                      // padding: isSideBarOpen
                      //   ? "8px 12px"
                      //   : " 12px 10px 12px 16px",
                      verticalAlign: "middle",
                      padding: "0px 12px",
                      width: "100%",
                      margin: "12px 12px 12px 0",
                    }}>
                    <ListItemText
                      primary={text}
                      sx={{ textTransform: "capitalize" }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}
