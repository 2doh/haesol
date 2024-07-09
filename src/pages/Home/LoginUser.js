import styled from "@emotion/styled";
import { MdOutlineLogout } from "react-icons/md";
import "../../scss/main/mainlogin.css";

import {
  getStudentInfo,
  getStudentInfo2,
  getTeacherInfo,
} from "api/teacher/teacherapi";
import { useState } from "react";
import { useNavigate } from "react-router";
import { removeCookie } from "utils/cookie";
import ClassNotice from "./ClassNotice";
import ClassSchedule from "./ClassSchedule";

const LoginUserStyle = styled.div``;

const LoginUser = () => {
  const navigate = useNavigate();

  getTeacherInfo();
  getStudentInfo2(2);

  // 학부모 : 1, 교직원 : 2
  const [loginUserType, setLoginUserType] = useState(2);

  // 아래 데이터 추후 데이터베이스 정보로 변경
  /** 로그인한 유저 정보 출력 */
  const loginUserInfo = {
    pic: "",
    classNum: "5학년 8반",
    noticeDay: "2024.06.25",
    name: "김그린",
    age: "만 11세",
    teacherName: "김그린",
    teacherEmail: "green@naver.com",
  };

  // const teacherEmail = "green@naver.com";
  const splitEmail = loginUserInfo.teacherEmail.split("@");

  /** 반 시간표 */
  // const lgoinUserSchedule

  /** 마이페이지 이동 */
  const moveMyPage = () => {
    if (loginUserType === 1) navigate("/students/edit");
    if (loginUserType === 2) navigate("/teacher/edit");
  };

  /** 성적 확인 페이지 이동 */
  const moveMyGradePage = () => {
    navigate("/grade/1");
  };

  /** 우리 학급 페이지 이동 */
  const moveMyStudentsPage = () => {
    navigate("/students");
  };

  /** 로그아웃 기능 */
  const logout = () => {
    // navigate("/login");
    // console.log("로그아웃 되었다.");
    removeCookie("accessToken");
    navigate("/");
  };

  return (
    <LoginUserStyle>
      <div className="main">
        <h1>{loginUserInfo.classNum}</h1>
        <div className="main-inner">
          <div className="main-inner-class login-user-view">
            <div className="main-schedule main-class-schedule">
              <div className="main-schedule-title main-contents-title">
                <div className="main-schedule-title-text ">
                  우리반 시간표 (수정중)
                </div>
              </div>
              <div className="main-title-dwon-contents main-schedule-calendar">
                <ClassSchedule />
              </div>
            </div>

            <div className="main-notice">
              <div className="main-schedule-title main-contents-title">
                <div className="main-schedule-title-text ">알림장</div>
                {/* 알림장 날짜 받아오는 것으로 추후 수정 */}
                <div className="main-notice-day">{loginUserInfo.noticeDay}</div>
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
                    <div className="login-user-pic">{loginUserInfo.pi}</div>
                    <div className="login-user-info-div">
                      <div className="login-user-info-label-box">
                        {loginUserType === 1 ? (
                          <>
                            <div className="login-user-info-label">
                              학생 이름
                            </div>
                            <div className="login-user-info-label">나이</div>
                            <div className="login-user-info-label">학급</div>
                            <div className="login-user-info-label">
                              선생님 성함
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="login-user-info-label">이름</div>
                            {/* <div className="login-user-info-label">
                              담당 학급
                            </div> */}
                            <div className="login-user-info-label">
                              이메일
                              <br />
                              <br />
                            </div>
                          </>
                        )}
                      </div>
                      <div className="login-user-info-label-box">
                        {loginUserType === 1 ? (
                          <>
                            <div className="login-user-info-text">
                              {loginUserInfo.name}
                            </div>
                            <div className="login-user-info-text">
                              {loginUserInfo.age}
                            </div>
                            <div className="login-user-info-text">
                              {loginUserInfo.classNum}
                            </div>
                            <div className="login-user-info-text">
                              {loginUserInfo.teacherName}
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="login-user-info-text">
                              {loginUserInfo.teacherName}
                            </div>
                            {/* <div className="login-user-info-text">
                              {loginUserInfo.classNum}
                            </div> */}
                            <div className="login-user-info-text">
                              {splitEmail[0]}
                              <br />
                              {"@" + splitEmail[1]}
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <div
                      className="logout-icon"
                      onClick={() => {
                        logout();
                      }}
                    >
                      <MdOutlineLogout size="100%" title="로그아웃" />
                    </div>
                  </div>

                  <div className="login-user-btn">
                    {loginUserType === 1 ? (
                      <>
                        <button
                          className="subject-grade-btn"
                          onClick={() => {
                            moveMyGradePage();
                          }}
                        >
                          과목별 성적
                        </button>
                        <button
                          className="my-page-btn"
                          onClick={() => {
                            moveMyPage();
                          }}
                        >
                          마이페이지
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="subject-grade-btn"
                          onClick={() => {
                            moveMyStudentsPage();
                          }}
                        >
                          우리 학급 바로가기
                        </button>
                        <button
                          className="my-page-btn"
                          onClick={() => {
                            moveMyPage();
                          }}
                        >
                          마이페이지
                        </button>
                      </>
                    )}
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
