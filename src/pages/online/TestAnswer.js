import styled from "@emotion/styled";
import React from "react";
import TestEndBtn from "./TestEndBtn";
import TestOmr from "./TestOmr";

const TestAnswerStyle = styled.div`
  height: 100%;
  border-left: 1px solid #bee0e3;

  display: flex;
  flex-direction: column;

  .btn-wrap {
    width: 100%;
    height: 80px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .omr-wrap {
    width: 100%;
    height: 100%;
  }
`;

const TestAnswer = () => {
  return (
    <TestAnswerStyle>
      <div className="btn-wrap">
        <TestEndBtn />
      </div>
      <div className="omr-wrap">
        <TestOmr />
      </div>
    </TestAnswerStyle>
  );
};

export default TestAnswer;
