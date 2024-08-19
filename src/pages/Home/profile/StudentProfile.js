import styled from "@emotion/styled";
import { getMyChildInfo } from "api/parents/mychildinfo";
import LogoutButton from "components/common/LogoutButton";
import React, { useEffect, useRef, useState } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router";
import { getCookie, removeCookie, setCookie } from "utils/cookie";
import ParentsChildProfile from "./ParentsChildProfile";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectChildInfo } from "slices/selectChildSlice";
import { getParentsInfo } from "api/parents/parentsapi";
import { getStudentInfo } from "api/student/studentapi";

const ParentsProfileStyle = styled.div`
  position: relative;
  width: 330px;
  height: 300px;
  perspective: 1000px;
  z-index: 99999;

  .page {
    position: absolute;
    /* background-color: #f5dec1; */
    box-shadow:
      0 0 2px rgba(0, 0, 0, 0.4),
      -2px 0 2px rgba(0, 0, 0, 0.4);
    width: 100%;
    /* height: 100%; */
  }
  #page1 {
    z-index: 1;
    transform-origin: left center;
    transition-duration: 1s;
    transition-timing-function: ease-in;
  }
  /* #page1:hover {
    transform: rotateY(-180deg);
    opacity: 0;
  } */
  .page1 {
    /* 기본 스타일 */
    transform-origin: left center;
    transition:
      transform 1s ease-in-out,
      opacity 1s ease-in-out,
      visibility 1s ease-in-out;
    /* 초기 상태 */
    transform: rotateY(0deg);
    opacity: 1;
    visibility: visible;
  }
  .page1.animate {
    animation: rotateAndFade 3s ease-in-out;
    animation-fill-mode: forwards;
  }
  @keyframes rotateAndFade {
    0% {
      transform: rotateY(0deg);
      opacity: 1;
      visibility: visible;
    }
    50% {
      transform: rotateY(-180deg);
      opacity: 0;
      visibility: visible;
    }
    100% {
      transform: rotateY(0deg);
      opacity: 0;
      visibility: visible;
    }
  }
  #page2 {
    z-index: 0;
  }
  .content {
    width: 100%;
    height: 100%;
    transition-duration: 1s;
  }
  /* #content1:hover {
    opacity: 0.4;
  } */
  .chainSection {
    position: absolute;
    top: 10px;
    left: 0;
    height: 100%;
    z-index: 10;
  }
  .chain {
    display: flex;
    align-items: center;
    margin: 18px 0;
  }
  .chainFrame {
    width: 20px;
    height: 8px;
    background-color: #616161;
    display: inline-block;
    z-index: 1;
    border-radius: 0 8px 8px 0;
  }
  .chainCircle {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #fff;
    display: inline-block;
    transform: translateX(-8px);
    box-shadow: -1px -1px 3px rgba(0, 0, 0, 0.4) inset;
  }
  /*
    친효애드온 : 포스트잇 모듈 (마크1) 시작
    https://rgy0409.tistory.com
    e-mail : rgy0409@gmail.com
*/
  .menu-rayRostIt {
    * {
      z-index: -10;
    }
  }
`;

const StudentProfile = () => {
  const navigate = useNavigate();
  const [myInfo, setMyInfo] = useState([]);
  const studentPk = getCookie("studentPk");

  /** 최초 랜더링 */
  useEffect(() => {
    studentInfo();
  }, []);

  useEffect(() => {
    console.log("학생 정보 : ", myInfo);
  }, []);

  /** 학생 자신 정보 불러오기 */
  const studentInfo = async () => {
    const res = await getStudentInfo(studentPk);
    if (res === false) {
      console.log("정보 없음");
    } else {
      setMyInfo(res.data);
    }
  };

  /** 마이페이지 이동 */
  const moveMyPage = () => {
    navigate(`/parents/studentinfo`);
  };

  /** 성적 확인 페이지 이동 */
  const moveMyGradePage = () => {
    navigate(`/grade/${studentPk}`);
  };

  /** 프로필 html 코드 추가 */
  useEffect(() => {
    const chainSections = document.getElementsByClassName("chainSection");
    const chain = `
          <div class="chain">
          <div class="chainFrame"></div>
          <div class="chainCircle"></div>
          </div>
        `;

    for (let i = 0; i < chainSections.length; i++) {
      const chainSection = chainSections[i];

      for (let j = 0; j < 7; j++) {
        chainSection.innerHTML += chain;
      }
    }
  }, []);

  return (
    <ParentsProfileStyle>
      <div className="user-info-wrap page" id="page2">
        <div className="user-info-inner content" id="contents">
          <div className="user-info">
            {/* 유저 정보 start */}
            <div className="top-user-info">
              <div className="user-pic"></div>

              <div className="user-info-div">
                <div className="user-info-label-box">
                  <div className="user-info-label">이름</div>
                  <div className="user-info-label">생일</div>
                  <div className="user-info-label">학급</div>
                  <div className="user-info-label">선생님 성함</div>
                </div>
                <div className="user-info-text-box">
                  <div className="login-user-info-text">
                    {myInfo.studentName === "" ||
                    myInfo.studentName === null ||
                    myInfo.studentName === 0 ? (
                      <div className="no-info">미등록</div>
                    ) : (
                      myInfo.studentName
                    )}
                  </div>
                  <div className="login-user-info-text">
                    {myInfo.studentBirth === "" ||
                    myInfo.studentBirth === null ||
                    myInfo.studentBirth === 0 ? (
                      <div className="no-info">미등록</div>
                    ) : (
                      myInfo.studentBirth
                    )}
                  </div>
                  <div className="login-user-info-text">
                    {myInfo.studentGrade === "" ||
                    myInfo.studentGrade === null ||
                    myInfo.studentGrade === 0 ||
                    myInfo.studentClass === "" ||
                    myInfo.studentClass === null ||
                    myInfo.studentClass === 0 ? (
                      <div className="no-info">미등록</div>
                    ) : (
                      `${myInfo.studentGrade} 학년 ${myInfo.studentClass} 반`
                    )}
                  </div>
                  <div className="login-user-info-text">
                    {myInfo.teacherName === "" ||
                    myInfo.teacherName === null ? (
                      <div className="no-info">미등록</div>
                    ) : (
                      myInfo.teacherName
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
            </div>
            {/* 버튼 end */}
          </div>
        </div>
        {/* 스프링 영역 */}
        <section className="chainSection"></section>
      </div>
    </ParentsProfileStyle>
  );
};

export default StudentProfile;
