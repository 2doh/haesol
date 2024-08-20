import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import {
  PiNumberCircleFiveBold,
  PiNumberCircleFiveFill,
  PiNumberCircleFourBold,
  PiNumberCircleFourFill,
  PiNumberCircleOneBold,
  PiNumberCircleOneFill,
  PiNumberCircleThreeBold,
  PiNumberCircleThreeFill,
  PiNumberCircleTwoBold,
  PiNumberCircleTwoFill,
} from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import {
  nowQuestionsNumAdd,
  nowQuestionsNumSub,
  updateTestDate,
} from "slices/testSlice";
import items from "../../../api/json/gisa2020_01.json";
import answerSelect from "../answerSelect";

import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

import { PiNumberCircleTwoDuotone } from "react-icons/pi";
import { switchCase } from "@babel/types";
import { getOnlineTest } from "api/online/onlinetestapi";
import StudentImg from "pages/student/StudentImg";
import { TestPreviewImage } from "../TestPreviewImage";
import TestResultsPage from "./TestResultsPage";

const TestQuestionWrap = styled.div`
  min-height: 100%;
  /* height: fit-content; */
  padding: 20px;

  input[type="radio"] {
    display: none;
    margin: 10px;
  }

  .test-question-inner {
    position: relative;

    width: 100%;
    min-height: 100%;
    height: fit-content;
    border: 1px solid #1b6a78;
    padding: 20px;

    display: flex;
    flex-direction: column;

    font-size: 18px;

    .cbt__quiz {
      height: 80%;

      .cbt {
        display: flex;
        flex-direction: column;
        gap: 30px;

        .cbt__question {
        }

        .cbt__question__img {
          width: 100%;
          display: flex;
          justify-content: center;
          /* max-height: 350px; */

          .question-pic {
            display: flex;
            justify-content: center;

            img {
              height: 100%;
              width: 100%;
              object-fit: cover;
            }
          }
        }

        .cbt__selects {
          display: flex;
          flex-direction: column;
          gap: 10px;

          label {
            display: flex;
            gap: 10px;
            align-items: center;

            svg {
              font-size: 20px;
            }

            span {
            }
          }
        }
      }
    }

    /* 버튼 영역 */
    .cbt_wrap {
      height: 20%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      gap: 50px;
      min-height: 100px;

      .cbt_inner {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;

        & > div {
          position: absolute;
          background-color: #1b6a78;
          padding: 10px 20px 10px 20px;
          font-size: 20px;
          border-radius: 50px;
          color: white;
          cursor: pointer;

          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 10px;
          padding: 20px;

          & svg {
            font-size: 25px;
          }
          & path {
            color: white;
          }
        }
        .left-btn {
          right: 0;
        }
        .right-btn {
          left: 0;
        }
      }
    }

    .question-text {
      width: 100%;
    }

    .question-pic {
    }
  }
`;

