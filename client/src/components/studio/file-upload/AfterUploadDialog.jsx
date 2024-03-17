import React, { useContext, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from "@mui/material";
import AfterUploadTimeline from "./AfterUploadTimeline";
import { useTheme } from "@emotion/react";
import { usePublishVideoMutation } from "../../../state/api";

import VideoDetails from "./upload-steps/VideoDetails";
import VideoElements from "./upload-steps/VideoElements";
import Checks from "./upload-steps/Checks";
import Visibility from "./upload-steps/Visibility";
import { useSelector } from "react-redux";
import { decodeToken } from "react-jwt";

import CloseIcon from "@mui/icons-material/Close";
import { StudioContext } from "../../../scenes/studio";

const AfterUploadDialog = ({
  selectedFile,
  setselectedFile,
  afterUploadDialogOpen,
  setAfterUploadDialogOpen,
  timeline,
  setTimeline,
  videoCloudinaryData,
  setVideoCloudinaryData,
  uploading,
  vidDuration,
}) => {
  const theme = useTheme();
  const { shortsRefetch, videoRefetch } = useContext(StudioContext);
  const token = useSelector((state) => state.global.token);
  const decodedToken = !token ? null : decodeToken(token);

  const [activeStep, setActiveStep] = useState(0);
  // Following State mangages the title, description, videoType, visibility of the video uploaded
  const [titleInput, setTitleInput] = useState("");
  const [desInput, setDesInput] = useState("");
  // eslint-disable-next-line
  const [visibility, setVisibility] = useState("Private");

  const [publishVideo] = usePublishVideoMutation();

  const handleRadioClick = (vis = "Private") => {
    setVisibility(vis);
  };

  const handleClose = () => {
    setDesInput("");
    setTitleInput("");
    setVisibility("Private");
    setVideoCloudinaryData({ videoUrl: null, cloudinaryPublicId: null });
    setselectedFile({ name: "", file: null });
    shortsRefetch();
    videoRefetch();
    setActiveStep(0);
    setAfterUploadDialogOpen(false);
  };

  const handleNext = () => {
    if (activeStep < 3) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleVideoPublish = async () => {
    let result = null;
    try {
      const privateVid = visibility === "Private" ? true : false;
      const videoType = vidDuration > 60 ? "video" : "short";
      const formData = new FormData();
      formData.append("title", titleInput);
      formData.append("description", desInput);
      formData.append("mediaUrl", videoCloudinaryData.videoUrl);
      formData.append("privateVid", privateVid);
      formData.append("videoType", videoType);
      formData.append("createdBy", decodedToken.id);
      formData.append("cloudinaryPublicId", videoCloudinaryData.cloudinaryPublicId);

      result = await publishVideo(formData);
      console.log(result);
      handleClose();
      if (result?.error?.status === "error") alert("Could not upload your video.");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDisable = () => {
    if (activeStep === 3) return !(titleInput !== "" && desInput !== "");
    return false;
  };

  return (
    <>
      <Dialog
        open={afterUploadDialogOpen}
        onClose={(event, reason) => reason !== "backdropClick" && reason !== "escapeKeyDown" && handleClose(event)}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        sx={{
          "& .MuiDialog-paper.MuiPaper-root": {
            backgroundColor: theme.palette.studioMediumGray,
            backgroundImage: "none",
            height: "calc(100% - 96px)",
            width: "960px",
            minWidth: "960px",
            minHeight: "492px",
          },
        }}
      >
        <DialogTitle id="scroll-dialog-title">{selectedFile.name === "" ? "Uploading..." : selectedFile.name.split(".")[0]}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{ paddingX: "48px" }}>
          {/* Timeline  */}
          <AfterUploadTimeline timeline={timeline} setTimeline={setTimeline} activeStep={activeStep} />
          {/* Forms */}
          {activeStep === 0 && (
            <VideoDetails
              titleInput={titleInput}
              setTitleInput={setTitleInput}
              desInput={desInput}
              setDesInput={setDesInput}
              videoUrl={videoCloudinaryData.videoUrl}
              filename={selectedFile.name}
            />
          )}
          {activeStep === 1 && <VideoElements />}
          {activeStep === 2 && <Checks />}
          {activeStep === 3 && (
            <Visibility handleRadioClick={handleRadioClick} videoUrl={videoCloudinaryData.videoUrl} filename={selectedFile.name} />
          )}
        </DialogContent>
        <DialogActions>
          <Box sx={{ flex: "1 1 auto", marginLeft: "6px" }}>{uploading ? "Processing..." : "Video Processed !"}</Box>
          {activeStep >= 1 && (
            <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}

          <Button
            sx={{ backgroundColor: "#3ea6ff", color: "black", ":hover": { backgroundColor: "#3ea6ff" } }}
            onClick={() => {
              if (activeStep !== 3) handleNext();
              if (activeStep === 3) handleVideoPublish();
            }}
            disabled={handleDisable()}
          >
            {activeStep === 3 ? "Save" : "Next"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AfterUploadDialog;
