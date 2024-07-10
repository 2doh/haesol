import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "../slices/modalSlice";

export default configureStore({
  reducer: {
    modalSlice,
  },
});
