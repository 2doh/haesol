import styled from "@emotion/styled";
import { MdOutlineLogout } from "react-icons/md";
import "../../scss/main/mainlogin.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import ClassNotice from "./ClassNotice";
import ClassSchedule from "./ClassSchedule";
import { getCookie, removeCookie } from "utils/cookie";
const LoginUserStyle = styled.div``;
const LoginUser = () => {
  const navigate = useNavigate();

  const [loginUserType, setLoginUserType] = useState(getCookie("userRole"));
  // ROLE_ADMIN = 어드민;
  // ROLE_TEAHCER = 교직원;
  // ROLE_PARENTS = 학부모;
  useEffect(() => {
    console.log("권한 저장 확인 : ", loginUserType);

    // const [loginUserType, setLoginUserType] = useState("ROLE_ADMIN");
    if (loginUserType === "ROLE_ADMIN") navigate("/admin/home");
  }, []);

  // 더미 데이터
  const loginUserInfo = {
    pic: "",
    classNum: "5학년 8반",
    noticeDay: "2024.06.25",
    name: "김그린",
    age: "만 11세",
    teacherName: "김그린",
    teacherEmail: "green@naver.com",
  };
  const splitEmail = loginUserInfo.teacherEmail.split("@");

  /** 반 시간표 */

  /** 마이페이지 이동 */
  const moveMyPage = () => {
    if (loginUserType === "ROLE_TEAHCER") navigate("/teacherinfo");
    if (loginUserType === "ROLE_PARENTS") navigate("/studentinfo");
  };

  /** 성적 확인 페이지 이동 */
  const moveMyGradePage = () => {
    // 아래의 부분에 학생 PK 등록 예정
    const stPk = 4;
    // navigate("/grade/1");
    navigate(`/grade/${stPk}`);
  };

  /** 우리 학급 페이지 이동 */
  const moveMyStudentsPage = () => {
    navigate("/students");
  };

  /** 로그아웃 기능 */
  const logout = () => {
    removeCookie("accessToken");
    removeCookie("userIdPk");
    removeCookie("userRole");

    window.location.reload("/");
  };

  return (
    <LoginUserStyle>
      <div className="main">
        <h1>{getCookie("userClass")}</h1>
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
                        {/* 프로필 라벨 영역 start */}
                        {loginUserType === "ROLE_PARENTS" ? (
                          // 학부모의 경우
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
                          // 교직원의 경우
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
                        {/* 프로필 라벨 영역 end */}
                      </div>
                      <div className="login-user-info-label-box">
                        {/* 프로필 정보 영역 start */}
                        {loginUserType === "ROLE_PARENTS" ? (
                          // 학부모의 경우
                          <>
                            <div className="login-user-info-text">
                              {loginUserInfo.name}
                            </div>
                            <div className="login-user-info-text">
                              {loginUserInfo.age}
                            </div>
                            <div className="login-user-info-text">
                              {loginUserInfo.classNum === "" ||
                              loginUserInfo.classNum === null ? (
                                <div className="home-my-info-no-style">
                                  미정
                                </div>
                              ) : (
                                loginUserInfo.classNum
                              )}
                            </div>
                            <div className="login-user-info-text">
                              {loginUserInfo.teacherName === "" ||
                              loginUserInfo.teacherName === null ? (
                                <div className="home-my-info-no-style">
                                  미정
                                </div>
                              ) : (
                                loginUserInfo.teacherName
                              )}
                            </div>
                          </>
                        ) : (
                          // 교직원의 경우
                          <>
                            <div className="login-user-info-text">
                              {getCookie("userName")}
                            </div>
                            {/* <div className="login-user-info-text">
                              {loginUserInfo.classNum}
                            </div> */}
                            <div className="login-user-info-text">
                              {getCookie("userEmail").split("@")[0]}
                              <br />
                              {"@" + getCookie("userEmail").split("@")[1]}
                            </div>
                          </>
                        )}
                        {/* 프로필 정보 영역 end */}
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
                  {/* 프로필 버튼 영역 start */}
                  <div className="login-user-btn">
                    {loginUserType === "ROLE_PARENTS" ? (
                      <button
                        className="subject-grade-btn"
                        onClick={() => {
                          moveMyGradePage();
                        }}
                      >
                        과목별 성적
                      </button>
                    ) : (
                      <button
                        className="subject-grade-btn"
                        onClick={() => {
                          moveMyStudentsPage();
                        }}
                      >
                        우리 학급 바로가기
                      </button>
                    )}
                    <button
                      className="my-page-btn"
                      onClick={() => {
                        moveMyPage();
                      }}
                    >
                      마이페이지
                    </button>
                  </div>
                  {/* 프로필 버튼 영역 end */}
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
