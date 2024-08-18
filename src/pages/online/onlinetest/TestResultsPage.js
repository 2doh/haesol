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
    height: 100%;
    background-color: #f3f9fa;
    margin: 0 auto;
    min-width: 440px;

    .test-grad-page-inner {
      width: 100%;
      height: calc(100% - 60px);
      display: flex;
      flex-direction: column;

      padding: 60px;

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
`;

const TestResultsPage = () => {
  const testState = useSelector(state => state.testSlice);
  const [subjectName, setSubjectName] = useState();

  /** 이전 페이지 시험 페이지로 돌아가지 못하게 막기 */
  usePreventGoBack("시험 문제 페이지로 돌아갈 수 없습니다.");

  useEffect(() => {
    console.log("테스트 데이터 저장 : ", testState.subjectCode);
    switch (testState.subjectCode) {
      case 1:
        setSubjectName("국어");
        break;
      case 2:
        setSubjectName("수학");
        break;
      default:
        break;
    }
  }, [testState]);

  return (
    <>
      <GreenHeaderNoOption />
      <TestGradWrap>
        <div className="test-grad-page">
          <TestTitle
            subjectsName={subjectName}
            testName={testState.testTitle}
          />
          <div className="test-grad-page-inner">
            <TextBot />

            <div className="">
              <div>과목명</div>
            </div>
          </div>
        </div>
      </TestGradWrap>
    </>
  );
};

export default TestResultsPage;
