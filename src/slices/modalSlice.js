import { createSlice } from "@reduxjs/toolkit";
import { removeCookie } from "utils/cookie";

const initialState = {
  // 모달 상태 관리
  // BasicModal: "BasicModal",
  // ArrValueModal: "ArrValueModal",
  // PasswordChangeModal: "PasswordChangeModal",
  // TelAcceptModal: "TelAcceptModal",
  // UserUpdateModal: "UserUpdateModal",
  modalType: "",
  isOpen: false,

  // 모달 헤더 들어갈 내용
  headerText: "확인",
  //   bodyTextLabel: ["구분", "아이디"],
  bodyTextLabel: ["-"],
  //   bodyText: ["학부모", "acahe1d3"],
  bodyText: [""],
  // buttonText[0] : true, buttonText[2] : false 리턴함.
  buttonText: ["완료", "취소"],

  // 버튼 갯수
  buttonCnt: 2,
  // 모달 결과 값을 담는 경우
  modalRes: [false],
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, actions) => {
      state.modalType = actions.payload;
      state.isOpen = true;
    },
    closeModal: state => {
      state.isOpen = false;
    },
    logoutModal: state => {
      state.isOpen = false;

      window.location.replace("/");

      // (어드민) 공통 데이터 쿠키 삭제
      removeCookie("accessToken");
      removeCookie("userIdPk");
      removeCookie("userRole");

      // (학부모) 공통 데이터 쿠키 삭제
      removeCookie("selectChildNum");
      removeCookie("studentPk");

      // (교직원) 공통 데이터 쿠키 삭제
      removeCookie("userClass");
      removeCookie("userName");
      removeCookie("userEmail");

      removeCookie("timerMin");
      removeCookie("timerSec");
      removeCookie("timerTime");
    },
    updateModalDate: (state, actions) => {
      return { ...state, ...actions.payload };
    },
  },
});

export const { openModal, closeModal, logoutModal, updateModalDate } =
  modalSlice.actions;
export const selectModal = state => state.modal;

export default modalSlice.reducer;
