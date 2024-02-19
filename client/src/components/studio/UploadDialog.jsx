import React, { useContext } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import { Button, Typography, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
// import { FeedBackIcon } from "../../svgs/Svgs";

import { StudioContext } from "../../scenes/studio/StudioLayout";
import { useTheme } from "@emotion/react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const UploadDialog = () => {
  const { uploadDialogOpen, setUploadDialogOpen } = useContext(StudioContext);
  const theme = useTheme();

  const handleClose = () => {
    setUploadDialogOpen(false);
  };
  return (
    <>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={uploadDialogOpen}
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
        <DialogTitle sx={{ m: 0, p: 2, fontSize: "20px" }} id="customized-dialog-title">
          Upload videos
        </DialogTitle>
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
        <DialogContent dividers sx={{ display: "flex", alignItems: "center", flexDirection: "column", justifyContent: "center" }}>
          <div
            style={{
              borderRadius: "50%",
              width: "136px",
              height: "136px",
              backgroundColor: theme.palette.studioDarkGray,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: theme.palette.studioLightGray,
              marginTop: "auto",
            }}
          >
            <UploadIcon sx={{ width: "3.5em", height: "4em" }} />
          </div>
          <Typography gutterBottom sx={{ marginTop: "23px" }}>
            Drag and drop files to upload
          </Typography>
          <Typography gutterBottom sx={{ color: theme.palette.studioLightGray }}>
            Your videos will be private until you publish them.
          </Typography>
          <Button
            variant="contained"
            sx={{
              color: "#0b0b0b",
              fontSize: "15px",
              fontWeight: "600",
              backgroundColor: "#3a99eb",
              marginTop: "26px",
              marginBottom: "auto",
              ":hover": {
                backgroundColor: "#3a99eb",
              },
            }}
          >
            SELECT FILES
          </Button>
          <Typography variant="h6" sx={{ fontSize: "12px", color: theme.palette.studioLightGray }}>
            By submitting your videos to YouTube, you acknowledge that you agree to YouTube's{" "}
            <span style={{ color: "#3ea6ff" }}>Terms of Service</span> and <span style={{ color: "#3ea6ff" }}>Community Guidelines</span>.
          </Typography>
          <Typography variant="h6" sx={{ fontSize: "12px", color: theme.palette.studioLightGray,marginBottom:"4px" }}>
            Please be sure not to violate others' copyright or privacy rights. <span style={{ color: "#3ea6ff" }}>Learn more</span>
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
};

export default UploadDialog;
