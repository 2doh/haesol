import styled from "@emotion/styled";
import LogoutButton from "components/common/LogoutButton";
import React from "react";
import { useNavigate } from "react-router";
import { getCookie } from "utils/cookie";
const TeacherProfileStyle = styled.div`
  position: relative;
  width: 330px;
  height: 300px;

  .teacher-info-inner {
    border-radius: 10px;

    .teacher-info-text-box {
      justify-content: space-between !important;
    }
  }
`;
const TeacherProfile = () => {
  const navigate = useNavigate();
  /** 마이페이지 이동 */
  const moveMyPage = () => {
    navigate("/teacher");
  };
  /** 우리 학급 페이지 이동 */
  const moveMyStudentsPage = () => {
    navigate("/students");
  };
  return (
    <TeacherProfileStyle>
      <div className="user-info-wrap">
        <div className="user-info-inner teacher-info-inner">
          <div className="user-info">
            {/* 유저 정보 start */}
            <div className="top-user-info">
              <div className="user-info-div teacher-info-div">
                <div className="user-info-label-box teacher-info-label-box">
                  <div className="user-info-label">이름</div>
                  <div className="user-info-label">담당 학급</div>
                  <div className="user-info-label">이메일</div>
                </div>
                <div className="user-info-text-box teacher-info-text-box">
                  <div className="login-user-info-text">
                    {getCookie("userName") === "" ||
                    getCookie("userName") === null ||
                    getCookie("userName") === 0 ? (
                      <div className="no-info">미등록</div>
                    ) : (
                      getCookie("userName")
                    )}
                  </div>
                  <div className="login-user-info-text">
                    {getCookie("userGrade") === "" ||
                    getCookie("userGrade") === null ||
                    getCookie("userGrade") === 0 ||
                    getCookie("userClass") === "" ||
                    getCookie("userClass") === null ||
                    getCookie("userClass") === 0 ? (
                      <div className="no-info">미정</div>
                    ) : (
                      `${getCookie("userGrade")} 학년 
                      ${getCookie("userClass")} 반`
                    )}
                  </div>
                  <div className="login-user-info-text">
                    {getCookie("userEmail") === "" ||
                    getCookie("userEmail") === null ? (
                      <div className="no-info">미등록</div>
                    ) : (
                      getCookie("userEmail")
                    )}
                  </div>
                </div>
              </div>
              <LogoutButton />
            </div>
            {/* 유저 정보 end */}
            {/* 버튼 start */}
            <div className="bottom-user-btn">
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
            {/* 버튼 end */}
          </div>
        </div>
      </div>
    </TeacherProfileStyle>
  );
};
export default TeacherProfile;
