import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
import { navItems6 } from "../NavItems";
import { StudioLayoutContext } from "../../../scenes/studio/StudioLayout";
import { useNavigate } from "react-router-dom";
import { StudioContext } from "../../../scenes/studio";

const HoverElementsModal = ({ open, setOpen, videoId, cloudinaryPublicId }) => {
  const { isSideBarOpen } = useContext(StudioLayoutContext);
  const { deleteVideo, userId, videoRefetch, shortsRefetch } = useContext(StudioContext);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/studio/video/edit/${videoId}`);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    let result;
    try {
      const formData = new FormData();
      formData.append("videoId", videoId);
      formData.append("userId", userId);
      formData.append("cloudinaryPublicId", cloudinaryPublicId);
      result = await deleteVideo(formData);

      videoRefetch();
      shortsRefetch();
    } catch (error) {}
  };

  const modalRef = useRef(null);

  const button = document.getElementById(`${videoId}-button`);
  const buttonRect = button ? button.getBoundingClientRect() : { top: 0, left: 0 };

  const modalStyle = {
    top: isSideBarOpen ? `${buttonRect.top - 228}px` : `${buttonRect.top - 228}px`,
    left: isSideBarOpen ? `${buttonRect.left - 260}px` : `${buttonRect.top - 50}px`,
  };

  const handleOutsideClick = (event) => {
    if (open && modalRef.current && !modalRef.current.contains(event.target)) {
      closeModal();
    }
  };

  const handleEscapeKey = (event) => {
    if (open && event.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscapeKey);
    };
    // eslint-disable-next-line
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <Box className="custom-modal-overlay" sx={{ zIndex: 1300 }}>
      <Box
        className="hover-elements-modal"
        ref={modalRef}
        sx={{
          position: "absolute",
          width: "227.5px",
          bgcolor: "#1f1f1f",
          borderRadius: "4px",
          zIndex: 1400,
          ...modalStyle,
        }}
      >
        <List className="menu-section">
          {navItems6.map(({ text, icon }) => {
            return (
              <ListItem
                key={text}
                sx={{
                  "& .MuiListItemButton-root:hover": {
                    backgroundColor: "#1f1f1f",
                  },
                  "& .MuiTypography-root": {
                    fontSize: "13px",
                  },
                  "& .MuiListItemButton-gutters.MuiListItemButton-root": {
                    paddingY: "3px",
                  },
                }}
                onClick={() => {
                  if (text === "Edit title and description") handleNavigate();
                  if (text === "Delete forever") handleDelete();
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
    </Box>
  );
};

export default HoverElementsModal;
