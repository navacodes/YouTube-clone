import React, { useEffect, useRef, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Box } from "@mui/material";
import AfterUploadTimeline from "./AfterUploadTimeline";
import { useTheme } from "@emotion/react";
import VideoDetailsForm from "./VideoDetailsForm";

const AfterUploadDialog = ({ selectedFile, afterUploadDialogOpen, setAfterUploadDialogOpen, timeline, setTimeline }) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const handleClose = () => {
    setAfterUploadDialogOpen(false);
  };

  const handleNext = () => {
    if (activeStep < 3) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (afterUploadDialogOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [afterUploadDialogOpen]);

  return (
    <>
      <Dialog
        open={afterUploadDialogOpen}
        onClose={handleClose}
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
        <DialogTitle id="scroll-dialog-title">{selectedFile.name === "" ? "Uploading..." : selectedFile.name}</DialogTitle>
        <DialogContent dividers>
          {/* Timeline  */}
          <AfterUploadTimeline timeline={timeline} setTimeline={setTimeline} activeStep={activeStep} />
          {/* Forms */}
          <VideoDetailsForm />
        </DialogContent>
        <DialogActions>
          {activeStep >= 1 && (
            <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          {/* <Box sx={{ flex: "1 1 auto" }} /> */}

          <Button onClick={handleNext}>{activeStep === 3 ? "Finish" : "Next"}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AfterUploadDialog;
