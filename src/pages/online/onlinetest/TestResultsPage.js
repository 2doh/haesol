import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GreenHeaderNoOption from "components/layout/header/GreenHeaderNoOption";
import usePreventGoBack from "hooks/common/usePreventGoBack";
import TestTitle from "./TestTitle";
import TextBot from "./TextBot";
import { useNavigate } from "react-router";
import BookRecommendBot from "../bot/BookRecommendBot";

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
  const navigate = useNavigate();
  const testState = useSelector(state => state.testSlice);

  // 책 추천 버큰 클릭했는지 확인
  const [isRecommend, setIsRecommend] = useState(false);

  // 모든 문제의 문제 유형 배열
  const [questionTypeAll, setQuestionTypeAll] = useState();

  // 문제 유형 중복 제거 배열
  const questionType = [...new Set(questionTypeAll)];

  // 각 문제 유형에 해당하는 문제들 저장
  const [questionTypeList, setQuestionTypeList] = useState({});

  // 문제 실제 정답 배열
  const [realAnswerAll, setRealAnswerAll] = useState();

  // 학생이 선택한 정답 배열
  const [studentSelectOmr, setStudentSelectOmr] = useState();

  // 채점 결과를 담을 배열
  const [omrRe, setOmrRe] = useState([]);

  /** omr 배열이 들어왔을 때 정답 배열 생성 */
  useEffect(() => {
    if (realAnswerAll && studentSelectOmr) {
      // 정답 배열을 저장할 변수
      const newOmrRe = [];

      // 각 문제에 대해 정답을 비교하고 결과를 newOmrRe에 저장
      testState.questionAll.forEach((item, index) => {
        const isCorrect =
          testState.incorrectAnswerNoteMain.realAnswer[index] ===
          testState.incorrectAnswerNoteMain.studentOmr.omrAnswer[index];

        newOmrRe.push(isCorrect ? "O" : "X");
      });

      // 상태를 업데이트
      setOmrRe(newOmrRe);
    }
  }, [realAnswerAll, studentSelectOmr]);

  // 가장 많이 틀린 유형의 틀린 문제 개수
  const [errorCounts, setErrorCounts] = useState({});
  // 가장 많이 틀린 유형들
  const [mostMistakesTypes, setMostMistakesTypes] = useState([]);
  // 틀린 문제 총 개수
  const [totalWrongCount, setTotalWrongCount] = useState(null);

  useEffect(() => {
    if (questionType) {
      const counts = {};
      let totalWrong = 0;

      questionType.forEach(item => {
        const questionIndices = questionTypeList[item] || [];
        let countNum = 0;

        questionIndices.forEach(num => {
          // 인덱스는 0부터 시작하기 때문에 num - 1을 통해 omrRe 배열에 접근
          if (omrRe[num - 1] === "X") {
            countNum += 1;
          }
        });

        counts[item] = countNum;
        totalWrong += countNum; // 총 틀린 개수 계산
      });

      // 가장 많이 틀린 유형 찾기
      const maxCount = Math.max(...Object.values(counts));
      const mostMistakes = Object.keys(counts).filter(
        type => counts[type] === maxCount,
      );

      if (totalWrong === null) {
        totalWrong = 0;
      }

      setErrorCounts(counts);

      // 틀린 문제가 없을 경우 "없다"로 설정
      if (totalWrong === 0) {
        setMostMistakesTypes(["없음"]);
      } else {
        setMostMistakesTypes(mostMistakes);
      }

      setTotalWrongCount(totalWrong); // 총 틀린 개수 상태 업데이트
    }
  }, [questionTypeList, omrRe]);

  /** 새로고침으로 데이터 없을시 처리 */
  useEffect(() => {
    if (testState.incorrectAnswerNoteMain.length === 0) {
      navigate("/");
    } else {
      setQuestionTypeAll(testState.incorrectAnswerNoteMain.typeString);
      setRealAnswerAll(testState.incorrectAnswerNoteMain.realAnswer);
      setStudentSelectOmr(
        testState.incorrectAnswerNoteMain.studentOmr.omrAnswer,
      );
    }
  }, [testState]);

  useEffect(() => {
    if (questionTypeAll) {
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
    }
  }, [testState, questionTypeAll]);

  /** 이전 페이지 시험 페이지로 돌아가지 못하게 막기 */
  usePreventGoBack("시험 문제 페이지로 돌아갈 수 없습니다.");

  /** 테스트 결과에 대한 참조값 저장 */
  const [testResText, setTestResText] = useState("");
  /** 테스트 결과 준비 완료 */
  const [istestResText, setIsTestResText] = useState(false);

  /** 테스트 결과에 대한 참조값 저장 */
  const [reTestResText, setReTestResText] = useState("");

  /** 테스트 결과를 문자열로 저장 */
  const testRes = () => {
    // let newText = ``;

    // testState.questionAll.map((item, index) => {
    // 1차
    // const text = `${testState.questionAll[index].number}번 문제는 ${gradRes} ${testState.questionAll[index].number}번 문제 유형은 ${testState.incorrectAnswerNoteMain.typeString[index]}이고, 난이도는 ${testState.questionAll[index].level}이다. `;

    // 2차
    // const text = `${index + 1}번 문제의 유형은 ${testState.incorrectAnswerNoteMain.typeString[index]}이고, 이 문제를 ${gradRes}`;
    // newText += text + "\n"; // 줄바꿈을 추가하여 각 문제 결과를 구분

    // if (testState.questionAll[index].number === index + 1) {
    setIsTestResText(true);
    // setTestResText(newText);

    let types = "";

    // mostMistakesTypes.map(item => {
    //   types += item;
    // });
    console.log("mostMistakesTypes : ", mostMistakesTypes);
    setReTestResText(
      `총 문제의 수는 ${testState.questionAll.length} 이고, ${totalWrongCount} 문제 틀렸다. 가장 많이 틀린 문제 유형은 ${mostMistakesTypes}입니다. `,
    );
    // }
    // });
  };

  useEffect(() => {
    if (totalWrongCount) {
      testRes();
    }
  }, [mostMistakesTypes]);

  /** 책 추천 버튼 클릭 */
  useEffect(() => {
    console.log("isRecommend : ", isRecommend);
  }, [isRecommend]);

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
            <TextBot
              testResText={reTestResText}
              setIsRecommend={setIsRecommend}
              isRecommend={isRecommend}
            />
            {/* 책 추천 버튼 눌렀을 때 */}
            {/* {isRecommend ? (
              <BookRecommendBot
                mostMistakesTypes={mostMistakesTypes}
                isRecommend={isRecommend}
              />
            ) : null} */}

            <div className="res-question-type">
              {questionType.map((item, index) => {
                // 현재 문제 유형에 해당하는 문제 인덱스를 가져옵니다.
                const questionIndices = questionTypeList[item] || [];

                // if (questionIndices)
                // console.log("questionIndices : ", questionIndices);

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
                                <>
                                  <div id="correctMark">O</div>
                                </>
                              ) : (
                                <>
                                  <div id="wrongMark">X</div>
                                </>
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
