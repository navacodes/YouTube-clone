import React from "react";
import { Box, Stepper, Step, StepLabel, Button, Typography } from "@mui/material";

const steps = ["Details", "Video elements", "Checks", "Visibility"];

const AfterUploadTimeline = ({ activeStep }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Typography sx={{ mt: 2, mb: 1 }}>{steps[activeStep]}</Typography>
      
    </Box>
  );
};

export default AfterUploadTimeline;
