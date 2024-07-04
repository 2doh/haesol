import React from "react";
import "../../scss/student/studentEdit.css";
import { useNavigate } from "react-router";

const Grade = () => {
  // 네비게이트
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/students/edit`);
  };
  // 반 정보 > 추후 데이터 받아와서 처리
  const gradeClass = "5학년 7반";

  return (
    <div className="main-core">
      <div className="student-list-title">
        {/* <!-- 제목 위치 --> */}
        <span>{gradeClass}</span>
        <p>성적 관리</p>
      </div>
      <div className="user-info-wrap">
        {/* <!-- 탭 선택 부분 --> */}
        <div className="user-info-tap">
          <div className="property">
            <div className="div-wrapper">
              <div
                className="info-subtitle"
                onClick={() => {
                  handleClick();
                }}
              >
                신상 정보
              </div>
            </div>
            <div className="frame">
              <div className="text-wrapper">성적 입력</div>
            </div>
            <div className="div-wrapper">
              <div className="info-subtitle">차트</div>
            </div>
          </div>

          <div className="info-button">
            <button>저장</button>
            <button>취소</button>
          </div>
        </div>
        <div className="info-contain-top">
          <div className="info-item-top">
            <div className="info-title">
              <span>학기 선택</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Grade;