const TestQuestion = ({ subjects, subjectsName, testName }) => {
  const dispatch = useDispatch();
  const testState = useSelector(state => state.testSlice);

  const [isQuestions, setIsQuestions] = useState(false);

  // 주관식 답 저장
  const [questionsInputAnswer, setQuestionsInputAnswer] = useState("");

  useEffect(() => {
    if (testState.selectNumArr.length !== 0) {
      setQuestionsInputAnswer(
        testState.selectNumArr[testState.nowQuestionsNum].selectNum,
      );
    }
  }, [testState.nowQuestionsNum, testState.selectNumArr]);

  /** 주관식 답 입력 버튼 클릭 이벤트 */
  const subjectAnswerInput = typeNum => {
    console.log("questionsInputAnswer : ", questionsInputAnswer);
    console.log("typeNum : ", typeNum);
    answerSelect(questionsInputAnswer, dispatch, testState, typeNum);
  };

  useEffect(() => {
    if (subjects) {
      getDateQuestion(subjects);
    }

    const data = {
      subjectCode: subjects,
      subjectName: subjectsName,
    };

    dispatch(updateTestDate(data));
  }, []);

  useEffect(() => {
    setIsQuestions(true);
  }, [testState]);

  /** 최초 랜더링시 시험 데이터 가져오기 */
  const getDateQuestion = async subjects => {
    let res = [];

    console.log("subjects : ", subjects);
    switch (subjects) {
      case 1:
        res = await getOnlineTest(1);
        console.log("res : ", res);
        break;
      case 2:
        res = await getOnlineTest(2);
        console.log("res : ", res);
        break;
      default:
        break;
    }

    if (res) {
      reGetDateQuestion(res);
    }
  };

  useEffect(() => {
    console.log("testState 결과 : ", testState);
  }, [testState]);

  /** 데이터 리덕스 툴킷에 저장 */
  const reGetDateQuestion = list => {
    console.log("list : ", list);
    const formattedQuestions = list.map((item, index) => {
      /** 문제 번호 매기기, 문제 개별로 저장 */
      const formattedQuestion = {
        number: index + 1,
        question: item.question,
        answer: item.correct_answer,
        choice1: item.sentence[0],
        choice2: item.sentence[1],
        choice3: item.sentence[2],
        choice4: item.sentence[3],
        choice5: item.sentence[4],
        questionImg: item.pic,
        questionImgPk: item.queId,

        // queTag :  1(객관식), 2(주관식)
        queTag: item.queTag,
        // 문제 난이도 - 낮은 수일수록 쉬움.
        level: item.level,
      };
      return formattedQuestion;
    });

    const questionsNumArr = list.map((item, index) => {
      const questionsNum = {
        number: index + 1,
        selectNum: "",
      };

      return questionsNum;
    });

    /** 문제 pk 저장 */
    const questionsAllPk = list.map((item, index) => {
      console.log("index : ", index);
      const questionsPk = {
        questionPk: item.queId,
      };

      return questionsPk;
    });

    const listLength = list.length;

    const data = {
      testTitle: testName,
      questionAllPk: questionsAllPk,
      questionAll: formattedQuestions,
      selectNumArr: questionsNumArr,
      nowQuestionsNum: 0,
      remainingQuestions: listLength,
    };

    // console.log("formattedQuestions : ", formattedQuestions);
    // console.log("questionsNumArr : ", questionsNumArr);
    // console.log("data : ", data);

    dispatch(updateTestDate(data));
  };

  /** 최소 랜더링 : JSON 불러오기 */
  const dataQuestion = () => {
    const formattedQuestions = items.map((item, index) => {
      /** 문제 번호 매기기, 문제 개별로 저장 */
      const formattedQuestion = {
        number: index + 1,
        question: item.question,
        answer: item.correct_answer,
      };

      // console.log("날 정보 : ", item);
      // console.log("문제 번호 매기기, 개별 저장 : ", formattedQuestion);

      const answerChoices = [...item.incorrect_answers];

      formattedQuestion.Answer =
        Math.floor(Math.random() * answerChoices.length) + 1;
      answerChoices.splice(
        formattedQuestion.Answer - 1,
        0,
        item.correct_answer,
      );

      answerChoices.forEach((choice, index) => {
        formattedQuestion["choice" + (index + 1)] = choice;
      });

      if (item.question_img) {
        formattedQuestion.questionImg = item.question_img;
      }

      return formattedQuestion;
    });

    const questionsNumArr = items.map((item, index) => {
      const questionsNum = {
        number: index + 1,
        selectNum: 0,
      };

      return questionsNum;
    });

    const data = {
      questionAll: formattedQuestions,
      selectNumArr: questionsNumArr,
      nowQuestionsNum: 0,
    };

    dispatch(updateTestDate(data));
  };

  return (
    <TestQuestionWrap>
      <div className="test-question-inner">
        <div className="question-text cbt__quiz">
          {testState.questionAll[testState.nowQuestionsNum] ? (
            <div className="cbt">
              <div className="cbt__question">
                <span>
                  {testState.questionAll[testState.nowQuestionsNum].number}.
                </span>
                &nbsp; &nbsp;
                {testState.questionAll[testState.nowQuestionsNum].question ||
                  ""}
              </div>
              <div className="cbt__question__img">
                <div className="question-pic">
                  {testState.questionAll[testState.nowQuestionsNum]
                    .questionImg === "DEFAULT_PICTURE_DATA" ||
                  testState.questionAll[testState.nowQuestionsNum]
                    .questionImg === null ? null : (
                    <TestPreviewImage
                      imgUrl={
                        testState.questionAll[testState.nowQuestionsNum]
                          .questionImg
                      }
                      imgPk={
                        testState.questionAll[testState.nowQuestionsNum]
                          .questionImgPk
                      }
                    />
                  )}
                </div>
              </div>

              {testState.questionAll[testState.nowQuestionsNum].queTag === 2 ? (
                // 주관식
                <div className="cbt__input">
                  <input
                    type="text"
                    placeholder="정답을 입력해주세요"
                    value={questionsInputAnswer}
                    onChange={e => {
                      setQuestionsInputAnswer(e.target.value);
                    }} // onChange 핸들러 추가
                  />
                  <button
                    className="subject-input-btn"
                    type="button"
                    onClick={() => {
                      subjectAnswerInput(2);
                    }}
                  >
                    입력
                  </button>
                </div>
              ) : (
                // 객관식
                <div className="cbt__selects">
                  <input
                    type="radio"
                    checked={
                      testState.selectedValue ===
                      `${testState.questionAll[testState.nowQuestionsNum].number}_1`
                    }
                    id={`select${testState.questionAll[testState.nowQuestionsNum].number}_1`}
                    name={`select${testState.questionAll[testState.nowQuestionsNum].number}`}
                    value={`${testState.questionAll[testState.nowQuestionsNum].number}_1`}
                    onChange={e => {
                      answerSelect(e, dispatch, testState, 1);
                    }} // onChange 핸들러 추가
                  />
                  <label
                    htmlFor={`select${testState.questionAll[testState.nowQuestionsNum].number}_1`}
                  >
                    {testState.selectNumArr[testState.nowQuestionsNum]
                      .selectNum === 1 ? (
                      <PiNumberCircleOneFill />
                    ) : (
                      // <PiNumberCircleTwoDuotone />
                      <PiNumberCircleOneBold />
                    )}
                    <span>
                      {testState.questionAll[testState.nowQuestionsNum].choice1}
                    </span>
                  </label>
                  <input
                    type="radio"
                    checked={
                      testState.selectedValue ===
                      `${testState.questionAll[testState.nowQuestionsNum].number}_2`
                    }
                    id={`select${testState.questionAll[testState.nowQuestionsNum].number}_2`}
                    name={`select${testState.questionAll[testState.nowQuestionsNum].number}`}
                    value={`${testState.questionAll[testState.nowQuestionsNum].number}_2`}
                    onChange={e => {
                      answerSelect(e, dispatch, testState, 1);
                    }} // onChange 핸들러 추가
                  />
                  <label
                    htmlFor={`select${testState.questionAll[testState.nowQuestionsNum].number}_2`}
                  >
                    {testState.selectNumArr[testState.nowQuestionsNum]
                      .selectNum === 2 ? (
                      <PiNumberCircleTwoFill />
                    ) : (
                      <PiNumberCircleTwoBold />
                    )}
                    <span>
                      {testState.questionAll[testState.nowQuestionsNum].choice2}
                    </span>
                  </label>

                  <input
                    type="radio"
                    checked={
                      testState.selectedValue ===
                      `${testState.questionAll[testState.nowQuestionsNum].number}_3`
                    }
                    id={`select${testState.questionAll[testState.nowQuestionsNum].number}_3`}
                    name={`select${testState.questionAll[testState.nowQuestionsNum].number}`}
                    value={`${testState.questionAll[testState.nowQuestionsNum].number}_3`}
                    onChange={e => {
                      answerSelect(e, dispatch, testState, 1);
                    }} // onChange 핸들러 추가
                  />
                  <label
                    htmlFor={`select${testState.questionAll[testState.nowQuestionsNum].number}_3`}
                  >
                    {testState.selectNumArr[testState.nowQuestionsNum]
                      .selectNum === 3 ? (
                      <PiNumberCircleThreeFill />
                    ) : (
                      <PiNumberCircleThreeBold />
                    )}

                    <span>
                      {testState.questionAll[testState.nowQuestionsNum].choice3}
                    </span>
                  </label>
                  <input
                    type="radio"
                    checked={
                      testState.selectedValue ===
                      `${testState.questionAll[testState.nowQuestionsNum].number}_4`
                    }
                    id={`select${testState.questionAll[testState.nowQuestionsNum].number}_4`}
                    name={`select${testState.questionAll[testState.nowQuestionsNum].number}`}
                    value={`${testState.questionAll[testState.nowQuestionsNum].number}_4`}
                    onChange={e => {
                      answerSelect(e, dispatch, testState, 1);
                    }} // onChange 핸들러 추가
                  />
                  <label
                    htmlFor={`select${testState.questionAll[testState.nowQuestionsNum].number}_4`}
                  >
                    {testState.selectNumArr[testState.nowQuestionsNum]
                      .selectNum === 4 ? (
                      <PiNumberCircleFourFill />
                    ) : (
                      <PiNumberCircleFourBold />
                    )}

                    <span>
                      {testState.questionAll[testState.nowQuestionsNum].choice4}
                    </span>
                  </label>
                  <input
                    type="radio"
                    checked={
                      testState.selectedValue ===
                      `${testState.questionAll[testState.nowQuestionsNum].number}_5`
                    }
                    id={`select${testState.questionAll[testState.nowQuestionsNum].number}_5`}
                    name={`select${testState.questionAll[testState.nowQuestionsNum].number}`}
                    value={`${testState.questionAll[testState.nowQuestionsNum].number}_5`}
                    onChange={e => {
                      answerSelect(e, dispatch, testState, 1);
                    }} // onChange 핸들러 추가
                  />
                  <label
                    htmlFor={`select${testState.questionAll[testState.nowQuestionsNum].number}_5`}
                  >
                    {testState.selectNumArr[testState.nowQuestionsNum]
                      .selectNum === 5 ? (
                      <PiNumberCircleFiveFill />
                    ) : (
                      <PiNumberCircleFiveBold />
                    )}

                    <span>
                      {testState.questionAll[testState.nowQuestionsNum].choice5}
                    </span>
                  </label>
                </div>
              )}

              {/* <div className="cbt__desc hide">{item.desc || ""}</div> */}
            </div>
          ) : (
            console.log("로딩중")
          )}

          {/* 모든 문제 출력 */}
          {/* {testState.questionAll.map((item, index) => (
            <div className="cbt" key={index}>
              <div className="cbt__question">
                <span>{item.number}</span>. {item.question || ""}
              </div>
              <div className="cbt__question__img"></div>
              <div className="cbt__selects">
                <input
                  type="radio"
                  checked={testState.selectedValue === `${item.number}_1`}
                  id={`select${item.number}_1`}
                  name={`select${item.number}`}
                  value={`${item.number}_1`}
                  onChange={e => {
                    answerSelect(e, dispatch, testState);
                  }} // onChange 핸들러 추가
                />
                <label htmlFor={`select${item.number}_1`}>
                  {testState.selectNumArr[index].selectNum === 1 ? (
                    <PiNumberCircleOneFill />
                  ) : (
                    <PiNumberCircleOneBold />
                  )}
                  <span>{item.choice1}</span>
                </label>
                <input
                  type="radio"
                  checked={testState.selectedValue === `${item.number}_2`}
                  id={`select${item.number}_2`}
                  name={`select${item.number}`}
                  value={`${item.number}_2`}
                  onChange={e => {
                    answerSelect(e, dispatch, testState);
                  }} // onChange 핸들러 추가
                />
                <label htmlFor={`select${item.number}_2`}>
                  {testState.selectNumArr[index].selectNum === 2 ? (
                    <PiNumberCircleTwoFill />
                  ) : (
                    <PiNumberCircleTwoBold />
                  )}
                  <span>{item.choice2}</span>
                </label>

                <input
                  type="radio"
                  checked={testState.selectedValue === `${item.number}_3`}
                  id={`select${item.number}_3`}
                  name={`select${item.number}`}
                  value={`${item.number}_3`}
                  onChange={e => {
                    answerSelect(e, dispatch, testState);
                  }} // onChange 핸들러 추가
                />
                <label htmlFor={`select${item.number}_3`}>
                  {testState.selectNumArr[index].selectNum === 3 ? (
                    <PiNumberCircleThreeFill />
                  ) : (
                    <PiNumberCircleThreeBold />
                  )}

                  <span>{item.choice3}</span>
                </label>
                <input
                  type="radio"
                  checked={testState.selectedValue === `${item.number}_4`}
                  id={`select${item.number}_4`}
                  name={`select${item.number}`}
                  value={`${item.number}_4`}
                  onChange={e => {
                    answerSelect(e, dispatch, testState);
                  }} // onChange 핸들러 추가
                />
                <label htmlFor={`select${item.number}_4`}>
                  {testState.selectNumArr[index].selectNum === 4 ? (
                    <PiNumberCircleFourFill />
                  ) : (
                    <PiNumberCircleFourBold />
                  )}

                  <span>{item.choice4}</span>
                </label>
                <input
                  type="radio"
                  checked={testState.selectedValue === `${item.number}_5`}
                  id={`select${item.number}_5`}
                  name={`select${item.number}`}
                  value={`${item.number}_5`}
                  onChange={e => {
                    answerSelect(e, dispatch, testState);
                  }} // onChange 핸들러 추가
                />
                <label htmlFor={`select${item.number}_5`}>
                  {testState.selectNumArr[index].selectNum === 5 ? (
                    <PiNumberCircleFiveFill />
                  ) : (
                    <PiNumberCircleFiveBold />
                  )}
                  <span>5</span>
                </label>
              </div>
              <div className="cbt__desc hide">{item.desc || ""}</div>
            </div>
          ))} */}
        </div>

        <div className="cbt_wrap">
          <div className="cbt_inner">
            {testState.nowQuestionsNum === 0 ? null : (
              <div
                className="left-btn"
                onClick={() => {
                  dispatch(nowQuestionsNumSub());
                }}
              >
                <FaArrowLeft />
                이전 문제
              </div>
            )}
          </div>
          <div className="cbt_inner">
            {testState.nowQuestionsNum >
            testState.questionAll.length - 2 ? null : (
              <div
                className="right-btn"
                onClick={() => {
                  dispatch(nowQuestionsNumAdd());
                }}
              >
                다음 문제
                <FaArrowRight />
              </div>
            )}
          </div>
        </div>
      </div>
    </TestQuestionWrap>
  );
};

export default TestQuestion;
