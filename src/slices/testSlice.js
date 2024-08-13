import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // questionSubject: "",
  // questionNum: 1,

  // 모든 시험 문제 저장 배열
  questionAll: [],
  // omr 기록 배열
  selectNumArr: [],
  // 상태 변수 설정
  selectedValue: "",
  // 현재 화면에 출력되는 문제의 번호 - 1
  nowQuestionsNum: 0,
  // 남은 문제 수
  remainingQuestions: 20,
};

export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    updateTestDate: (state, actions) => {
      return { ...state, ...actions.payload };
    },
    nowQuestionsNumAdd: (state, actions) => {
      state.nowQuestionsNum++;
    },
    nowQuestionsNumSub: (state, actions) => {
      state.nowQuestionsNum--;
    },
  },
});

export const { updateTestDate, nowQuestionsNumAdd, nowQuestionsNumSub } =
  testSlice.actions;
// export const selectModal = state => state.test;

export default testSlice.reducer;
