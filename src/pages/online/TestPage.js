import styled from "@emotion/styled";
import GreenHeaderNoOption from "components/layout/header/GreenHeaderNoOption";
import TestTitle from "./onlinetest/TestTitle";
import TestQuestion from "./onlinetest/TestQuestion";
import TestAnswer from "./onlinetest/TestAnswer";
import { useEffect, useState } from "react";
import usePreventRefresh from "hooks/common/usePreventRefresh";
import usePreventGoBack from "hooks/common/usePreventGoBack";
import { useLocation, useNavigate } from "react-router";

const TestWrap = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100vh - 70px);

  .test-page {
    width: 1180px;
    height: 100%;
    background-color: #f3f9fa;
    margin: 0 auto;
    min-width: 440px;

    .test-page-inner {
      width: 100%;
      height: calc(100% - 60px);
      display: flex;
      flex-direction: row;

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

  @media screen and (max-width: 1180px) {
    .test-page {
      width: auto;
      .test-page-inner {
        display: flex;
        flex-direction: column;

        & > div:first-of-type {
          min-width: auto;
          width: 100%;
          max-width: none;
        }
      }
    }
  }
`;

const TestPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const subjectsNum = location.state?.subjectsNum;
  const subjectsName = location.state?.subjectsName;
  const testName = location.state?.testName;

  /** 받은 과목 번호 */
  useEffect(() => {
    if (!subjectsNum || !subjectsName) {
      // console.log("데이터 없음. 처리하기");
      console.log("subjectsNum : ", subjectsNum);
      console.log("subjectsName : ", subjectsName);
      console.log("testName : ", testName);
      navigate("/");
    } else {
      console.log("subjectsNum : ", subjectsNum);
      console.log("subjectsName : ", subjectsName);
      console.log("testName : ", testName);
      // console.log("데이터 있음. ");
    }
  }, [subjectsNum, subjectsName]);

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
          <TestTitle subjectsName={subjectsName} testName={testName} />
          <div className="test-page-inner">
            {/* <TestQuestion subjects={subjects} /> */}
            <TestQuestion subjects={subjectsNum} testName={testName} />
            <TestAnswer />
          </div>
        </div>
      </TestWrap>
    </>
  );
};

export default TestPage;
