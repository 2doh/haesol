import styled from "@emotion/styled";
import GreenHeaderNoOption from "components/layout/header/GreenHeaderNoOption";
import TestTitle from "./TestTitle";
import TestQuestion from "./TestQuestion";
import TestAnswer from "./TestAnswer";
import { useEffect, useState } from "react";
import usePreventRefresh from "hooks/common/usePreventRefresh";
import usePreventGoBack from "hooks/common/usePreventGoBack";

const TestWrap = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100vh - 70px);

  .test-page {
    width: 1180px;
    height: 100%;
    background-color: #f3f9fa;
    margin: 0 auto;

    .test-page-inner {
      width: 100%;
      height: calc(100% - 60px);
      display: flex;
      flex-direction: row;

      & > div:first-child {
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

  @media screen and (max-width: $tablet-screen) {
  // .calendar-and-meals-wrap {
  //   width: 100%;
  //   display: flex;

  //   gap: 20px;
  //   max-height: 450px;

  //   .calendar-wrap {
  //     min-width: 810px;
  //     background-color: #dee8e9;
  //     border-radius: 30px;
  //     padding: 30px;
  //   }

  //   .lunch-wrap {
  //     width: 100%;
  //   }
  // }

  .calendar-and-meals-wrap {
    display: flex;
    flex-direction: column;
    max-height: auto;

    background-color: red;
  }
}

`;

const TestPage = () => {
  /** 저장하면 */
  const [alertMessage, setAlertMessage] = useState(
    "저장하기 또는 제출하기 버튼을 눌러주세요.",
  );

  usePreventRefresh();
  usePreventGoBack(alertMessage);

  return (
    <>
      <GreenHeaderNoOption />
      <TestWrap>
        <div className="test-page">
          <TestTitle />
          <div className="test-page-inner">
            <TestQuestion />
            <TestAnswer />
          </div>
        </div>
      </TestWrap>
    </>
  );
};

export default TestPage;
