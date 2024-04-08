import React, { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";

import EditTexts from "../../../components/studio/edit/EditTexts";
import EditHeader from "../../../components/studio/edit/EditHeader";
import EditMiscellaneous from "../../../components/studio/edit/EditMiscellaneous";
import { useSelector } from "react-redux";
import { StudioLayoutContext } from "../StudioLayout";
import { useGetEditVideoQuery, useSaveEditedVideoMutation } from "../../../state/api";

const Edit = ({ userId }) => {
  const { editVideoData, setEditVideoData } = useContext(StudioLayoutContext);
  const videoId = useSelector((state) => state.global.videoId);
  const [editedVideoDetails, setEditedVideoDetails] = useState({
    title: editVideoData.title || "",
    description: editVideoData.description || "",
    visibility: editVideoData.visibility || "Private",
    mediaUrl: editVideoData.mediaUrl || "",
  });
  const { data, isLoading } = useGetEditVideoQuery({ userId, videoId });

  const [postEditedVideo] = useSaveEditedVideoMutation();

  const handleUndoChanges = () => {
    setEditedVideoDetails({
      title: editVideoData.title,
      description: editVideoData.description,
      visibility: editVideoData.visibility === true ? "Private" : "Public",
      mediaUrl: editVideoData.mediaUrl,
    });
  };

  const handleVideoEditSave = async () => {
    let result = null;
    try {
      const privateVid = editedVideoDetails.visibility === "Private" ? true : false;
      const formData = new FormData();
      formData.append("title", editedVideoDetails.title);
      formData.append("description", editedVideoDetails.description);
      formData.append("privateVid", privateVid);
      formData.append("userId", userId);
      formData.append("videoId", videoId);

      result = await postEditedVideo(formData);
      alert(result.data.message);
      setEditVideoData({
        title: editedVideoDetails.title,
        description: editedVideoDetails.description,
        visibility: editedVideoDetails.visibility === "Private" ? true : false,
        mediaUrl: editedVideoDetails.mediaUrl,
      });
      // console.log(result.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data && !isLoading) {
      console.log("data", data);
      setEditVideoData((prev) => {
        return {
          // ...prev,
          title: data?.videoData?.title,
          description: data?.videoData?.description,
          mediaUrl: data?.videoData?.mediaUrl,
          visibility: data?.videoData?.privateVid,
        };
      });

      setEditedVideoDetails((prev) => {
        return {
          // ...prev,
          title: data?.videoData?.title,
          description: data?.videoData?.description,
          visibility: data?.videoData?.privateVid === true ? "Private" : "Public",
          mediaUrl: data?.videoData?.mediaUrl,
        };
      });
    } // eslint-disable-next-line
  }, [data, isLoading]);

  return (
    <Box sx={{ paddingLeft: "24px", position: "relative" }}>
      <EditHeader handleVideoEditSave={handleVideoEditSave} handleUndoChanges={handleUndoChanges} />
      <Box sx={{ display: "flex" }}>
        <EditTexts editedVideoDetails={editedVideoDetails} setEditedVideoDetails={setEditedVideoDetails} />
        <EditMiscellaneous
          editedVideoDetails={editedVideoDetails}
          setEditedVideoDetails={setEditedVideoDetails}
          globalMediaUrl={editVideoData?.mediaUrl}
          globalTitle={editVideoData?.title}
        />
      </Box>
    </Box>
  );
};

export default Edit;
