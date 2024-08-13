import GreenHeaderNoOption from "components/layout/header/GreenHeaderNoOption";
import React from "react";
import TestTitle from "./TestTitle";
import TestQuestion from "./TestQuestion";
import TestAnswer from "./TestAnswer";
import styled from "@emotion/styled";
import { useNavigate } from "react-router";

const TestExWrap = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100vh - 70px);

  .test-ex-page {
    width: 1180px;
    height: 100%;
    background-color: #f3f9fa;
    margin: 0 auto;
    min-width: 440px;

    .test-page-inner {
      width: 100%;
      height: calc(100% - 60px);
      display: flex;
      flex-direction: row;

      & > div:first-of-type {
        /* flex-grow: 2.5; */
        min-width: 880px;
        max-width: 880px;
      }
      & > div:last-child {
        /* flex-grow: 1; */
        /* min-width: 377px;
        max-width: 377px; */
      }
    }
  }

  @media screen and (max-width: 1180px) {
    .test-ex-page {
      width: auto;
      .test-page-inner {
        display: flex;
        flex-direction: column;

        & > div:first-of-type {
          min-width: auto;
          width: 100%;
          max-width: none;
        }
      }
    }
  }
`;

export const TestExPage = () => {
  const navigate = useNavigate();

  const startTest = subjects => {
    // console.log(subjects);
    navigate("/online/test", { state: { subjects: subjects } });
  };

  return (
    <>
      <GreenHeaderNoOption />
      <TestExWrap>
        <div className="test-ex-page">
          <button
            onClick={() => {
              startTest("korean");
            }}
          >
            시작하기
          </button>
          <button>설명보기</button>
          {/* <TestTitle />
          <div className="test-page-inner">
            <TestQuestion />
            <TestAnswer />
          </div> */}
        </div>
      </TestExWrap>
    </>
  );
};
