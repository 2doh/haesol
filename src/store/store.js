import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "../slices/modalSlice";
import timerSlice from "../slices/timerSlice";
import testSlice from "../slices/testSlice";

export default configureStore({
  reducer: {
    modalSlice,
    timerSlice,
    testSlice,
  },
});
