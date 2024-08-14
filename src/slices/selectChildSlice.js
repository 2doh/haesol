import { createSlice } from "@reduxjs/toolkit";
import { setCookie } from "utils/cookie";

const initialState = {
  // 자녀의 정보 배열
  selectChildInfoList: [],
  // 자녀의 정보 배열
  selectChildInfo: [],
  // 자녀의 PK
  selectChildPk: 0,
  // 자녀의 Index(메뉴 선택)
  selectChildIndex: 0,
  // 현재 선택된 메뉴의 높이
  nowTopPosition: 4,

  // 이전 선택 자녀의 Index
  prevChildNum: 0,
  // 이전 선택된 메뉴의 높이
  prevTopPosition: 4,
};
/** 현재 선택된 자녀 정보 관리 */
export const selectChildSlice = createSlice({
  name: "selectChild",
  initialState,
  reducers: {
    updateSelectChildInfo: (state, actions) => {
      setCookie("studentPk", actions.payload.selectChildPk);
      return { ...state, ...actions.payload };
    },
  },
});

export const { updateSelectChildInfo } = selectChildSlice.actions;
// export const selectModal = state => state.modal;

export default selectChildSlice.reducer;
