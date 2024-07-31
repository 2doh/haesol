import styled from "@emotion/styled";
import React from "react";

const TestOmrStyle = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    display: flex;
    flex-direction: row;
    height: 40px;
  }

  .omr-box,
  .omr-top {
    & > div {
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        font-size: 18px;
      }
    }

    & > div:first-child {
      width: 15%;
    }

    & > div:last-child {
      width: 85%;
    }
  }

  .omr-top {
    width: 100%;

    div {
      background-color: #5f909f;

      span {
        color: #fff;
      }
    }
  }

  .omr-box {
    max-width: 100%;

    .omr-num {
      width: 10%;
      background-color: #5f909f;

      span {
        color: #fff;
      }
    }
    .omr-select-text {
      width: 90%;
      background-color: #add2d8;
    }
  }
`;

const TestOmr = () => {
  return (
    <TestOmrStyle>
      <div className="omr-top">
        <div className="omr-num-text">
          <span>문항</span>
        </div>
        <div className="omr-select-text">
          <span>답 안</span>
        </div>
      </div>

      <div className="omr-box">
        <div className="omr-num">
          <span>1</span>
        </div>
        <div className="omr-selet">
          <span> 1 2 3 4 5</span>
        </div>
      </div>
    </TestOmrStyle>
  );
};

export default TestOmr;
