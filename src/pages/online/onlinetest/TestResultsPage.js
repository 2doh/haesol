import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GreenHeaderNoOption from "components/layout/header/GreenHeaderNoOption";
import usePreventGoBack from "hooks/common/usePreventGoBack";
import TestTitle from "./TestTitle";
import TextBot from "./TextBot";

const TestGradWrap = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100vh - 70px);

  .test-grad-page {
    width: 1180px;
    min-height: 100%;
    height: fit-content;
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
        min-width: 880px;
        max-width: 880px;
      }
    }
  }

  .res-question-type {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 40px 0;
    gap: 40px;

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

  // 모든 문제의 문제 유형 배열
  const questionTypeAll = testState.incorrectAnswerNoteMain.typeString;

  // 문제 유형 중복 제거 배열
  const questionType = [...new Set(questionTypeAll)];

  // 각 문제 유형에 해당하는 문제들 저장
  const [questionTypeList, setQuestionTypeList] = useState({});

  // 문제 실제 정답 배열
  const realAnswerAll = testState.incorrectAnswerNoteMain.realAnswer;
  // 학생이 선택한 정답 배열
  const studentSelectOmr =
    testState.incorrectAnswerNoteMain.studentOmr.omrAnswer;

  useEffect(() => {
    console.log("Unique question types: ", questionType);

    const result = {};

    questionTypeAll.forEach((item, index) => {
      if (result[item]) {
        result[item].push(index + 1); // 문제 번호는 1부터 시작
      } else {
        result[item] = [index + 1];
      }
    });

    console.log("Indices mapping: ", result);
    setQuestionTypeList(result);
  }, [questionTypeAll]);

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
              {questionType.map((item, index) => {
                // 현재 문제 유형에 해당하는 문제 인덱스를 가져옵니다.
                const questionIndices = questionTypeList[item] || [];

                return (
                  <div className="question-type-box" key={index}>
                    <h1>{item}</h1>
                    <div className="question-grad-box">
                      <div className="question-num">
                        <div>문제</div>
                        {questionIndices.map(num => (
                          <div key={num}>{num}</div>
                        ))}
                      </div>
                      <div className="question-grad">
                        <div>채점</div>
                        {questionIndices.map(num => {
                          const isCorrect =
                            realAnswerAll[num - 1] ===
                            studentSelectOmr[num - 1];
                          return (
                            <div className="test-result-page-mark" key={num}>
                              {isCorrect ? (
                                <div id="correctMark">O</div>
                              ) : (
                                <div id="wrongMark">X</div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </TestGradWrap>
    </>
  );
};

export default TestResultsPage;
