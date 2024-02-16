import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useTheme } from "@emotion/react";
import { useGetMySlimVideosQuery, useGetMyVideosQuery } from "../../state/api";
import { useSelector } from "react-redux";
import { decodeToken } from "react-jwt";
import { Box, Typography } from "@mui/material";
import NoContent from "../../components/studio/NoContent";
import SelectContentNavbar from "../../components/studio/SelectContentNavbar";
import StudioVideoCardComponent from "../../components/studio/StudioVideoCardComponent";
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
  }, [vidLoading, videoData]);

  useEffect(() => {
    if (!shortVidLoading && shortVideoData.videos) {
      const newData = transformArray(shortVideoData.videos);
      setShortsRowsData((prev) => [...prev, ...newData]);
    }
  }, [shortVidLoading, shortVideoData]);

  // Create a list, in which when a list item is selected custom data grid is rendered depending upon
  // the list item state which will be initialized
  return (
    <div>
      <Box sx={{ paddingLeft: "32px", paddingTop: "23px", position: "sticky", left: "0", marginBottom: "15px" }}>
        <Typography variant="h3">Channel content</Typography>
      </Box>
      <SelectContentNavbar theme={theme} setSelected={setSelected} selected={selected} />
      {selected === "Videos" ? (
        <>
          {" "}
          <DataGrid
            rows={videoRowsData.length !== 0 ? videoRowsData : []}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 30 },
              },
            }}
            pageSizeOptions={[30, 50, 100]}
            checkboxSelection
            sx={{
              // paddingLeft: "32px",
              borderLeft: "none",
              borderRight: "none",
              "& .MuiDataGrid-virtualScroller": {
                height: videoRowsData.length === 0 ? "55px" : "auto",
                // paddingLeft:"32px"
              },
              "& .MuiDataGrid-virtualScrollerContent": {
                height: videoRowsData.length === 0 ? "auto" : "calc(100vh - 300px) !important",
              },
              "& .MuiDataGrid-cell": {
                maxHeight: "100% !important",
              },
              "& .MuiDataGrid-row": {
                maxHeight: "100% !important",
                padding: "8px 0px 8px 32px",
                margin: "10px 0",
                borderBottom: "1px solid #515151 !important",
              },
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: "1px solid #515151 !important",
                paddingLeft: "32px",
              },
              "& .MuiDataGrid-withBorderColor": {
                border: "none",
              },
            }}
          />
          {videoRowsData.length === 0 ? <NoContent /> : null}
        </>
      ) : null}
      {selected === "Shorts" ? (
        <>
          <DataGrid
            rows={shortsRowsData.length !== 0 ? shortsRowsData : []}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 30 },
              },
            }}
            pageSizeOptions={[30, 50, 100]}
            checkboxSelection
            sx={{
              // paddingLeft: "32px",
              borderLeft: "none",
              borderRight: "none",
              "& .MuiDataGrid-virtualScroller": {
                height: shortsRowsData.length === 0 ? "55px" : "auto",
                // paddingLeft:"32px"
              },
              "& .MuiDataGrid-virtualScrollerContent": {
                height: shortsRowsData.length === 0 ? "auto" : "calc(100vh - 300px) !important",
              },
              "& .MuiDataGrid-cell": {
                maxHeight: "100% !important",
              },
              "& .MuiDataGrid-row": {
                maxHeight: "100% !important",
                padding: "8px 0px 8px 32px",
                margin: "10px 0",
                borderBottom: "1px solid #515151 !important",
              },
              "& .MuiDataGrid-columnHeaders": {
                borderBottom: "1px solid #515151 !important",
                paddingLeft: "32px",
              },
              "& .MuiDataGrid-withBorderColor": {
                border: "none",
              },
            }}
          />
          {shortsRowsData.length === 0 ? <NoContent /> : null}
        </>
      ) : null}
    </div>
  );
};

export default Studio;
