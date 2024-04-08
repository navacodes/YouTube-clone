import React, { createContext, useContext, useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { useGetMySlimVideosQuery, useGetMyVideosQuery, usePermanentDeleteMutation, useUploadVideoOnCloudinaryMutation } from "../../state/api";
import { useSelector } from "react-redux";
import { decodeToken } from "react-jwt";
import { Box, Typography } from "@mui/material";

import SelectContentNavbar from "../../components/studio/SelectContentNavbar";
import StudioVideoCardComponent from "../../components/studio/video-card/StudioVideoCardComponent";
import DataTable from "../../components/studio/DataTable";

import { transformArray } from "../../components/FormatFns";
import UploadDialog from "../../components/studio/file-upload/UploadDialog";
import AfterUploadDialog from "../../components/studio/file-upload/AfterUploadDialog";
import { StudioLayoutContext } from "./StudioLayout";
import Edit from "./edit";

export const StudioContext = createContext();
export let handleRefetch;
const Studio = () => {
  const { uploadDialogOpen, setUploadDialogOpen, editVideoPageInUse } = useContext(StudioLayoutContext);
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
      width: 100,
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
  // State below stores the uploaded video-file data and name.
  const [selectedFile, setselectedFile] = useState({ name: "", file: null });
  // State below manages opening and closing state of the After upload Dialog
  const [afterUploadDialogOpen, setAfterUploadDialogOpen] = useState(false);
  // State below manages the state of table: either Video table or Shorts Table
  const [selected, setSelected] = useState("Videos");
  // State below manages the steps of the timeline while filling form for uploading video
  const [timeline, setTimeline] = useState("Details");

  const [vidDuration, setVidDuration] = useState(0);

  const [videoCloudinaryData, setVideoCloudinaryData] = useState({ videoUrl: null, cloudinaryPublicId: null });

  const token = useSelector((state) => state.global.token);
  const decodedToken = !token ? null : decodeToken(token);

  const { data: videoData, isLoading: vidLoading, refetch: videoRefetch } = useGetMyVideosQuery({ userId: decodedToken.id, page: 1, pageSize: 30 });
  const {
    data: shortVideoData,
    isLoading: shortVidLoading,
    refetch: shortsRefetch,
  } = useGetMySlimVideosQuery({ userId: decodedToken.id, page: 1, pageSize: 30 });

  const [uploadVideo, { isLoading }] = useUploadVideoOnCloudinaryMutation();
  const [deleteVideo] = usePermanentDeleteMutation();

  const handleUpload = async () => {
    let result = null;
    try {
      const formData = new FormData();
      formData.append("video", selectedFile.file);

      // Use RTK Query to upload video
      result = await uploadVideo(formData);

      // Access the public URL from the result
      setVideoCloudinaryData({ cloudinaryPublicId: result.data.public_id, videoUrl: result.data.videoUrl });
      setVidDuration(result.data.vidDuration);
    } catch (error) {
      alert(`Error ${result?.error?.status}. Something bad happened.`);
      setAfterUploadDialogOpen(false);
      setselectedFile({ name: "", file: null });
      setVideoCloudinaryData({ videoUrl: null, cloudinaryPublicId: null });
    }
  };

  handleRefetch = function () {
    videoRefetch();
    shortsRefetch();
  };

  useEffect(() => {
    if (!vidLoading && videoData.videos) {
      const newData = transformArray(videoData.videos);
      // console.log(newData);
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

  useEffect(() => {
    if (uploadDialogOpen && selectedFile.name !== "" && !afterUploadDialogOpen) {
      setAfterUploadDialogOpen(true);
      setUploadDialogOpen(false);
    }
    // eslint-disable-next-line
  }, [afterUploadDialogOpen, uploadDialogOpen, selectedFile.name]);

  // Handling the upload of the video like Youtube
  useEffect(() => {
    if (selectedFile.file !== null && selectedFile.name !== "") handleUpload();

    // eslint-disable-next-line
  }, [selectedFile.file, selectedFile.name]);
  return (
    <StudioContext.Provider
      value={{
        deleteVideo: deleteVideo,
        userId: decodedToken.id,
      }}
    >
      <div className="studio-index">
        {editVideoPageInUse ? (
          <Edit userId={decodedToken.id} handleRefetch={handleRefetch} />
        ) : (
          <Box sx={{ height: "100%" }}>
            <Box sx={{ paddingLeft: "32px", paddingTop: "23px", position: "sticky", left: "0", marginBottom: "15px" }}>
              <Typography variant="h3">Channel content</Typography>
            </Box>
            <SelectContentNavbar theme={theme} setSelected={setSelected} selected={selected} />
            {selected === "Videos" ? <DataTable theme={theme} columns={columns} rowsData={videoRowsData} /> : null}
            {selected === "Shorts" ? <DataTable theme={theme} columns={columns} rowsData={shortsRowsData} /> : null}
          </Box>
        )}
        <UploadDialog selectedFile={selectedFile} setselectedFile={setselectedFile} />
        <AfterUploadDialog
          selectedFile={selectedFile}
          setselectedFile={setselectedFile}
          afterUploadDialogOpen={afterUploadDialogOpen}
          setAfterUploadDialogOpen={setAfterUploadDialogOpen}
          timeline={timeline}
          setTimeline={setTimeline}
          videoCloudinaryData={videoCloudinaryData}
          setVideoCloudinaryData={setVideoCloudinaryData}
          uploading={isLoading}
          vidDuration={vidDuration}
          videoRefetch={videoRefetch}
          shortsRefetch={shortsRefetch}
        />
      </div>
    </StudioContext.Provider>
  );
};

export default Studio;
