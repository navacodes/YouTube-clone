import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { useGetMySlimVideosQuery, useGetMyVideosQuery } from "../../state/api";
import { useSelector } from "react-redux";
import { decodeToken } from "react-jwt";
import { Box, Typography } from "@mui/material";

import SelectContentNavbar from "../../components/studio/SelectContentNavbar";
import StudioVideoCardComponent from "../../components/studio/StudioVideoCardComponent";
import DataTable from "../../components/studio/DataTable";

import { transformArray } from "../../components/FormatFns";

const Studio = () => {
  const columns = [
    {
      field: "video",
      headerName: "Video",
      width: 502,
      renderCell: (params) => {
        const videoData = params.row.videoData;
        return <StudioVideoCardComponent videoData={videoData} />; // Pass necessary data to CustomComponent
      },
    },
    { field: "visibility", headerName: "Visibility", width: 130 },
    { field: "restrictions", headerName: "Restrictions", width: 130 },
    {
      field: "date",
      headerName: "Date",
      // type: "date",
      width: 90,
    },
    {
      field: "views",
      headerName: "Views",
      width: 160,
      type: "number",
    },
    { field: "comments", headerName: "Comments", width: 160 },
    { field: "likeVsDislike", headerName: "Likes (vs. dislikes)", width: 160 },
  ];
  const theme = useTheme();
  const [videoRowsData, setVideoRowsData] = useState([]);
  const [shortsRowsData, setShortsRowsData] = useState([]);
  const [selected, setSelected] = useState("Videos");
  const token = useSelector((state) => state.global.token);
  const decodedToken = !token ? null : decodeToken(token);

  const { data: videoData, isLoading: vidLoading } = useGetMyVideosQuery({ userId: decodedToken.id, page: 1, pageSize: 30 });
  const { data: shortVideoData, isLoading: shortVidLoading } = useGetMySlimVideosQuery({ userId: decodedToken.id, page: 1, pageSize: 30 });

  useEffect(() => {
    if (!vidLoading && videoData.videos) {
      const newData = transformArray(videoData.videos);
      setVideoRowsData((prev) => [...prev, ...newData]);
    }

    return () => {
      setVideoRowsData([]);
    };
  }, [vidLoading, videoData]);

  useEffect(() => {
    if (!shortVidLoading && shortVideoData.videos) {
      const newData = transformArray(shortVideoData.videos);
      setShortsRowsData((prev) => [...prev, ...newData]);
    }
    return () => {
      setShortsRowsData([]);
    };
  }, [shortVidLoading, shortVideoData]);

  // Create a list, in which, when a list-item is selected custom data-grid is rendered depending upon
  // the list-item-state
  return (
    <div>
      <Box sx={{ paddingLeft: "32px", paddingTop: "23px", position: "sticky", left: "0", marginBottom: "15px" }}>
        <Typography variant="h3">Channel content</Typography>
      </Box>
      <SelectContentNavbar theme={theme} setSelected={setSelected} selected={selected} />
      {selected === "Videos" ? <DataTable theme={theme} columns={columns} rowsData={videoRowsData} /> : null}
      {selected === "Shorts" ? <DataTable theme={theme} columns={columns} rowsData={shortsRowsData} /> : null}
    </div>
  );
};

export default Studio;
