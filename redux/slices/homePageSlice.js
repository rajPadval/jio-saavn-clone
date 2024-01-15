import { createSlice } from "@reduxjs/toolkit";

const homePageSlice = createSlice({
  name: "homePage",
  initialState: {
    albums: [],
    playlists: [],
    charts: [],
    trending: [],
  },
  reducers: {
    // setHomePageData: (state, action) => {
    //   state.albums = action.payload.albums;
    //   state.playlists = action.payload.playlists;
    //   state.charts = action.payload.charts;
    //   state.trending = action.payload.trending;
    // },

    setAlbums: (state, action) => {
      state.albums = action.payload;
    },
    setPlaylists: (state, action) => {
      state.playlists = action.payload;
    },
    setCharts: (state, action) => {
      state.charts = action.payload;
    },
    setTrending: (state, action) => {
      state.trending = action.payload;
    },
  },
});

export const { setAlbums, setPlaylists, setCharts, setTrending } =
  homePageSlice.actions;

export default homePageSlice.reducer;
