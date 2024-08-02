import styled from "@emotion/styled";
import React from "react";
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
import answerSelect from "./answerSelect";

const TestOmrStyle = styled.div`
  display: flex;
  flex-direction: column;

  input[type="radio"] {
    display: none;
    margin: 10px;
  }

  & > div {
    display: flex;
    flex-direction: row;
    height: 30px;
  }

  .omr-top {
    & > div {
      display: flex;
      justify-content: center;
      align-items: center;

      span,
      strong {
        font-size: 18px;
      }
    }

    & > div:first-of-type {
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

      span,
      strong {
        color: #fff;
      }
    }
  }

  .omr-box {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;

    span,
    strong {
      font-size: 18px;
    }

    .omr-box-inner {
      display: flex;
      flex-direction: row;

      /* position: absolute; */
      width: 100%;

      & > div {
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .omr-num {
        width: 15%;
        background-color: #5f909f;

        span,
        strong {
          color: #fff;
        }
      }
      .omr-select {
        justify-content: space-evenly;
        width: 90%;
        background-color: #add2d8;

        label {
          svg {
            font-size: 20px;
          }
        }
      }
    }
  }
`;

const TestOmr = () => {
  const dispatch = useDispatch();
  const testState = useSelector(state => state.testSlice);

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
        {testState.questionAll.map((item, index) => (
          <div className="omr-box-inner" key={index}>
            <div className="omr-num">
              <strong>{item.number}</strong>
            </div>
            <div className="omr-select">
              <input
                type="radio"
                checked={testState.selectedValue === `${item.number}_1`}
                id={`omr${item.number}_1`}
                name={`omr${item.number}`}
                value={`${item.number}_1`}
                onChange={e => {
                  answerSelect(e, dispatch, testState);
                }} // onChange 핸들러 추가
              />
              <label htmlFor={`omr${item.number}_1`}>
                {testState.selectNumArr[index].selectNum === 1 ? (
                  <PiNumberCircleOneFill />
                ) : (
                  <PiNumberCircleOneBold />
                )}
                <span className="label-inner"></span>
              </label>
              <input
                type="radio"
                checked={testState.selectedValue === `${item.number}_2`}
                id={`omr${item.number}_2`}
                name={`omr${item.number}`}
                value={`${item.number}_2`}
                onChange={e => {
                  answerSelect(e, dispatch, testState);
                }} // onChange 핸들러 추가
              />
              <label htmlFor={`omr${item.number}_2`}>
                {testState.selectNumArr[index].selectNum === 2 ? (
                  <PiNumberCircleTwoFill />
                ) : (
                  <PiNumberCircleTwoBold />
                )}
                <span className="label-inner"></span>
              </label>
              <input
                type="radio"
                checked={testState.selectedValue === `${item.number}_3`}
                id={`omr${item.number}_3`}
                name={`omr${item.number}`}
                value={`${item.number}_3`}
                onChange={e => {
                  answerSelect(e, dispatch, testState);
                }} // onChange 핸들러 추가
              />
              <label htmlFor={`omr${item.number}_3`}>
                {testState.selectNumArr[index].selectNum === 3 ? (
                  <PiNumberCircleThreeFill />
                ) : (
                  <PiNumberCircleThreeBold />
                )}
                <span className="label-inner"></span>
              </label>
              <input
                type="radio"
                checked={testState.selectedValue === `${item.number}_4`}
                id={`omr${item.number}_4`}
                name={`omr${item.number}`}
                value={`${item.number}_4`}
                onChange={e => {
                  answerSelect(e, dispatch, testState);
                }} // onChange 핸들러 추가
              />
              <label htmlFor={`omr${item.number}_4`}>
                {testState.selectNumArr[index].selectNum === 4 ? (
                  <PiNumberCircleFourFill />
                ) : (
                  <PiNumberCircleFourBold />
                )}

                <span className="label-inner"></span>
              </label>
              <input
                type="radio"
                checked={testState.selectedValue === `${item.number}_5`}
                id={`omr${item.number}_5`}
                name={`omr${item.number}`}
                value={`${item.number}_5`}
                onChange={e => {
                  answerSelect(e, dispatch, testState);
                }} // onChange 핸들러 추가
              />
              <label htmlFor={`omr${item.number}_5`}>
                {testState.selectNumArr[index].selectNum === 5 ? (
                  <PiNumberCircleFiveFill />
                ) : (
                  <PiNumberCircleFiveBold />
                )}

                <span className="label-inner"></span>
              </label>
            </div>
          </div>
        ))}
      </div>
    </TestOmrStyle>
  );
};

export default TestOmr;
