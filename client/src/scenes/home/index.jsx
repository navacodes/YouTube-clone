import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useGetVideosQuery } from "../../state/api";
import dummyVid from "../../img/dummyMedia/dummyVid.mp4";
import dumyVidPP from "../../img/dummyMedia/dumyVidPP.png";
import channelIcon from "../../img/mkbhd.jpg";

const VideoCard = ({ theme, data }) => {
  const style = {
    width: "100%",
    position: "relative",
    zIndex: 1100,
    borderRadius: "12px",
  };
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const progressBarRef = useRef(null);
  const controllRef = useRef(null);
  const [time, setTime] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  // let mousedown = false;

  const handleMouseEnter = () => {
    videoRef.current.play();
    videoRef.current.style.borderRadius = "0px";
    controllRef.current.classList.add("visible-visible");
    controllRef.current.classList.remove("visible-hidden");
    setTotalTime(Math.floor(videoRef.current.duration));
    // console.log(time + ":" + totalTime);
  };
  const handleMouseLeave = () => {
    videoRef.current.pause();
    videoRef.current.style.borderRadius = "12px";
    videoRef.current.removeAttribute("controls");
    controllRef.current.classList.add("visible-hidden");
    controllRef.current.classList.remove("visible-visible");
  };
  const togglePlay = () => {
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };
  const handleProgress = () => {
    const progressPercentage =
      (videoRef.current.currentTime / videoRef.current.duration) * 100;
    progressBarRef.current.style.width = `${progressPercentage}%`;

    setTime(Math.floor(videoRef.current.currentTime));

    // console.log(time + ":" + totalTime);
  };

  // const scrub = (e) => {
  //   const scrubTime =
  //     (e.offsetX / progressRef.current.offsetWidth) * videoRef.current.duration;
  //   videoRef.current.currentTime = scrubTime;
  // };

  return (
    <Box sx={{ width: "332px", height: "287px" }}>
      <Box sx={{ width: "100%", height: "100%" }} className="video-container">
        <video
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={togglePlay}
          onTimeUpdate={handleProgress}
          // onPlaying={() => {
          //   setTime(Math.floor(videoRef.current.currentTime));
          //   console.log(time + ":" + totalTime);
          // }}
          muted
          preload="metadata"
          ref={videoRef}
          style={style}
          src={dummyVid}
          className="video">
          <source src={dummyVid} type="video/mp4" />
        </video>
        <div
          className="controls visible-hidden"
          ref={controllRef}
          style={{
            marginTop: "-7px",
            zIndex: 1200,
            position: "relative",
          }}>
          <div
            className="progress"
            style={{ height: "2px", backgroundColor: "white" }}
            ref={progressRef}
            // onClick={scrub}
            // onMouseDown={() => (mousedown = true)}
            // onMouseMove={(e) => mousedown && scrub(e)}
            // onMouseUp={() => (mousedown = false)}
          >
            <div
              className="progress__filled"
              style={{ height: "100%", backgroundColor: "red" }}
              ref={progressBarRef}></div>
            <div
              className="vidTimeStamps"
              style={{
                color: "white",
                marginTop: "-27px",
                paddingBottom: "3px",
                paddingLeft: "8px",
                background:
                  "linear-gradient(180deg, rgba(251,251,251,0) 37%, rgba(94,94,94,0.8225884103641457) 100%)",
              }}>
              <Typography variant="h6">
                {" "}
                {Math.floor(time / 60)}:{time} / {Math.floor(totalTime / 60)}:
                {totalTime}
              </Typography>
            </div>
          </div>
        </div>
      </Box>
      <Box className="video-data">
        <Box className="channel-image">
          <img src={channelIcon} alt="" />
        </Box>
        <Box className="video-details">
          <Typography sx={{ color: theme.palette.textPrimaryDark }}>
            TITLE
          </Typography>
          <Box className="video-channel-detail"></Box>
        </Box>
      </Box>
    </Box>
  );
};

const Home = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetVideosQuery();
  console.log(data);

  return (
    <Box sx={{ position: "relative" }}>
      <Typography variant="h2" sx={{ color: theme.palette.textPrimaryDark }}>
        Hello everynian
      </Typography>
      <Box>
        {/* {isLoading ? (
          <Typography variant="h3">Loading...</Typography>
        ) : (
          data.videos.map(
            ({
              medialUrl,
              privateVid,
              title,
              videoType,
              views,
              createdAt,
              createdBy,
            }) => {
              return (
                <VideoCard
                  data={
                    (medialUrl,
                    privateVid,
                    title,
                    videoType,
                    views,
                    createdAt,
                    createdBy)
                  }
                />
              );
            }
          )
        )} */}
        {/* <VideoCard theme={theme} /> */}
      </Box>
    </Box>
  );
};

export default Home;
