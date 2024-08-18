import styled from "@emotion/styled";
import TestEndBtn from "../TestEndBtn";
import TestOmr from "../TestOmr";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { remainingQuestionsCount, updateTestDate } from "slices/testSlice";
import NoteOmr from "./NoteOmr";
import NoteEndBtn from "./NoteEndBtn";

const TestAnswerStyle = styled.div`
  width: 100%;
  height: 100%;
  border-left: 1px solid #bee0e3;

  display: flex;
  flex-direction: column;

  .btn-wrap {
    width: 100%;
    min-height: 80px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
  }

  .cbt__remainder {
    display: flex;
    justify-content: center;
    align-items: center;

    padding-top: 20px;
    font-size: 18px;

    p {
      font-size: 24px;
      color: purple;
    }

    .zero {
      color: blue;
    }
  }

  .omr-wrap {
    width: 100%;
    height: 100%;
  }

  @media screen and (max-width: 1180px) {
    .btn-wrap {
      flex-direction: row-reverse;
      align-items: center;
      justify-content: space-between;
      padding: 0 20px;
    }

    .cbt__remainder {
      padding: 0px;
    }
  }
`;

const NoteAnswer = () => {
  const testState = useSelector(state => state.testSlice);
  const dispatch = useDispatch();

  const questionAllNum = testState.questionAll.length;

  return (
    <TestAnswerStyle>
      <div className="btn-wrap">
        <NoteEndBtn />
        <div className="cbt__remainder">
          {questionAllNum} / &nbsp;&nbsp;&nbsp;
          <p>(틀린 문제수)</p>
          &nbsp;&nbsp;
        </div>
      </div>

      <div className="omr-wrap">
        <NoteOmr />
      </div>
    </TestAnswerStyle>
  );
};

export default NoteAnswer;
