import { createSlice } from "@reduxjs/toolkit";
// import jwt from "jsonwebtoken";
// import { promisify } from "util";

const initialState = {
  mode: "dark",
  token: null,
  videoId: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    setLogOut: (state) => {
      state.token = null;
    },
    setVideoId: (state, action) => {
      const { videoId } = action.payload;
      state.videoId = videoId;
    },
  },
});

export const { setMode, setCredentials, setLogOut, setVideoId } = globalSlice.actions;

export default globalSlice.reducer;

export const selectCurrentToken = (state) => state.globalSlice.token;
