import React, { forwardRef, useContext, useRef, useState } from "react";
import { Box, FormControl, FormControlLabel, Modal, Radio, RadioGroup, Typography } from "@mui/material";
import { UnlistedVisibility, PublicVisibility, PrivateVisibility } from "../../../svgs/Svgs";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { StudioLayoutContext } from "../../../scenes/studio/StudioLayout";

const Select = forwardRef(({ theme, open, handleOpen, modalStyle, editedVideoDetails, setEditedVideoDetails }, ref) => {
  const style = {
    position: "absolute",
    bgcolor: "#1f1f1f",
    borderRadius: "4px",
    boxShadow: 24,
    width: "512px",
    padding: "20px 24px",
    ...modalStyle,
  };
  const handleRadioClick = (e) => {
    setEditedVideoDetails((prev) => {
      return {
        ...prev,
        visibility: e,
      };
    });
  };

  return (
    <Modal
      ref={ref}
      open={open}
      onClose={handleOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        "& .MuiBackdrop-root": {
          opacity: `${0} !important`,
        },
      }}
    >
      <Box sx={style} className="modal-container-select-visibility">
        <Box
          sx={{
            padding: "4px 20px 16px",
            border: "1px solid white",
            borderRadius: "4px",
          }}
        >
          <Typography variant="h5" sx={{ fontSize: "15px", margin: "15px 0 0" }}>
            Save or publish
          </Typography>
          <FormControl sx={{ marginLeft: "30px" }}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              value={editedVideoDetails.visibility || "Private"}
              name="radio-buttons-group"
              sx={{
                "& .MuiFormControlLabel-label.MuiTypography-root": { fontSize: "13px" },
                "& .MuiButtonBase-root.MuiRadio-root.Mui-checked": { color: "#fff" },
              }}
            >
              <FormControlLabel
                value="Private"
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 25,
                      },
                    }}
                  />
                }
                label="Private"
                onClick={() => handleRadioClick("Private")}
              />
              <Typography variant="h6" sx={{ fontSize: "13px", color: theme.palette.studioLightGray, marginLeft: "30px", marginTop: "-10px" }}>
                Only you and people you choose can watch your video
              </Typography>
              <FormControlLabel
                value="Unlisted"
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 25,
                      },
                    }}
                  />
                }
                onClick={() => handleRadioClick("Unlisted")}
                label="Unlisted"
              />
              <Typography
                variant="h6"
                sx={{
                  fontSize: "13px",
                  color: theme.palette.studioLightGray,
                  marginLeft: "30px",
                  marginTop: "-10px",
                }}
              >
                Anyone with the video link can watch your video
              </Typography>

              <FormControlLabel
                value="Public"
                control={
                  <Radio
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: 25,
                      },
                    }}
                  />
                }
                onClick={() => handleRadioClick("Public")}
                label="Public"
              />
              <Typography variant="h6" sx={{ fontSize: "13px", color: theme.palette.studioLightGray, marginLeft: "30px", marginTop: "-10px" }}>
                Everyone can watch your video
              </Typography>
            </RadioGroup>
          </FormControl>
        </Box>
      </Box>
    </Modal>
  );
});

const VisibilitySelect = ({ theme, editedVideoDetails, setEditedVideoDetails }) => {
  const { isSideBarOpen } = useContext(StudioLayoutContext);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const modalRef = useRef(null);

  const visibility_box = document.getElementById(`visibility-box`);
  const visibility_box_rect = visibility_box ? visibility_box.getBoundingClientRect() : { top: 0, left: 0 };

  const modalStyle = {
    top: isSideBarOpen ? `${visibility_box_rect.top}px` : `${visibility_box_rect.top}px`,
    left: isSideBarOpen ? `${visibility_box_rect.left}px` : `${visibility_box_rect.left}px`,
  };
  return (
    <Box>
      <Select
        ref={modalRef}
        theme={theme}
        open={open}
        handleOpen={handleOpen}
        modalStyle={modalStyle}
        editedVideoDetails={editedVideoDetails}
        setEditedVideoDetails={setEditedVideoDetails}
      />
      <Box
        id="visibility-box"
        onClick={handleOpen}
        sx={{
          width: "352px",
          height: "74px",
          borderWidth: "1px",
          borderStyle: "solid",
          borderColor: "#606060",
          borderRadius: "4px",
          display: "flex",
          justifyContent: "space-between",
          "&:hover": {
            borderColor: "#909090",
          },
          cursor: "pointer",
        }}
      >
        <Box sx={{ paddingLeft: "12px" }}>
          <Typography variant="h6" sx={{ fontSize: "12px", marginTop: "8px", marginBottom: "4px", color: "#aaa" }}>
            Visibility
          </Typography>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ marginRight: "4px" }}>
              {editedVideoDetails?.visibility === "Public" && <PublicVisibility fill="#aaa" size={20} />}
              {editedVideoDetails?.visibility === "Private" && <PrivateVisibility fill="#aaa" size={20} />}
              {editedVideoDetails?.visibility === "Unlisted" && <UnlistedVisibility fill="#aaa" size={20} />}
            </Box>
            <Typography variant="h6">{editedVideoDetails?.visibility}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "8px", marginRight: "4px" }}>
          <ArrowDropDownIcon sx={{ fontSize: "25px", color: "#aaa" }} />
        </Box>
      </Box>
    </Box>
  );
};

export default VisibilitySelect;
