import React from "react";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const SelectContentNavbar = ({ theme, setSelected, selected }) => {
  return (
    <div>
      <List
        sx={{
          paddingTop: "0px",
          paddingBottom: "10px",
          paddingLeft: "16px",
          ".MuiListItem-root": {
            width: "auto",
          },
          width: "auto",
          display: "flex",
          overflow: "auto",
        }}
      >
        {["Videos", "Shorts", "Live", "Posts", "Playlists", "Podcasts", "Promotions"].map((text, idx) => {
          const beforeStyle = {
            "& ::before": {
              content: `" "`,
              width: "100%",
              height: "4px",
              backgroundColor: "#3ea6ff",
              position: "absolute",
              left: "0px",
              bottom: "0px",
              zIndex: 2,
              borderRadius: "3px 3px 0 0",
            },
          };

          return (
            <ListItem
              key={`${idx}-${text}`}
              sx={
                ({
                  position: "relative",
                  backgroundColor: "#fff",
                  "& .MuiListItemButton-root:hover": {
                    backgroundColor: theme.palette.studioDarkGray,
                  },
                },
                text === selected ? { ...beforeStyle } : {})
              }
              disablePadding
            >
              <ListItemButton
                onClick={() => {
                  setSelected(text);
                }}
                sx={{
                  marginLeft: "8px",
                  marginRight: "32px",
                  padding: "0 5px 10px 5px",
                  color: text === selected ? "#3ea6ff" : "#fff",
                  verticalAlign: "middle",
                }}
              >
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default SelectContentNavbar;
