import styled from "@emotion/styled";
import {
  PiNumberCircleFiveDuotone,
  PiNumberCircleFiveFill,
  PiNumberCircleFourDuotone,
  PiNumberCircleFourFill,
  PiNumberCircleOneDuotone,
  PiNumberCircleOneFill,
  PiNumberCircleThreeDuotone,
  PiNumberCircleThreeFill,
  PiNumberCircleTwoDuotone,
  PiNumberCircleTwoFill,
} from "react-icons/pi";

import { useDispatch, useSelector } from "react-redux";
import { openModal, updateModalDate } from "slices/modalSlice";
import { updateTestDate } from "slices/testSlice";
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
        /* height: 30px; */
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .omr-num {
        cursor: pointer;
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
            font-size: 22px;
          }
        }

        .circle-duotone {
          svg {
            path:first-of-type {
              color: white;
              opacity: 1;
            }
          }
        }
      }
    }
  }
`;

const TestOmr = () => {
  const dispatch = useDispatch();
  const testState = useSelector(state => state.testSlice);

  /** 문제 빠르게 이동하기 */
  const questionsNumChange = num => {
    const data = {
      nowQuestionsNum: num,
    };
    dispatch(updateTestDate(data));
  };

  /** 현재 페이지 번호와 체크한 문제 번호 체크 */
  const questionsNumCheck = (e, num) => {
    if (num === testState.nowQuestionsNum) {
      // console.log("일치 한다");
      answerSelect(e, dispatch, testState);
    } else {
      const data = {
        headerText: "주의",
        bodyText: ["현재 페이지의 문제만 체크 할 수 있습니다."],
        buttonCnt: 1,
        buttonText: ["확인"],
        modalRes: [1],
      };

      dispatch(updateModalDate(data));
      dispatch(openModal("BasicModal"));
    }
  };

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
            <div className="omr-num" onClick={() => questionsNumChange(index)}>
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
                  questionsNumCheck(e, index);
                }}
              />
              <label
                htmlFor={`omr${item.number}_1`}
                // onClick={() => questionsNumCheck(index)}
              >
                {testState.selectNumArr[index].selectNum === 1 ? (
                  <div className="circle-fill">
                    <PiNumberCircleOneFill />
                  </div>
                ) : (
                  <div className="circle-duotone">
                    <PiNumberCircleOneDuotone />
                  </div>
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
                  questionsNumCheck(e, index);
                }} // onChange 핸들러 추가
              />
              <label htmlFor={`omr${item.number}_2`}>
                {testState.selectNumArr[index].selectNum === 2 ? (
                  <div className="circle-fill">
                    <PiNumberCircleTwoFill />
                  </div>
                ) : (
                  <div className="circle-duotone">
                    <PiNumberCircleTwoDuotone />
                  </div>
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
                  questionsNumCheck(e, index);
                }} // onChange 핸들러 추가
              />
              <label htmlFor={`omr${item.number}_3`}>
                {testState.selectNumArr[index].selectNum === 3 ? (
                  <div className="circle-fill">
                    <PiNumberCircleThreeFill />
                  </div>
                ) : (
                  <div className="circle-duotone">
                    <PiNumberCircleThreeDuotone />
                  </div>
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
                  questionsNumCheck(e, index);
                }} // onChange 핸들러 추가
              />
              <label htmlFor={`omr${item.number}_4`}>
                {testState.selectNumArr[index].selectNum === 4 ? (
                  <div className="circle-fill">
                    <PiNumberCircleFourFill />
                  </div>
                ) : (
                  <div className="circle-duotone">
                    <PiNumberCircleFourDuotone />
                  </div>
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
                  questionsNumCheck(e, index);
                }} // onChange 핸들러 추가
              />
              <label htmlFor={`omr${item.number}_5`}>
                {testState.selectNumArr[index].selectNum === 5 ? (
                  <div className="circle-fill">
                    <PiNumberCircleFiveFill />
                  </div>
                ) : (
                  <div className="circle-duotone">
                    <PiNumberCircleFiveDuotone />
                  </div>
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
