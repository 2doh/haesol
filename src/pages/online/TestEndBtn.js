import styled from "@emotion/styled";
import React from "react";

const TestEndBtnStyle = styled.div`
  position: absolute;
  display: flex;
  box-sizing: border-box;
  gap: 10px;
  padding: 20px 0px;

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
  return (
    <TestEndBtnStyle>
      <button type="button" id="save-btn">
        저장하기
      </button>
      <button type="button" id="submit-btn">
        제출하기
      </button>
    </TestEndBtnStyle>
  );
};

export default TestEndBtn;
