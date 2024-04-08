import React, { useRef } from "react";
import { useTheme } from "@emotion/react";
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { HelpIcon } from "../../../svgs/Svgs";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SelectButton from "../file-upload/SelectButton";

const EditTexts = ({ editedVideoDetails, setEditedVideoDetails }) => {
  const theme = useTheme();

  const videoTitleBox = useRef(null);
  const videoTitleTitle = useRef(null);
  const videoTitleWordCount = useRef(null);

  const videoDesBox = useRef(null);
  const videoDesTitle = useRef(null);
  const videoDesWordCount = useRef(null);

  const handleInputChange = (e, num) => {
    const val = e.target.value;

    if (num === 100) {
      setEditedVideoDetails((prev) => {
        return {
          ...prev,
          title: val,
        };
      });
      videoTitleBox.current.style.borderColor = "#606060";
      videoTitleTitle.current.style.color = theme.palette.studioLightGray;
      videoTitleWordCount.current.style.color = theme.palette.studioLightGray;
    }
    if (num === 100 && val.length > 100 && val.length < 1000) {
      videoTitleBox.current.style.borderColor = "#FF4E45";
      videoTitleTitle.current.style.color = "#FF4E45";
      videoTitleWordCount.current.style.color = "#FF4E45";
    }

    if (num === 1000) {
      setEditedVideoDetails((prev) => {
        return {
          ...prev,
          description: val,
        };
      });
      videoDesBox.current.style.borderColor = "#606060";
      videoDesTitle.current.style.color = theme.palette.studioLightGray;
      videoDesWordCount.current.style.color = theme.palette.studioLightGray;
    }
    if (num === 1000 && val.length > 1000 && val.length < 5000) {
      videoDesBox.current.style.borderColor = "#FF4E45";
      videoDesTitle.current.style.color = "#FF4E45";
      videoDesWordCount.current.style.color = "#FF4E45";
    }
  };

  return (
    <Box className="VideoDetails" sx={{ display: "flex" }}>
      {/* FORM */}
      <Box>
        <Box
          ref={videoTitleBox}
          sx={{
            width: "696px",
            minHeight: "81px",
            maxHeight: "136px",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            textAlign: "left",
            padding: "0 12px 11px",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#606060",
            borderRadius: "4px",
            position: "relative",
            marginBottom: "24px",
            ":hover": {
              borderColor: "#909090",
            },
            ":focus,:active,:focus-within": {
              borderColor: "#3ea6ff",
            },
          }}
        >
          <label
            htmlFor="video-title"
            ref={videoTitleTitle}
            style={{
              fontSize: "12px",
              margin: "8px 0 3px",
              display: "flex",
              alignItems: "center",
              color: theme.palette.studioLightGray,
            }}
          >
            Title (required)
            <span style={{ margin: "auto 0px auto 8px" }}>
              <HelpIcon size="15" fill={theme.palette.studioLightGray} />
            </span>
          </label>
          <textarea
            id="video-title"
            onChange={(e) => handleInputChange(e, 100)}
            className="edit-form-input"
            data-placeholder="Enter video title"
            suppressContentEditableWarning={true}
            style={{ flex: "100%", resize: "none" }}
            value={editedVideoDetails.title || ""}
          >
            {/* {editedVideoDetails.title} */}
          </textarea>
          <span style={{ position: "absolute", bottom: "10px", right: "10px", color: theme.palette.studioLightGray }} ref={videoTitleWordCount}>
            {editedVideoDetails.title.length}/100
          </span>
        </Box>
        <Box
          ref={videoDesBox}
          sx={{
            width: "696px",
            minHeight: "225px",
            maxHeight: "1017px",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
            textAlign: "left",
            padding: "0 12px 11px",
            borderWidth: "1px",
            borderStyle: "solid",
            borderColor: "#606060",
            borderRadius: "4px",
            position: "relative",
            marginBottom: "24px",
            overflowY: "auto",
            ":hover": {
              borderColor: "#909090",
            },
            ":focus,:active,:focus-within": {
              borderColor: "#3ea6ff",
            },
          }}
        >
          <label
            htmlFor="video-description"
            ref={videoDesTitle}
            style={{
              fontSize: "12px",
              margin: "8px 0 3px",
              display: "flex",
              alignItems: "center",
              color: theme.palette.studioLightGray,
            }}
          >
            Description
          </label>
          <textarea
            id="video-description"
            onChange={(e) => handleInputChange(e, 1000)}
            className="edit-form-input"
            data-placeholder="Enter your text here"
            suppressContentEditableWarning={true}
            style={{ flex: "100%", resize: "none",fontFamily:"Roboto" }}
            value={editedVideoDetails.description || ""}
          >
            {/* {editedVideoDetails.description} */}
          </textarea>
          <span style={{ position: "absolute", bottom: "10px", right: "10px", color: theme.palette.studioLightGray }} ref={videoDesWordCount}>
            {editedVideoDetails.description.length}/1000
          </span>
        </Box>
        <Box sx={{ width: "696px", marginBottom: "24px" }}>
          <Typography variant="h5" sx={{ fontSize: "15px", paddingBottom: "8px" }}>
            Thumbnails
          </Typography>

          <Box
            sx={{
              width: "100%",
              height: "44px",
              display: "flex",
              alignItems: "center",
              color: theme.palette.studioLightGray,
              padding: "12px",
              margin: "8px 0",
              background: theme.palette.studioDarkGray,
              borderRadius: "4px",
            }}
          >
            {" "}
            <InfoOutlinedIcon /> <span style={{ marginLeft: "8px" }}>For now, you can’t change the thumbnail on your Short</span>{" "}
          </Box>
        </Box>
        <Box sx={{ width: "696px", marginBottom: "24px" }}>
          <Typography variant="h5" sx={{ fontSize: "15px", paddingBottom: "8px" }}>
            Playlists (No need to fill this, this is just to make this app look like original YT)
          </Typography>
          <Typography variant="h6" sx={{ fontSize: "13px", paddingBottom: "8px", color: theme.palette.studioLightGray }}>
            Add your video to one or more playlists to organize your content for viewers.{" "}
            <span style={{ color: theme.palette.studioBlue }}>Learn more</span>
          </Typography>

          <SelectButton />
        </Box>
        <Box sx={{ width: "696px", marginBottom: "24px" }}>
          <Typography variant="h5" sx={{ fontSize: "15px", paddingBottom: "8px" }}>
            Audience
          </Typography>
          <Typography variant="h5" sx={{ fontSize: "13px", paddingBottom: "8px" }}>
            This video is not made for kids.{" "}
            <span style={{ fontSize: "12px", backgroundColor: "#ffffff1a", padding: "0 4px", color: "#aaa" }}>Set by you</span>
          </Typography>
          <Typography variant="h6" sx={{ fontSize: "13px", paddingBottom: "8px", color: theme.palette.studioLightGray }}>
            Regardless of your location, you're legally required to comply with the Children's Online Privacy Protection Act (COPPA) and/or other
            laws. You're required to tell us whether your videos are made for kids.{" "}
            <span style={{ color: theme.palette.studioBlue }}>What's content made for kids?</span>
          </Typography>

          <Box
            sx={{
              width: "100%",
              height: "auto",
              display: "flex",
              alignItems: "center",
              color: theme.palette.studioLightGray,
              padding: "12px",
              margin: "8px 0",
              background: theme.palette.studioDarkGray,
              borderRadius: "4px",
              fontSize: "12px",
            }}
          >
            {" "}
            <InfoOutlinedIcon />{" "}
            <span style={{ marginLeft: "8px" }}>
              Features like personalized ads and notifications won’t be available on videos made for kids. Videos that are set as made for kids by you
              are more likely to be recommended alongside other kids’ videos.<span style={{ color: theme.palette.studioBlue }}> Learn more</span>
            </span>{" "}
          </Box>
          <Box
            sx={{
              width: "534px",
              height: "284px",
            }}
          >
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="No, it's not made for kids"
                name="radio-buttons-group"
                sx={{
                  "& .MuiFormControlLabel-label.MuiTypography-root": { fontSize: "15px" },
                  "& .MuiButtonBase-root.MuiRadio-root.Mui-checked": { color: "#fff" },
                }}
              >
                <FormControlLabel
                  value="Yes, it's made for kids"
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 25,
                        },
                      }}
                    />
                  }
                  label="Yes, it's made for kids."
                  // onClick={() => handleRadioClick("Private")}
                />
                <FormControlLabel
                  value="No, it's not made for kids"
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 25,
                        },
                      }}
                    />
                  }
                  // onClick={() => handleRadioClick("Unlisted")}
                  label="No, it's not made for kids"
                />
              </RadioGroup>
            </FormControl>

            <Typography variant="h5" sx={{ fontSize: "13px", paddingBottom: "8px", marginTop: "10px" }}>
              Do you want to restrict your video to an adult audience?
            </Typography>
            <Typography variant="h6" sx={{ fontSize: "13px", paddingBottom: "8px", color: theme.palette.studioLightGray }}>
              Age-restricted videos are not shown in certain areas of YouTube. These videos may have limited or no ads monetization.
              <span style={{ color: theme.palette.studioBlue }}> Learn more</span>
            </Typography>

            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="No, don't restrict my video to viewers over 18 only"
                name="radio-buttons-group"
                sx={{
                  "& .MuiFormControlLabel-label.MuiTypography-root": { fontSize: "15px" },
                  "& .MuiButtonBase-root.MuiRadio-root.Mui-checked": { color: "#fff" },
                }}
              >
                <FormControlLabel
                  value="Yes, restrict my video to viewers over 18"
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 25,
                        },
                      }}
                    />
                  }
                  label="Yes, restrict my video to viewers over 18"
                  // onClick={() => handleRadioClick("Private")}
                />
                <FormControlLabel
                  value="No, don't restrict my video to viewers over 18 only"
                  control={
                    <Radio
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 25,
                        },
                      }}
                    />
                  }
                  // onClick={() => handleRadioClick("Unlisted")}
                  label="No, don't restrict my video to viewers over 18 only"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EditTexts;
