import { createSlice } from "@reduxjs/toolkit";
import useLogout from "hooks/common/useLogout";
import { removeCookie } from "utils/cookie";

const initialState = {
  // 학급 시간표
  classScheduleIsOpen: false,
  classNoticeIsOpen: false,
};

export const openManagerSlice = createSlice({
  name: "openManager",
  initialState,
  reducers: {
    // openModal: (state, actions) => {
    //   state.modalType = actions.payload;
    //   state.isOpen = true;
    // },
    // closeModal: state => {
    //   state.isOpen = false;
    // },
    // logoutModal: state => {
    //   state.isOpen = false;

    //   window.location.replace("/");
    //   useLogout();
    // },
    updateDate: (state, actions) => {
      return { ...state, ...actions.payload };
    },
  },
});

export const { updateDate } = openManagerSlice.actions;

export default openManagerSlice.reducer;
