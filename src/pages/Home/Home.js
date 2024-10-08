import styled from "@emotion/styled";
import {
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
import MainSchedule from "./calendar/MainSchedule";
import LoginTeahcer from "./LoginTeahcer";
// import { ActivityPhotos } from "./ActivityPhotos";
import { useDispatch } from "react-redux";
import { startTimer } from "slices/timerSlice";
import RandomAdZone from "./popup/RandomAdZone";
import { ActivityPhotos } from "./poto/ActivityPhotos";

const Home = () => {
  const HomeStyle = styled.div`
    /* width: 1180px; */
    /* width: 100vw; */
    min-height: calc(100vh - 281px);
    position: relative;
    /* left: -40px; */
    /* display: flex; */
    /* flex-direction: column; */
    gap: 60px;
    top: -40px;
    background-color: ${getCookie("accessToken") ? "#FBFAF9" : "#fbfaf9"};
    padding-bottom: 60px;
    padding-top: 40px;
    background-clip: content-box;
  `;

  const navigate = useNavigate();
  const [menuArr, setMenuArr] = useState([""]);
  const today = moment().format("20240701");
  const mlsvDay = moment().format("YY년 M월 D일");
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = week[moment().day()].concat("요일");

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

  useEffect(() => {
    const accessToken = getCookie("accessToken");

    // console.log("토큰 상태 : ", accessToken);
  }, []);

  // 어드민의 경우
  const [loginUserType, setLoginUserType] = useState(getCookie("userRole"));
  useEffect(() => {
    if (loginUserType === "ROLE_ADMIN") {
      navigate("/admin/home");
    }
  }, []);

  const moveLoginPage = () => {
    navigate("/login");
  };

  const moveFindIdPage = () => {
    navigate("/findid");
  };
  const moveFindPwPage = () => {
    navigate("/findpass");
  };

  const moveSingupPage = () => {
    navigate("/signup");
  };

  return (
    <HomeStyle>
      {loginUserType === "ROLE_PARENTS" ? <LoginUser /> : null}
      {loginUserType === "ROLE_TEACHER" ? <LoginTeahcer /> : null}

      <div
        className={getCookie("accessToken") ? "access-login-main main" : "main"}
      >
        <div className="main-inner">
          <div className="main-inner-class">
            {loginUserType === "ROLE_PARENTS" ? null : (
              <div className="main-schedule">
                <>
                  <div className="main-schedule-title main-contents-title">
                    <div className="main-schedule-title-text ">학교 일정</div>
                  </div>
                  <div className="main-title-dwon-contents main-schedule-calendar">
                    <MainSchedule />
                  </div>
                </>
              </div>
            )}
            {/*우리들의 활동 영역 */}
            <ActivityPhotos />
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
                        className="id-inquiry-page-move"
                        onClick={() => {
                          moveFindIdPage();
                        }}
                      >
                        아이디 찾기
                      </div>
                      <div
                        className="pw-inquiry-page-move"
                        onClick={() => {
                          moveFindPwPage();
                        }}
                      >
                        비밀번호 찾기
                      </div>
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

            {/* 급식 영역 start */}
            <div className="main-info-lunch">
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
            {/* 급식 영역 end */}

            {/* 랜덤 영역 */}
            <RandomAdZone />
          </div>
          {/* 메인 오른쪽 영역 - end */}
        </div>
      </div>
    </HomeStyle>
  );
};
export default Home;
