import styled from "@emotion/styled";
import React from "react";

const TestQuestionWrap = styled.div`
  height: 100%;
  padding: 20px;

  .test-question-inner {
    width: 100%;
    height: 100%;
    border: 1px solid #1b6a78;
    padding: 20px;

    display: flex;
    flex-direction: column;

    .question-text {
      width: 100%;
    }

    .question-pic {
    }
  }
`;

const TestQuestion = () => {
  return (
    <TestQuestionWrap>
      <div className="test-question-inner">
        <div className="question-text">Q01. 문제 1번 입니다.</div>
        <div className="question-pic">사진 영역 입니다.</div>
        <div className="num-select">
          <input type="radio" id="select1" />
          <labe htmlFor="select1">
            <span>정답 1</span>
          </labe>
          <input type="radio" id="select1" />
          <labe htmlFor="select2">
            <span>정답 2</span>
          </labe>
          <input type="radio" id="select1" />
          <labe htmlFor="select3">
            <span>정답 3</span>
          </labe>
          <input type="radio" id="select1" />
          <labe htmlFor="select4">
            <span>정답 4</span>
          </labe>
          <input type="radio" id="select1" />
          <labe htmlFor="select5">
            <span>정답 5</span>
          </labe>
        </div>
      </div>
    </TestQuestionWrap>
  );
};

export default TestQuestion;
