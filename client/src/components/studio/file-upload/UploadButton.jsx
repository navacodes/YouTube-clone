import { Box } from "@mui/material";
import React from "react";

const UploadButton = ({ selectedFile, setselectedFile }) => {
  const maxFileSizeInBytes = 1 * 1024 * 1024 * 1024; // 1 GB

  const handleFileUpload = (event) => {
    const selectedFileInput = event.target.files[0];
    if (selectedFileInput) {
      if (selectedFileInput.size > maxFileSizeInBytes) {
        alert("File size exceeds the allowed limit (1 GB). Please choose a smaller file.");
        event.target.value = null; // Clear the file input
        return;
      }
      setselectedFile({ file: selectedFileInput, name: selectedFileInput.name });
    }
  };

  return (
    <Box sx={{ marginTop: "26px", marginBottom: "auto" }}>
      <label htmlFor="fileInput" className="file-label">
        <span style={{ color: "black", fontWeight: "600" }}>UPLOAD VIDEOS</span>
      </label>
      <input
        type="file"
        id="fileInput"
        multiple
        accept="video/*"
        name="fileInput"
        onChange={handleFileUpload}
        style={{ display: "none", overflow: "hidden", position: "absolute", left: "0", top: "0", width: "0", height: "0" }}
      />
    </Box>
  );
};

export default UploadButton;
