import { createSlice } from "@reduxjs/toolkit";

const audioSlice = createSlice({
    name : "audio",
    initialState : {
        audio: null,
        isPlaying: false,
    },
    reducers : {
        setAudio : (state, action) => {
            state.audio = action.payload;
        },
        setIsPlaying : (state, action) => {
            state.isPlaying = action.payload;
        }
    }
})

export const { setAudio, setIsPlaying } = audioSlice.actions;
export default audioSlice.reducer;