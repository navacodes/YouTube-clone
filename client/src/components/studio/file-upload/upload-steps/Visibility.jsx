import React from "react";
import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import VideoBoxWithDetails from "../../VideoBoxWithDetails";

const Visibility = ({ handleRadioClick, videoUrl, filename }) => {
  const theme = useTheme();

  const videoPrivacyWeightStyle = {
    fontWeight: "700",
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Box>
        <Typography>Choose when to publish and who can see your video</Typography>
        <Box
          sx={{ padding: "4px 20px 16px", margin: "12px 0 14px 8px", border: "1px solid #fff", width: "534px", height: "284px", borderRadius: "4px" }}
        >
          <Typography variant="h5" sx={{ fontSize: "15px", margin: "15px 0 0" }}>
            Save or publish
          </Typography>
          <Typography variant="h6" sx={{ fontSize: "13px", color: theme.palette.studioLightGray }}>
            Make your video <span style={videoPrivacyWeightStyle}>public, </span> <span style={videoPrivacyWeightStyle}>unlisted, </span> or{" "}
            <span style={videoPrivacyWeightStyle}>private</span>
          </Typography>
          <FormControl sx={{ marginLeft: "30px" }}>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
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
              <Typography variant="h6" sx={{ fontSize: "13px", color: theme.palette.studioLightGray, marginLeft: "30px", marginTop: "-10px" }}>
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
        <Box
          sx={{
            width: "534px",
            height: "78px",
            border: `1px solid ${theme.palette.studioLightGray}`,
            margin: "16px 0 14px 8px",
            padding: "4px 20px 16px",
            display: "flex",
            borderRadius: "4px",
            alignItems: "center",
            justifyContent: "space-between",
            color: theme.palette.studioLightGray,
          }}
        >
          <Box>
            <Typography sx={{ fontSize: "15px", marginTop: "12px", color: "#fff" }} variant="h5">
              Schedule
            </Typography>
            <Typography sx={{ fontSize: "13px", color: theme.palette.studioLightGray, marginTop: "3px" }} variant="h6">
              Select a date to make your video public.
            </Typography>
          </Box>

          <KeyboardArrowDownOutlinedIcon />
        </Box>
        {/* Make the before you publish note */}
        <Box
          sx={{
            width: "536px",
            marginLeft: "8px",
            padding: "0 24px",
            backgroundColor: theme.palette.studioDarkGray,
          }}
        >
          <Typography variant="h5" sx={{ fontSize: "15px", paddingTop: "15px" }}>
            Before you publish, check the following
          </Typography>
          <Box>
            <Typography variant="h5" sx={{ fontSize: "13px", marginTop: "11px" }}>
              Do kids appear in the video?
            </Typography>
            <Typography variant="h6" sx={{ fontSize: "12px", color: theme.palette.studioLightGray, marginTop: "6px", width: "424px" }}>
              Make sure you follow our policies to protect minors from harm, exploitation, bullying, and violations of labor law.{" "}
              <span style={{ color: theme.palette.studioBlue }}>Learn more</span>
            </Typography>
          </Box>
          <Box>
            <Typography variant="h5" sx={{ fontSize: "13px", marginTop: "14px" }}>
              Looking for overall content guidance?
            </Typography>
            <Typography variant="h5" sx={{ fontSize: "12px", color: theme.palette.studioLightGray, padding: "6px 0 20px", width: "424px" }}>
              Our Community Guidelines can help you avoid trouble and ensure that YouTube remains a safe and vibrant community.{" "}
              <span style={{ color: theme.palette.studioBlue }}>Learn more</span>
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ paddingLeft: "24px" }}>
        <VideoBoxWithDetails videoUrl={videoUrl} filename={filename} />
      </Box>
    </Box>
  );
};

export default Visibility;
