import { createSlice } from "@reduxjs/toolkit";

const audioSlice = createSlice({
  name: "audio",
  initialState: {
    audio: null,
    isPlaying: false,
    currentSong: [],
  },
  reducers: {
    setAudio: (state, action) => {
      state.audio = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    setCurrentSong: (state, action) => {
      state.currentSong = action.payload;
    },
  },
});

export const { setAudio, setIsPlaying, setCurrentSong } = audioSlice.actions;
export default audioSlice.reducer;
