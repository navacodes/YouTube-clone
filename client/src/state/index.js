import { createSlice } from "@reduxjs/toolkit";
// import jwt from "jsonwebtoken";
// import { promisify } from "util";

const initialState = {
  mode: "dark",
  token: null,
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
    setLogOut: (state, action) => {
      state.token = null;
    },
  },
});

export const { setMode, setCredentials, setLogOut } = globalSlice.actions;

export default globalSlice.reducer;

export const selectCurrentToken = (state) => state.globalSlice.token;
