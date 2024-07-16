import { getStudentInfo } from "api/student/studentapi";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

const SelectTopMenu = () => {
  // 네비게이트
  const navigate = useNavigate();
  const { studentPk } = useParams();
  console.log(studentPk);

  const handleOnGrade = () => {
    navigate(`/grade/${studentPk}`);
  };

  const [studentClass, setStudentClass] = useState("");
  const [studentInfo, setStudentInfo] = useState({});
  const [studentName, setStudentName] = useState("");

  return (
    <div className="main-core">
      <div className="student-list-title">
        {/* <!-- 제목 위치 --> */}
        <span>{studentClass}</span>
        <p>{studentName} 여기 페이지 이름</p>
      </div>
      <div className="user-info-wrap">
        {/* <!-- 탭 선택 부분 --> */}
        <div className="user-info-tap">
          <div className="property">
            <div className="div-wrapper">
              <div className="info-subtitle">신상 정보</div>
            </div>
            <div className="div-wrapper">
              <div className="text-wrapper" onClick={e => handleOnGrade(e)}>
                성적 입력
              </div>
            </div>
            <div className="frame">
              <div className="info-subtitle">차트</div>
            </div>
          </div>
          <div className="info-button">
            <button>조회</button>
          </div>
        </div>
        <div className="info-contain-top">
          <div className="info-item-top">
            <div className="info-title" id="info-grade-select">
              <span>학기 선택</span>
              <div className="select-grade">
                <select name="grade">
                  <option value="1">1학년</option>
                  <option value="2">2학년</option>
                  <option value="3">3학년</option>
                  <option value="4">4학년</option>
                  <option value="5">5학년</option>
                  <option value="6">6학년</option>
                </select>
                <select name="semester">
                  <option value="1">1학기</option>
                  <option value="2">2학기</option>
                </select>
              </div>
              <div className="total-student">
                <p>반/학년 전체 인원</p>
                <input />명
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectTopMenu;
