import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setLogOut } from "./index.js";

// Define a service using a base URL and expected endpoints
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().global.token;

    if (token) headers.set("authorization", `Bearer ${token}`);

    return headers;
  },
});

export const myApi = createApi({
  reducerPath: "youtubeApi",
  baseQuery,
  tagTypes: ["User", "Subscription", "Videos"],
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (credentials) => ({
        url: `/api/v1/user/login`,
        method: "POST",
        body: { ...credentials },
      }),
      providesTags: ["User"],
    }),
    logoutUser: build.mutation({
      query: () => ({
        url: `/api/v1/user/logout`,
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setLogOut());
          dispatch(myApi.util.resetApiState());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    getSubsription: build.query({
      query: () => `/api/v1/view/channels`,
      method: "GET",
      providesTags: ["Subscription"],
    }),
    getVideos: build.query({
      query: ({ page = 1, pageSize = 8 }) => `/api/v1/view/videos?page=${page}&pageSize=${pageSize}`,
      staleTime: 0,
      method: "GET",
      providesTags: ["Videos"],
    }),
    getSlimVideos: build.query({
      query: ({ page = 1, pageSize = 8 }) => `/api/v1/view/shorts?page=${page}&pageSize=${pageSize}`,
      method: "GET",
      providesTags: ["Videos"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginUserMutation, useGetSubsriptionQuery, useLogoutUserMutation, useGetVideosQuery, useGetSlimVideosQuery } = myApi;
