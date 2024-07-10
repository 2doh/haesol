import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // 모달 상태 관리
  modalType: "",
  isOpen: false,

  // 모달에 들어갈 내용
  headerText: "확인",
  //   bodyTextLabel: ["구분", "아이디"],
  bodyTextLabel: ["-"],
  //   bodyText: ["학부모", "acahe1d3"],
  bodyText: ["내용이 없습니다."],
  // buttonText[0] : true, buttonText[2] : false 리턴함.
  buttonText: ["완료", "취소"],
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, actions) => {
      //   const { modalType } = actions.payload;
      state.modalType = actions.payload;
      state.isOpen = true;
      //   console.log("modalSlice 출력 : ", actions.payload);
    },
    closeModal: state => {
      state.isOpen = false;
    },
    updateModalDate: (state, actions) => {
      return { ...state, ...actions.payload };
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModal = state => state.modal;

export default modalSlice.reducer;
