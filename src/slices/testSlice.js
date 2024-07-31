import { createSlice } from "@reduxjs/toolkit";
import { removeCookie } from "utils/cookie";

const initialState = {
  questionSubject: "",
  questionNum: 1,
};

export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    updateTestDate: (state, actions) => {
      return { ...state, ...actions.payload };
    },
  },
});

export const { updateTestDate } = testSlice.actions;
// export const selectModal = state => state.test;

export default testSlice.reducer;
