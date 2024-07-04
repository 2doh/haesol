import styled from "@emotion/styled";
import "../../scss/student/studentEdit.css";
import React from "react";

const StudentsInfoStyle = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 120px;
  width: 100%;
  height: 100%;
`;

const StudentInfoView = () => {
  // 반 정보 > 추후 데이터 받아와서 처리
  const gradeClass = "5학년 7반";

  // 학생 더미 데이터
  const readOnlyInfo = {
    firstSignup: "2024년 06월 24일 오후 4시 45분",
    userId: "kimgreen010101",
    currentClass: "5학년 7반 | 담임 : 황준하",
  };

  const prvInfo = [
    {
      prvClass: "1학년 1반",
      prvTeacher: "김누구",
      studentInfoContent: "기록 내용 없음",
    },
    {
      prvClass: "2학년 1반",
      prvTeacher: "김누구",
      studentInfoContent: "기록 내용 없음",
    },
    {
      prvClass: "3학년 1반",
      prvTeacher: "김누구",
      studentInfoContent: "기록 내용 없음",
    },
    {
      prvClass: "4학년 1반",
      prvTeacher: "김누구",
      studentInfoContent: "기록 내용 없음",
    },
  ];
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
              <input type="date" name="date" />
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
        <div className="info-contain-top">
          <div className="info-none-modify">
            <div className="info-title">
              <span>최초 등록일</span>
              <div>{readOnlyInfo.firstSignup}</div>
            </div>
          </div>
        </div>
        <div className="info-contain-top">
          <div className="info-none-modify">
            <div className="info-title">
              <span>아이디</span>
              <div>{readOnlyInfo.userId}</div>
            </div>
          </div>
        </div>
        <div className="info-contain-top">
          <div className="info-none-modify" id="info-none-modify-last">
            <div className="info-title">
              <span>현재 학급</span>
              <div>{readOnlyInfo.currentClass}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInfoView;
