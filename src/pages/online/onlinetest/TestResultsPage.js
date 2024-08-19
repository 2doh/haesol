import styled from "@emotion/styled";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AI_KEY } from "api/config";
import GreenHeaderNoOption from "components/layout/header/GreenHeaderNoOption";
import usePreventGoBack from "hooks/common/usePreventGoBack";
import { useEffect, useState } from "react";
import TestTitle from "./TestTitle";
import { useSelector } from "react-redux";
import botImg from "../../../images/graidentairobot.jpg";
import TextBot from "./TextBot";

const TestGradWrap = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100vh - 70px);

  .test-grad-page {
    width: 1180px;
    /* height: fit-content; */
    height: 100%;
    background-color: #f3f9fa;
    margin: 0 auto;
    min-width: 440px;

    .test-grad-page-inner {
      width: 100%;
      height: calc(100% - 60px);
      display: flex;
      flex-direction: column;
      gap: 50px;

      padding: 60px 100px;

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

  .res-question-type {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 40px 0;

    .question-type-box {
      background-color: white;
      border-radius: 20px;
      padding: 40px;
      width: 45%;

      display: flex;
      flex-direction: column;
      gap: 40px;

      h1 {
        font-size: 30px;
        font-weight: bold;
      }

      .question-grad-box {
        display: flex;
        gap: 20px;
        flex-direction: column;

        & > div {
          display: flex;
          flex-direction: row;
          justify-content: space-around;

          & > div:first-of-type {
            color: gray;
          }

          * {
            font-size: 20px;
          }
        }
      }
    }
  }
`;

const TestResultsPage = () => {
  const testState = useSelector(state => state.testSlice);

  /** 이전 페이지 시험 페이지로 돌아가지 못하게 막기 */
  usePreventGoBack("시험 문제 페이지로 돌아갈 수 없습니다.");

  return (
    <>
      <GreenHeaderNoOption />
      <TestGradWrap>
        <div className="test-grad-page">
          <TestTitle
            subjectsName={testState.subjectName}
            testName={testState.testTitle}
          />
          <div className="test-grad-page-inner">
            <TextBot />

            <div className="res-question-type">
              <div className="question-type-box">
                <h1>(구분)</h1>
                <div className="question-grad-box">
                  <div className="question-num">
                    <div>문제</div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                  </div>
                  <div className="question-grad">
                    <div>채점</div>
                    <div>X</div>
                    <div>X</div>
                    <div>O</div>
                    <div>X</div>
                    <div>X</div>
                  </div>
                </div>
              </div>

              <div className="question-type-box">
                <h1>(구분)</h1>
                <div className="question-grad-box">
                  <div className="question-num">
                    <div>문제</div>
                    <div>1</div>
                    <div>2</div>
                    <div>3</div>
                    <div>4</div>
                    <div>5</div>
                  </div>
                  <div className="question-grad">
                    <div>채점</div>
                    <div>X</div>
                    <div>X</div>
                    <div>O</div>
                    <div>X</div>
                    <div>X</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </TestGradWrap>
    </>
  );
};

export default TestResultsPage;
