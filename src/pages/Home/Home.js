import styled from "@emotion/styled";
import {
  AA_SERVER_URL,
  ATPT_OFCDC_SC_CODE,
  KEY,
  MLSV_SERVER_URL,
  SD_SCHUL_CODE,
} from "api/config";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getCookie } from "utils/cookie";
import "../../scss/main/home.css";
import LoginUser from "./LoginUser";
import MainSchedule from "./MainSchedule";

const HomeStyle = styled.div``;
const Home = () => {
  const navigate = useNavigate();
  const [menuArr, setMenuArr] = useState([""]);
  const today = moment().format("YYYYMMDD");
  const fromMmd = moment().format("YYYYMM01");
  const toYmd = moment().format("YYYYMM" + { last });
  const mlsvDay = moment().format("YY년 M월 D일");
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = week[moment().day()].concat("요일");
  const [aaArr, setAaArr] = useState([]);
  // const aaArr = [];

  var last = new Date(2024, 7, 0).getDate();
  // console.log("말일 : ", last);

  useEffect(() => {
    const url = `${MLSV_SERVER_URL}?ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&KEY=${KEY}&MLSV_YMD=${today}&TYPE=JSON`;
    // const url = `${MLSV_SERVER_URL}?ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&KEY=${KEY}&MLSV_YMD=20240707&TYPE=JSON`;
    axios.get(url).then(res => {
      // 급식 데이터가 있는 없는지 확인
      if (res.data.mealServiceDietInfo) {
        // INFO-000
        const menu = res.data.mealServiceDietInfo[1].row[0].DDISH_NM;
        /** <br/>와  (숫자.숫자) 제거 정규 표현식 */
        setMenuArr(
          menu
            .replace(/<br\s*\/?>|\([^)]*\)/gi, "")
            .split(/\s+/)
            .filter(item => item !== ""),
        );
      } else {
        // INFO-200
        setMenuArr(["오늘은 급식이 없습니다."]);
      }
    });
  }, []);

  /** 학사 일정 */
  useEffect(() => {
    const url = `${AA_SERVER_URL}?ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&KEY=${KEY}&AA_FROM_YMD=${fromMmd}&AA_TO_YMD=${toYmd}&TYPE=JSON`;
    // const url = `${AA_SERVER_URL}?ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&KEY=${KEY}&TYPE=JSON`;

    axios.get(url).then(async res => {
      // 급식 데이터가 있는 없는지 확인
      const resArr = res.data.SchoolSchedule[1].row;
      resArr.map((item, index) => {
        // aaArr.push(item.AA_YMD);
        setAaArr([...aaArr, item.AA_YMD]);
        // console.log("학사 일정 : ", resArr[index].AA_YMD);
        // console.log("학사 일정 item : ", item.AA_YMD);
        // console.log("학사 일정 item : ", aaArr);
      });
    });
  }, []);

  useEffect(() => {
    // console.log("학사 일정 item : ", aaArr);
  }, [aaArr]);

  useEffect(() => {
    // console.log("오늘의 메뉴 확인 : ", menuArr);
  }, [menuArr]);
  const moveLoginPage = () => {
    navigate("/login");
  };
  const moveSingupPage = () => {
    navigate("/signup");
  };

  return (
    <HomeStyle>
      {getCookie("accessToken") ? <LoginUser /> : null}

      <div className="main">
        <div className="main-inner">
          <div className="main-inner-class">
            <div className="main-schedule">
              <div className="main-schedule-title main-contents-title">
                <div className="main-schedule-title-text ">학교 일정</div>
              </div>
              <div className="main-title-dwon-contents main-schedule-calendar">
                <MainSchedule aaArr={aaArr} />
              </div>
            </div>
            <div className="main-activity">
              <div className="main-activity-title main-contents-title">
                <div className="main-schedule-title-text">우리들 활동</div>
              </div>
              <div className="main-title-dwon-contents main-activity-slide"></div>
            </div>
          </div>
          {/* 메인 오른쪽 영역 - start */}
          <div className="main-inner-info">
            {/* 내 정보 - start */}
            {!getCookie("accessToken") ? (
              <div className="main-login-user-info">
                {/* <div className="main-schedule-title main-contents-title">
                <div className="main-schedule-title-text">학교 일정</div>
              </div> */}
                <div className="main-inner-info-login">
                  <div className="login-inner">
                    <button
                      className="main-info-loginbt"
                      onClick={() => {
                        moveLoginPage();
                      }}
                    >
                      로그인 해주세요
                    </button>
                    <div className="main-info-login-menu">
                      <div
                        className="id-inquiry-page-move
                      "
                      >
                        아이디 찾기
                      </div>
                      <div className="pw-inquiry-page-move">비밀번호 찾기</div>
                      <div
                        className="signup-page-move"
                        onClick={() => {
                          moveSingupPage();
                        }}
                      >
                        회원가입
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {/* <div className="main-login-user-info no-display "> */}

            {/* 추후 수정 */}
            <div className="main-info-lunch ">
              <div className="main-activity-title main-contents-title main-info-lunch-title ">
                <div className="main-schedule-title-text">오늘의 급식</div>
              </div>
              <div className="main-title-dwon-contents main-info-lunch-menu">
                <div className="lunch-today-day">
                  <p className="text-wrapper">{mlsvDay}</p>
                  <p className="text-wrapper">{dayOfWeek}</p>
                </div>
                <div className="lunch-today-menu">
                  {menuArr.map((item, index) => (
                    <p className="text-wrapper" key={index}>
                      {item}
                    </p>
                  ))}
                  {/* <p className="text-wrapper">꽃맛살 겨자냉채</p>
                  <p className="text-wrapper">후르츠탕수육</p>
                  <br></br>
                  <p className="text-wrapper sub-menu">단무지</p>
                  <p className="text-wrapper sub-menu">배추김치</p>
                  <p className="text-wrapper sub-menu">오이냉국</p> */}
                </div>
              </div>
            </div>
          </div>
          {/* 메인 오른쪽 영역 - end */}
        </div>
      </div>
    </HomeStyle>
  );
};
export default Home;
