import styled from "@emotion/styled";
import "../../scss/main/home.css";
import "../../scss/main/mainlogin.css";

import React from "react";
import ClassSchedule from "./ClassSchedule";
import ClassNotice from "./ClassNotice";

const LoginUserStyle = styled.div``;

const LoginUser = () => {
  return (
    <LoginUserStyle>
      <div className="main">
        <h1>5학년 7반</h1>
        <div className="main-inner">
          <div className="main-inner-class login-user-view">
            <div className="main-schedule main-class-schedule">
              <div className="main-schedule-title main-contents-title">
                <div className="main-schedule-title-text ">우리반 시간표</div>
              </div>
              <div className="main-title-dwon-contents main-schedule-calendar">
                <ClassSchedule />
              </div>
            </div>

            <div className="main-notice">
              <div className="main-schedule-title main-contents-title">
                <div className="main-schedule-title-text ">알림장</div>
                {/* 알림장 날짜 받아오는 것으로 추후 수정 */}
                <div className="main-notice-day">2024.06.25</div>
              </div>
              <div className="main-title-dwon-contents">
                <ClassNotice />
              </div>
            </div>
          </div>

          <div className="main-inner-info">
            <div className="main-login-user-info">
              {/* <div className="main-schedule-title main-contents-title">
                <div className="main-schedule-title-text">학교 일정</div>
              </div> */}
              <div className="main-inner-info-login">
                <div className="login-inner">
                  <div className="login-user-info">
                    <div className="login-user-pic"></div>
                    <div className="login-user-info-div">
                      <div className="login-user-info-label-box">
                        <div className="login-user-info-label">학생 이름</div>
                        <div className="login-user-info-label">나이</div>
                        <div className="login-user-info-label">학급</div>
                        <div className="login-user-info-label">선생님 성함</div>
                      </div>
                      <div className="login-user-info-label-box">
                        <div className="login-user-info-text">김그린</div>
                        <div className="login-user-info-text">만 11세</div>
                        <div className="login-user-info-text">5학년 7반</div>
                        <div className="login-user-info-text">황준하</div>
                      </div>
                    </div>
                    <div className="logout-icon"></div>
                  </div>

                  <div className="login-user-btn">
                    <button className="subject-grade-btn">과목별 성적</button>
                    <button className="my-page-btn">마이페이지</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoginUserStyle>
  );
};

export default LoginUser;
