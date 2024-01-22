import { configureStore } from "@reduxjs/toolkit";
import homePageSlice from "./slices/homePageSlice";
import audioSlice from "./slices/audioSlice";
const store = configureStore({
  reducer: {
    homePageSlice: homePageSlice,
    audio: audioSlice,

  },
});

export default store;
