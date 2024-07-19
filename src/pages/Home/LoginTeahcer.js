import styled from "@emotion/styled";
import { getRecentNoticeInfo } from "api/teacher/teacherapi";
import { useEffect, useState } from "react";

import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router";
import { getCookie, removeCookie } from "utils/cookie";
import ClassNotice from "./ClassNotice";
import ClassSchedule from "./ClassSchedule";
import { useDispatch } from "react-redux";

const LoginTeahcerStyle = styled.div``;

const LoginTeahcer = () => {
  // 나중에 : api 수정 후

  const navigate = useNavigate();
  const [createdAt, setCreatedAt] = useState();

  /** 반 시간표 */

  /** 마이페이지 이동 */
  const moveMyPage = () => {
    navigate("/teacherinfo");
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
    removeCookie("userClass");
    removeCookie("userName");
    removeCookie("userEmail");

    removeCookie("timerMin");
    removeCookie("timerSec");
    removeCookie("timerTime");
    window.location.reload("/");
  };

  // const getNotice = async noticeMenuNum => {
  //   const res = await getRecentNoticeInfo(noticeMenuNum);

  //   setCreatedAt(res.createdAt);
  //   console.log("결과값 : ", res);
  // };

  // /** 최초 랜더링 : 알림장 불러오기 */
  // useEffect(() => {
  //   getNotice(noticeMenuNum);
  // }, [noticeMenuNum]);

  return (
    <LoginTeahcerStyle>
      <div className="access-login-main main access-teahcer-main">
        <div className="access-login-main-inner">
          <h1 className="access-login-title">우리 학급</h1>
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
                  <div className="main-notice-day">{createdAt}</div>
                </div>
                <div className="main-title-dwon-contents">
                  <ClassNotice setCreatedAt={setCreatedAt} />
                </div>
              </div>
            </div>
            <div className="main-inner-info main-inner-info-teahcer">
              <div className="main-login-user-info">
                {/* <div className="main-schedule-title main-contents-title">
                    <div className="main-schedule-title-text">학교 일정</div>
                     </div> */}
                <div className="main-inner-info-login ">
                  <div className="login-inner">
                    <div className="login-user-info">
                      <div className="login-user-info-div login-teahcer-info-div">
                        <div className="login-user-info-label-box login-teahcer-info-label-box">
                          <div className="login-user-info-label">이름</div>
                          <div className="login-user-info-label">담당 학급</div>
                          <div className="login-user-info-label">이메일</div>
                        </div>
                        <div className="login-user-info-label-box login-teahcer-info-label-box">
                          <div className="login-user-info-text">
                            {getCookie("userName")}
                          </div>
                          <div className="login-user-info-text">
                            {getCookie("userClass") ? (
                              getCookie("userClass")
                            ) : (
                              <div className="home-my-info-no-style">미정</div>
                            )}
                          </div>
                          <div className="login-user-info-text">
                            {getCookie("userEmail")}
                          </div>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoginTeahcerStyle>
  );
};

export default LoginTeahcer;
