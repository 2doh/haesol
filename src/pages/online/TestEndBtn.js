import styled from "@emotion/styled";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal, updateModalDate } from "slices/modalSlice";

const TestEndBtnStyle = styled.div`
  /* position: absolute; */
  display: flex;
  box-sizing: border-box;
  gap: 10px;
  /* min-height: 80px; */

  /* padding: 20px 0px; */

  button {
    padding: 10px 20px 10px 20px;
    font-size: 20px;
    border-radius: 50px;

    color: white;
  }

  #save-btn {
    background-color: #5f9ba6;
  }

  #submit-btn {
    background-color: #1b6a78;
  }
`;

const TestEndBtn = () => {
  const testState = useSelector(state => state.testSlice);
  const dispatch = useDispatch();

  const saveBtn = () => {
    const data = {
      headerText: "저장",
      bodyText: ["작성한 답안지를 저장하였습니다."],
      modalRes: [55],
      buttonCnt: 1,
      buttonText: ["확인"],
    };

    dispatch(updateModalDate(data));
    dispatch(openModal("BasicModal"));
  };

  const submitBtn = () => {
    if (testState.remainingQuestions !== 0) {
      const data = {
        headerText: "주의",
        bodyText: [`남은 문제가 있습니다.\n\n답인지를 제출하시겠습니까?`],
        modalRes: [56],
        buttonCnt: 2,
        buttonText: ["제출", "취소"],
      };

      dispatch(updateModalDate(data));
    } else {
      const data = {
        headerText: "확인",
        bodyText: [`답인지를 제출하시겠습니까?`],
        modalRes: [56],
        buttonCnt: 2,
        buttonText: ["제출", "취소"],
      };

      dispatch(updateModalDate(data));
    }

    dispatch(openModal("BasicModal"));
  };

  return (
    <TestEndBtnStyle>
      <button
        type="button"
        id="save-btn"
        onClick={() => {
          saveBtn();
        }}
      >
        저장하기
      </button>
      <button
        type="button"
        id="submit-btn"
        onClick={() => {
          submitBtn();
        }}
      >
        제출하기
      </button>
    </TestEndBtnStyle>
  );
};

export default TestEndBtn;
