import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  min: 60,
  sec: 0,
  running: false,
};

export const timerSlice = createSlice({
  name: "timer",
  initialState,

  reducers: {
    startTimer: state => {
      state.running = true;
    },
    stopTimer: state => {
      state.running = false;
    },
    resetTimer: (state, action) => {
      state.min = action.payload.min;
      state.sec = action.payload.sec;
    },
    decrementTimer: state => {
      if (state.sec > 0) {
        state.sec -= 1;
      } else if (state.min > 0) {
        state.min -= 1;
        state.sec = 59;
      } else {
        state.min = 0;
        state.sec = 0;
        state.running = false;
      }
    },
  },
});

export const { startTimer, stopTimer, resetTimer, decrementTimer } =
  timerSlice.actions;

export default timerSlice.reducer;
