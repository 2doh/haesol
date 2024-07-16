import styled from "@emotion/styled";
import { getRecentNoticeInfo } from "api/teacher/teacherapi";
import { useEffect } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router";
import { getCookie, removeCookie } from "utils/cookie";
import ClassNotice from "./ClassNotice";
import ClassSchedule from "./ClassSchedule";

const LoginTeahcerStyle = styled.div`
  // 교직원 - 메인
  /* .main-inner-info-teahcer {
    .login-inner {
      .login-teahcer-info-div {
        width: 100%;
        gap: 25px;

        .login-teahcer-info-label-box {
          gap: 5px;
        }

        .login-teahcer-info-label-box:first-child {
          text-align: right;
        }
      }
    }
  } */
`;

const LoginTeahcer = () => {
  // 나중에 : api 수정 후

  const navigate = useNavigate();

  /** 반 시간표 */

  // 수정중
  /** 알림장 불러오기 */
  useEffect(() => {
    getRecentNoticeInfo();
  }, []);

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
    window.location.reload("/");
  };

  return (
    <LoginTeahcerStyle>
      <div className="access-login-main main access-teahcer-main">
        <div className="access-login-main-inner ">
          <h1>우리 학급</h1>
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
                  <div className="main-notice-day">(날짜넣기)</div>
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
                <div className="main-inner-info-login main-inner-info-teahcer">
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
