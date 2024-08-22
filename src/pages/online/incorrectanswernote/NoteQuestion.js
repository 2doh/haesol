import styled from "@emotion/styled";
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
import { nowQuestionsNumAdd, nowQuestionsNumSub } from "slices/testSlice";
import answerSelect from "../answerSelect";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { TestPreviewImage } from "../TestPreviewImage";

import correctlyImg from "../../../images/online/note/3.png";
import wrongImg from "../../../images/online/note/4.png";
import { useState } from "react";

const TestQuestionWrap = styled.div`
  min-height: 100%;
  height: fit-content;
  padding: 20px;

  input[type="radio"] {
    display: none;
    margin: 10px;
  }

  .test-question-inner {
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
          span {
            position: relative;
            img {
              position: absolute;
              opacity: 0.7;
            }

            #correctlyImg {
              top: -88px;
              left: -76px;
              width: 170px;
              height: 190px;
            }
            #wrongImg {
              width: 130px;
              height: 130px;
              top: -75px;
              left: -51px;
            }
          }
        }

        .cbt__question__img {
          display: flex;
          justify-content: center;
          /* max-height: 350px; */

          .question-pic {
            display: flex;
            justify-content: center;

            img {
              width: 100%;
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

  .cbt__selects {
    img {
      margin-left: -23px;
      width: 67px;
      height: 80px;
      position: absolute;
    }
  }
  .cbt__input {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
  }

  .real-answer-text {
    font-size: 30px;
    color: red;
    padding-bottom: 40px;
  }
`;

const NoteQuestion = ({ studentOmr, realAnswerOmr }) => {
  const dispatch = useDispatch();
  const testState = useSelector(state => state.testSlice);

  return (
    <TestQuestionWrap>
      <div className="test-question-inner">
        <div className="question-text cbt__quiz">
          {testState.questionAll[testState.nowQuestionsNum] ? (
            <div className="cbt">
              <div className="cbt__question">
                <span>
                  {studentOmr[testState.nowQuestionsNum] ===
                  realAnswerOmr[testState.nowQuestionsNum] ? (
                    <img src={correctlyImg} id="correctlyImg" />
                  ) : (
                    <img src={wrongImg} id="wrongImg" />
                  )}
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
                    disabled
                    type="text"
                    value={
                      testState.incorrectAnswerNoteMain.studentOmr.omrAnswer[
                        testState.nowQuestionsNum
                      ]
                    }
                  />
                  <div className="real-answer-text">
                    정답 : {realAnswerOmr[testState.nowQuestionsNum]}
                  </div>
                </div>
              ) : (
                // 객관식

                <div className="cbt__selects">
                  <input
                    type="radio"
                    defaultChecked={
                      testState.selectedValue ===
                      `${testState.questionAll[testState.nowQuestionsNum].number}_1`
                    }
                    id={`select${testState.questionAll[testState.nowQuestionsNum].number}_1`}
                    name={`select${testState.questionAll[testState.nowQuestionsNum].number}`}
                    value={`${testState.questionAll[testState.nowQuestionsNum].number}_1`}
                  />
                  <label
                    htmlFor={`select${testState.questionAll[testState.nowQuestionsNum].number}_1`}
                  >
                    {realAnswerOmr[testState.nowQuestionsNum] === 1 ? (
                      <img src={correctlyImg} id="correctlyImg" />
                    ) : null}
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
                    defaultChecked={
                      testState.selectedValue ===
                      `${testState.questionAll[testState.nowQuestionsNum].number}_2`
                    }
                    id={`select${testState.questionAll[testState.nowQuestionsNum].number}_2`}
                    name={`select${testState.questionAll[testState.nowQuestionsNum].number}`}
                    value={`${testState.questionAll[testState.nowQuestionsNum].number}_2`}
                  />
                  <label
                    htmlFor={`select${testState.questionAll[testState.nowQuestionsNum].number}_2`}
                  >
                    {realAnswerOmr[testState.nowQuestionsNum] === 2 ? (
                      <img src={correctlyImg} id="correctlyImg" />
                    ) : null}
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
                    defaultChecked={
                      testState.selectedValue ===
                      `${testState.questionAll[testState.nowQuestionsNum].number}_3`
                    }
                    id={`select${testState.questionAll[testState.nowQuestionsNum].number}_3`}
                    name={`select${testState.questionAll[testState.nowQuestionsNum].number}`}
                    value={`${testState.questionAll[testState.nowQuestionsNum].number}_3`}
                  />
                  <label
                    htmlFor={`select${testState.questionAll[testState.nowQuestionsNum].number}_3`}
                  >
                    {realAnswerOmr[testState.nowQuestionsNum] == 3 ? (
                      <img src={correctlyImg} id="correctlyImg" />
                    ) : null}

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
                    defaultChecked={
                      testState.selectedValue ===
                      `${testState.questionAll[testState.nowQuestionsNum].number}_4`
                    }
                    id={`select${testState.questionAll[testState.nowQuestionsNum].number}_4`}
                    name={`select${testState.questionAll[testState.nowQuestionsNum].number}`}
                    value={`${testState.questionAll[testState.nowQuestionsNum].number}_4`}
                  />
                  <label
                    htmlFor={`select${testState.questionAll[testState.nowQuestionsNum].number}_4`}
                  >
                    {realAnswerOmr[testState.nowQuestionsNum] === 4 ? (
                      <img src={correctlyImg} id="correctlyImg" />
                    ) : null}
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
                    defaultChecked={
                      testState.selectedValue ===
                      `${testState.questionAll[testState.nowQuestionsNum].number}_5`
                    }
                    id={`select${testState.questionAll[testState.nowQuestionsNum].number}_5`}
                    name={`select${testState.questionAll[testState.nowQuestionsNum].number}`}
                    value={`${testState.questionAll[testState.nowQuestionsNum].number}_5`}
                  />
                  <label
                    htmlFor={`select${testState.questionAll[testState.nowQuestionsNum].number}_5`}
                  >
                    {realAnswerOmr[testState.nowQuestionsNum] === 5 ? (
                      <img src={correctlyImg} id="correctlyImg" />
                    ) : null}

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
            </div>
          ) : (
            console.log("로딩중")
          )}
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

export default NoteQuestion;
