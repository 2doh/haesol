import GreenHeaderNoOption from "components/layout/header/GreenHeaderNoOption";
import React, { useEffect } from "react";
import TestTitle from "../onlinetest/TestTitle";
import TestQuestion from "../onlinetest/TestQuestion";
import TestAnswer from "../onlinetest/TestAnswer";
import styled from "@emotion/styled";
import { useLocation, useNavigate } from "react-router";
import testExImg from "../../../images/test-ex-img.png";
import { getOnlineTest } from "api/online/onlinetestapi";
import { useDispatch } from "react-redux";
import { openModal, updateModalDate } from "slices/modalSlice";

const TestExWrap = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100vh - 70px);

  .test-ex-page {
    width: 1180px;
    /* height: 100%; */
    background-color: #f3f9fa;
    margin: 0 auto;
    min-width: 440px;

    padding: 50px 60px;

    .test-ex-page-inner {
      width: 100%;
      /* height: 100%; */
      padding-bottom: 100px;

      .test-ex-header {
        width: 100%;
        height: 150px;
        background-color: lightblue;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .test-ex-buttons {
        width: 100%;
        /* height: 150px; */
        /* background-color: lightcoral; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .test-ex-explanation {
        width: 100%;
        min-height: calc(100% - 300px);
        /* background-color: lightcoral; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* padding: 40px 0; */

        padding-bottom: 40px;

        img {
          width: 100%;
        }
      }
    }
  }

  .button {
    position: relative;
    display: inline-block;
    margin: 20px;
    z-index: 1;
  }

  .button a {
    color: white;
    font-weight: bold;
    font-size: 36px;
    text-align: center;
    text-decoration: none;
    background-color: #ffa12b;
    display: block;
    position: relative;
    padding: 30px 80px;

    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    text-shadow: 0px 1px 0px #000;
    filter: dropshadow(color=#000, offx=0px, offy=1px);

    -webkit-box-shadow:
      inset 0 1px 0 #ffe5c4,
      0 10px 0 #915100;
    -moz-box-shadow:
      inset 0 1px 0 #ffe5c4,
      0 10px 0 #915100;
    box-shadow:
      inset 0 1px 0 #ffe5c4,
      0 10px 0 #915100;

    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  .button a:active {
    top: 10px;
    background-color: #f78900;

    -webkit-box-shadow:
      inset 0 1px 0 #ffe5c4,
      inset 0 -3px 0 #915100;
    -moz-box-shadow:
      inset 0 1px 0 #ffe5c4,
      inset 0 -3pxpx 0 #915100;
    box-shadow:
      inset 0 1px 0 #ffe5c4,
      inset 0 -3px 0 #915100;
  }

  .button:after {
    content: "";
    height: 100%;
    width: 100%;
    padding: 4px;
    position: absolute;
    bottom: -15px;
    left: -4px;
    z-index: -1;
    background-color: #2b1800;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }

  @media screen and (max-width: 1180px) {
    .test-ex-page {
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

export const TestExPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();

  // 받은 과목 번호
  const subjectsNum = location.state.subjectsNum;
  const subjectsName = location.state.subjectsName;

  /** 받은 과목 번호 */
  // useEffect(() => {
  // console.log("subjectsNum : ", subjectsNum);
  // console.log("subjectsName : ", subjectsName);
  // }, [subjectsNum, subjectsName]);

  const startTest = async subjects => {
    const data = {
      headerText: "시험명 작성",
      buttonCnt: 1,
      buttonText: ["확인"],
      modalRes: [54, subjectsNum, subjectsName],
    };

    dispatch(updateModalDate(data));
    dispatch(openModal("TestTitlelModal"));
  };

  return (
    <>
      <GreenHeaderNoOption />
      <TestExWrap>
        <div className="test-ex-page">
          <div className="test-ex-page-inner ">
            {/* <div className="test-ex-header">
              <div>{subjectsName}</div>
            </div> */}

            <div className="test-ex-explanation">
              <img src={testExImg} />
            </div>

            <div className="test-ex-buttons">
              <div
                className="button"
                onClick={() => {
                  startTest();
                }}
              >
                <a>시작하기</a>
              </div>
            </div>
          </div>
        </div>
      </TestExWrap>
    </>
  );
};
