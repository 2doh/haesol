import React, { useState } from "react";
import "../../scss/student/studentEdit.scss";
const StudentEdit = () => {
  // 반 정보 > 추후 데이터 받아와서 처리
  const [gradeClass, setGradeClass] = useState("5학년 7반");

  return (
    <div className="main-core">
      <div className="student-list-title">
        {/* <!-- 제목 위치 --> */}
        <span>{gradeClass}</span>
        <p>학생 정보 관리</p>
      </div>
      {/* <!-- 신상정보 전체 레이아웃 --> */}
      <div className="user-info-wrap">
        {/* <!-- 탭 선택 부분 --> */}
        <div className="user-info-tap">
          <div className="property">
            <div className="frame">
              <div className="text-wrapper">신상 정보</div>
            </div>
            <div className="div-wrapper">
              <div className="info-subtitle">성적 입력</div>
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
        {/* <!-- 입력 부분 --> */}
        <div className="info-contain-top">
          <div className="info-item-top">
            <div className="info-title">
              <span>학생명</span>
              <input
                type="text"
                name="text"
                placeholder="이름을 입력해주세요"
              />
              <div className="form-check">
                <input
                  className="form-check-gender"
                  type="radio"
                  name="chk_info"
                  value="남자"
                />
                남자
                <input
                  className="form-check-gender"
                  type="radio"
                  name="chk_info"
                  value="여자"
                />
                여자
              </div>
            </div>
            <div className="info-title">
              <span>생년월일</span>
              <input type="date" name="date" placeholder="" />
            </div>
            <div className="info-title">
              <span>전화번호</span>
              <input
                type="number"
                name="tel"
                placeholder="전화번호를 입력해주세요"
              />
            </div>
          </div>
          <div className="info-item-right">
            <div className="info-title">
              <span>학부모명</span>
              <input type="text" name="text" placeholder="" />
            </div>
            <div className="info-title">
              <span>관계</span>
              <input type="text" name="text" placeholder="" />
            </div>
            <div className="info-title">
              <span>학부모 전화번호</span>
              <input
                type="number"
                name="tel"
                placeholder="전화번호를 입력해주세요"
              />
            </div>
          </div>
          <div className="info-img">사진</div>
        </div>
        <div className="info-contain-mid">
          <div className="info-item-mid">
            <div className="info-title">
              <span>주소</span>
              <div className="add-form">
                <div>
                  <input type="text" name="text" placeholder="" />
                  <button type="button">우편번호 찾기</button>
                </div>
                <input
                  type="text"
                  name="text"
                  placeholder=""
                  className="info-add"
                />
                <input
                  type="text"
                  name="text"
                  placeholder="상세주소를 입력해주세요."
                  className="info-add"
                />
              </div>
            </div>
            <div className="info-title"></div>
          </div>
        </div>
        <div className="info-contain-top">
          <div className="info-item-bottom">
            <div className="info-title">
              <span>기타사항</span>
              <textarea />
            </div>
            <div className="info-title"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentEdit;
