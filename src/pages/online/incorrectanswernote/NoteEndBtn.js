import styled from "@emotion/styled";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
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

    min-width: 108px;
    color: white;
  }

  #save-btn {
    background-color: #5f9ba6;
  }

  #submit-btn {
    background-color: #1b6a78;
  }
`;

const NoteEndBtn = () => {
  const navigate = useNavigate();

  const backBtn = () => {
    navigate(-1);
  };

  const homeBtn = () => {
    navigate("/");
  };

  return (
    <TestEndBtnStyle>
      <button
        type="button"
        id="save-btn"
        onClick={() => {
          backBtn();
        }}
      >
        돌아가기
      </button>
      <button
        type="button"
        id="submit-btn"
        onClick={() => {
          homeBtn();
        }}
      >
        나가기
      </button>
    </TestEndBtnStyle>
  );
};

export default NoteEndBtn;
