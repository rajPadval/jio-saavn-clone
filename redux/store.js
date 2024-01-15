import { configureStore } from "@reduxjs/toolkit";
import homePageSlice from "./slices/homePageSlice";
const store = configureStore({
  reducer: {
    homePageSlice: homePageSlice,
  },
});

export default store;
