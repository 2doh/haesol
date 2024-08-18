import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

// const defaultTitle = moment().format("YYYY년 MM월 DD일  HH시mm분");

const initialState = {
  // questionSubject: "",
  // questionNum: 1,

  // 문제 타입
  // 1 : 국어
  // 2 : 수학
  subjectCode: 0,
  // 과목명
  subjectName: "",
  // 문제 타이틀
  testTitle: moment().format("YYYY년 MM월 DD일  HH시mm분"),
  // 모든 시험 문제 저장 배열
  questionAll: [],
  // omr 기록 배열
  selectNumArr: [],
  // 문제의 pk 기록 배열(문제 저장시 자동으로 저장 - 고정)
  questionAllPk: [],
  // 상태 변수 설정
  selectedValue: "",
  // 현재 화면에 출력되는 문제의 번호 - 1
  nowQuestionsNum: 0,
  // 남은 문제 수
  remainingQuestions: 20,

  // 시험결과
  incorrectAnswerNoteMain: [],
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
