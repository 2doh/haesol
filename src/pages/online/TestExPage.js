import GreenHeaderNoOption from "components/layout/header/GreenHeaderNoOption";
import React, { useEffect } from "react";
import TestTitle from "./TestTitle";
import TestQuestion from "./TestQuestion";
import TestAnswer from "./TestAnswer";
import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router";

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

    padding: 50px 60px;

    .test-ex-page-inner {
      width: 100%;
      height: 100%;

      /* 지우기 */
      background-color: gray;

      .test-ex-header {
        width: 100%;
        height: 150px;
        background-color: lightblue;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .test-ex-buttons {
        width: 100%;
        height: 150px;
        background-color: lightcoral;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .test-ex-explanation {
        width: 100%;
        height: calc(100% - 300px);
        /* background-color: lightcoral; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
  const location = useLocation();

  // 받은 과목 번호
  const subjectsNum = location.state.subjectsNum;
  const subjectsName = location.state.subjectsName;

  /** 받은 과목 번호 */
  useEffect(() => {
    // console.log("subjectsNum : ", subjectsNum);
    // console.log("subjectsName : ", subjectsName);
  }, [subjectsNum, subjectsName]);

  const startTest = subjects => {
    // console.log(subjects);
    navigate("/online/test", {
      state: { subjectsNum: subjectsNum, subjectsName: subjectsName },
    });
  };

  return (
    <>
      <GreenHeaderNoOption />
      <TestExWrap>
        <div className="test-ex-page">
          <div className="test-ex-page-inner ">
            <div className="test-ex-header">
              <div>과목명</div>
              <div>학년</div>
            </div>

            <div className="test-ex-buttons">
              <button
                onClick={() => {
                  startTest(subjectsNum);
                }}
              >
                시작하기
              </button>
              <button>설명보기</button>
            </div>
            <div className="test-ex-explanation">시험에 대한 설명</div>
          </div>
        </div>
      </TestExWrap>
    </>
  );
};
