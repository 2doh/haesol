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
import items from "../../api/json/gisa2020_01.json";
import answerSelect from "./answerSelect";

import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";

import { PiNumberCircleTwoDuotone } from "react-icons/pi";

const TestQuestionWrap = styled.div`
  height: 100%;
  padding: 20px;

  input[type="radio"] {
    display: none;
    margin: 10px;
  }

  .test-question-inner {
    width: 100%;
    height: 100%;
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

const TestQuestion = () => {
  const dispatch = useDispatch();
  const testState = useSelector(state => state.testSlice);

  // const [nowQuestionsNum, setNowQuestionsNum] = useState(0);
  const [isQuestions, setIsQuestions] = useState(false);

  useEffect(() => {
    dataQuestion();
    // setNowQuestionsNum(0);
  }, []);

  useEffect(() => {
    setIsQuestions(true);
  }, [testState]);

  // 나중에 BE에서 불러오는 데이터로 변경하기(받아와야할 정보 : 문제 번호, 문제 내용, 답안 내용)
  // 나중에 BE에서 불러오는 데이터로 변경하기(보내야할 정보 : 문제 번호, 문제 내용, 작성한 답안 내용)
  // 문제 선택지는 정답 이외에는 랜덤이어야한다.(오답 선택지의 값이 랜덤이 아니더라도 최소 순서는 랜덤이어야한다.)
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

  // const updateRemainingQuestions = answeredCount => {
  //   // const totalQuestions = questionAll.length;
  //   const totalQuestions = 2;
  //   setRemainingQuestions(totalQuestions - answeredCount);
  // };

  // const nowQuestionsNumCalc = () => {};

  return (
    <TestQuestionWrap>
      <div className="test-question-inner">
        <div className="question-text cbt__quiz">
          {isQuestions ? (
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
                <div className="question-pic">사진 영역 입니다.</div>
              </div>
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
                    answerSelect(e, dispatch, testState);
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
                    answerSelect(e, dispatch, testState);
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
                    answerSelect(e, dispatch, testState);
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
                    answerSelect(e, dispatch, testState);
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
                    answerSelect(e, dispatch, testState);
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
                  <span>5</span>
                </label>
              </div>
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
            {testState.nowQuestionsNum >= 19 ? null : (
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
