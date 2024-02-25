import { Box, Typography } from "@mui/material";
import React, { useRef } from "react";
import VideoBoxInUpload from "./VideoBoxInUpload";
import { HelpIcon } from "../../../../svgs/Svgs";
import { useTheme } from "@emotion/react";

import SelectButton from "../SelectButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const VideoDetails = ({ titleInput, setTitleInput, desInput, setDesInput, videoUrl, filename }) => {
  const theme = useTheme();

  const videoTitleBox = useRef(null);
  const videoTitleTitle = useRef(null);
  const videoTitleWordCount = useRef(null);

  const videoDesBox = useRef(null);
  const videoDesTitle = useRef(null);
  const videoDesWordCount = useRef(null);

  const handleInputChange = (e, num) => {
    const val = e.target.innerText;

    if (num === 100 && val.length <= 100) {
      setTitleInput(val);
      // console.log(val.length);
      // console.log(val);
      videoTitleBox.current.style.borderColor = "#606060";
      videoTitleTitle.current.style.color = theme.palette.studioLightGray;
      videoTitleWordCount.current.style.color = theme.palette.studioLightGray;
    }
    if (num === 100 && val.length > 100 && val.length < 500) {
      videoTitleBox.current.style.borderColor = "#FF4E45";
      videoTitleTitle.current.style.color = "#FF4E45";
      videoTitleWordCount.current.style.color = "#FF4E45";
    }

    if (num === 500 && val.length <= 500) {
      setDesInput(val);
      videoDesBox.current.style.borderColor = "#606060";
      videoDesTitle.current.style.color = theme.palette.studioLightGray;
      videoDesWordCount.current.style.color = theme.palette.studioLightGray;
    }
    if (num === 500 && val.length > 500 && val.length < 1000) {
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
            width: "536px",
            minHeight: "134px",
            maxHeight: "204px",
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
              {" "}
              <HelpIcon size="18" fill={theme.palette.studioLightGray} />
            </span>
          </label>
          <div
            onInput={(e) => handleInputChange(e, 100)}
            contentEditable="true"
            placeholder="You can type here"
            className="upload-form-input"
            data-placeholder="Enter video title"
          ></div>
          <span style={{ position: "absolute", bottom: "10px", right: "10px", color: theme.palette.studioLightGray }} ref={videoTitleWordCount}>
            {titleInput.length}/100
          </span>
        </Box>
        <Box
          ref={videoDesBox}
          sx={{
            width: "536px",
            minHeight: "165px",
            maxHeight: "960px",
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
          <div
            onInput={(e) => handleInputChange(e, 500)}
            contentEditable="true"
            placeholder="You can type here"
            className="upload-form-input"
            data-placeholder="Enter your text here"
          ></div>
          <span style={{ position: "absolute", bottom: "10px", right: "10px", color: theme.palette.studioLightGray }} ref={videoDesWordCount}>
            {desInput.length}/500
          </span>
        </Box>
        <Box sx={{ width: "536px", marginBottom: "24px" }}>
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
        <Box sx={{ width: "536px", marginBottom: "24px" }}>
          <Typography variant="h5" sx={{ fontSize: "15px", paddingBottom: "8px" }}>
            Playlists (No need to fill this, this is just to make this app look like original YT)
          </Typography>
          <Typography variant="h6" sx={{ fontSize: "13px", paddingBottom: "8px", color: theme.palette.studioLightGray }}>
            Add your video to one or more playlists to organize your content for viewers.{" "}
            <span style={{ color: theme.palette.studioBlue }}>Learn more</span>
          </Typography>

          <SelectButton />
        </Box>
      </Box>
      {/* Video */}
      <VideoBoxInUpload videoUrl={videoUrl} filename={filename} />
    </Box>
  );
};

export default VideoDetails;
