import Signature from "pages/grade/Signature";
import { useState } from "react";
import { useNavigate } from "react-router";
import "../../scss/student/grade.css";
import "../../scss/student/studentEdit.css";

const Grade = () => {
  // 네비게이트
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/students/edit`);
  };
  // 반 정보 > 추후 데이터 받아와서 처리
  const gradeClass = "5학년 7반";
  const totalStudent = "21 / 321";

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
            <div
              className="div-wrapper"
              onClick={() => {
                handleClick();
              }}
            >
              <div className="info-subtitle">신상 정보</div>
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
            <div className="info-title" id="info-grade-select">
              <span>학기 선택</span>
              <div className="select-grade">
                <select name="grade">
                  <option value="1학년">1학년</option>
                  <option value="2학년">2학년</option>
                  <option value="3학년">3학년</option>
                  <option value="4학년">4학년</option>
                  <option value="5학년">5학년</option>
                  <option value="6학년">6학년</option>
                </select>
                <select name="grade">
                  <option value="1학기">1학기</option>
                  <option value="2학기">2학기</option>
                </select>
              </div>
              <div className="total-student">
                <p>반/학년 전체 인원</p>
                <input value={totalStudent} readOnly /> 명
              </div>
            </div>
          </div>
        </div>
        <div className="exam-table">
          <div className="property">
            <div className="frame">
              <div className="text-wrapper">중간고사</div>
            </div>
          </div>
        </div>
        <div className="info-contain-top">
          <div className="info-item-top">
            <div className="info-title" id="info-grade-select">
              <span>국어</span>
              <div className="grade-info-section">
                <div className="grade-info">
                  <p>원점수</p>
                  <input type="number" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 평균</p>
                  <input readOnly placeholder="-" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 등수</p>
                  <input readOnly placeholder="-" /> 등
                </div>
              </div>
            </div>
            <div className="info-title" id="info-grade-select">
              <span>수학</span>
              <div className="grade-info-section">
                <div className="grade-info">
                  <p>원점수</p>
                  <input type="number" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 평균</p>
                  <input readOnly placeholder="-" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 등수</p>
                  <input readOnly placeholder="-" /> 등
                </div>
              </div>
            </div>
            <div className="info-title" id="info-grade-select">
              <span>바른 생활</span>
              <div className="grade-info-section">
                <div className="grade-info">
                  <p>원점수</p>
                  <input type="number" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 평균</p>
                  <input readOnly placeholder="-" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 등수</p>
                  <input readOnly placeholder="-" /> 등
                </div>
              </div>
            </div>
            <div className="info-title" id="info-grade-select">
              <span>사회/도덕</span>
              <div className="grade-info-section">
                <div className="grade-info">
                  <p>원점수</p>
                  <input type="number" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 평균</p>
                  <input readOnly placeholder="-" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 등수</p>
                  <input readOnly placeholder="-" /> 등
                </div>
              </div>
            </div>
            <div className="info-title" id="info-grade-select">
              <span>과학</span>
              <div className="grade-info-section">
                <div className="grade-info">
                  <p>원점수</p>
                  <input type="number" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 평균</p>
                  <input readOnly placeholder="-" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 등수</p>
                  <input readOnly placeholder="-" /> 등
                </div>
              </div>
            </div>
            <div className="info-title" id="info-grade-select">
              <span>영어</span>
              <div className="grade-info-section">
                <div className="grade-info">
                  <p>원점수</p>
                  <input type="number" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 평균</p>
                  <input readOnly placeholder="-" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 등수</p>
                  <input readOnly placeholder="-" /> 등
                </div>
              </div>
            </div>
            <div className="info-title" id="info-grade-select">
              <span>실과</span>
              <div className="grade-info-section">
                <div className="grade-info">
                  <p>원점수</p>
                  <input type="number" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 평균</p>
                  <input readOnly placeholder="-" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 등수</p>
                  <input readOnly placeholder="-" /> 등
                </div>
              </div>
            </div>
            <div className="info-title" id="info-grade-select">
              <span>체육</span>
              <div className="grade-info-section">
                <div className="grade-info">
                  <p>원점수</p>
                  <input type="number" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 평균</p>
                  <input readOnly placeholder="-" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 등수</p>
                  <input readOnly placeholder="-" /> 등
                </div>
              </div>
            </div>
            <div className="info-title" id="info-grade-select">
              <span>음악</span>
              <div className="grade-info-section">
                <div className="grade-info">
                  <p>원점수</p>
                  <input type="number" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 평균</p>
                  <input readOnly placeholder="-" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 등수</p>
                  <input readOnly placeholder="-" /> 등
                </div>
              </div>
            </div>
            <div className="info-title" id="info-grade-select">
              <span>미술</span>
              <div className="grade-info-section">
                <div className="grade-info">
                  <p>원점수</p>
                  <input type="number" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 평균</p>
                  <input readOnly placeholder="-" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 등수</p>
                  <input readOnly placeholder="-" /> 등
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="all-grade">
          <div className="grade-rank">
            학년 전체 등수 <input readOnly placeholder="-" /> /312등
          </div>
          <div className="grade-rank">
            반 등수 <input readOnly placeholder="-" /> /312등
          </div>
        </div>
        <Signature />

        <div className="exam-table">
          <div className="property">
            <div className="frame">
              <div className="text-wrapper">기말고사</div>
            </div>
          </div>
        </div>
        <div className="info-contain-top">
          <div className="info-item-top">
            <div className="info-title" id="info-grade-select">
              <span>국어</span>
              <div className="grade-info-section">
                <div className="grade-info">
                  <p>원점수</p>
                  <input type="number" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 평균</p>
                  <input readOnly placeholder="-" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 등수</p>
                  <input readOnly placeholder="-" /> 등
                </div>
              </div>
            </div>
            <div className="info-title" id="info-grade-select">
              <span>수학</span>
              <div className="grade-info-section">
                <div className="grade-info">
                  <p>원점수</p>
                  <input type="number" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 평균</p>
                  <input readOnly placeholder="-" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 등수</p>
                  <input readOnly placeholder="-" /> 등
                </div>
              </div>
            </div>
            <div className="info-title" id="info-grade-select">
              <span>바른 생활</span>
              <div className="grade-info-section">
                <div className="grade-info">
                  <p>원점수</p>
                  <input type="number" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 평균</p>
                  <input readOnly placeholder="-" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 등수</p>
                  <input readOnly placeholder="-" /> 등
                </div>
              </div>
            </div>
            <div className="info-title" id="info-grade-select">
              <span>사회/도덕</span>
              <div className="grade-info-section">
                <div className="grade-info">
                  <p>원점수</p>
                  <input type="number" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 평균</p>
                  <input readOnly placeholder="-" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 등수</p>
                  <input readOnly placeholder="-" /> 등
                </div>
              </div>
            </div>
            <div className="info-title" id="info-grade-select">
              <span>과학</span>
              <div className="grade-info-section">
                <div className="grade-info">
                  <p>원점수</p>
                  <input type="number" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 평균</p>
                  <input readOnly placeholder="-" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 등수</p>
                  <input readOnly placeholder="-" /> 등
                </div>
              </div>
            </div>
            <div className="info-title" id="info-grade-select">
              <span>영어</span>
              <div className="grade-info-section">
                <div className="grade-info">
                  <p>원점수</p>
                  <input type="number" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 평균</p>
                  <input readOnly placeholder="-" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 등수</p>
                  <input readOnly placeholder="-" /> 등
                </div>
              </div>
            </div>
            <div className="info-title" id="info-grade-select">
              <span>실과</span>
              <div className="grade-info-section">
                <div className="grade-info">
                  <p>원점수</p>
                  <input type="number" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 평균</p>
                  <input readOnly placeholder="-" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 등수</p>
                  <input readOnly placeholder="-" /> 등
                </div>
              </div>
            </div>
            <div className="info-title" id="info-grade-select">
              <span>체육</span>
              <div className="grade-info-section">
                <div className="grade-info">
                  <p>원점수</p>
                  <input type="number" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 평균</p>
                  <input readOnly placeholder="-" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 등수</p>
                  <input readOnly placeholder="-" /> 등
                </div>
              </div>
            </div>
            <div className="info-title" id="info-grade-select">
              <span>음악</span>
              <div className="grade-info-section">
                <div className="grade-info">
                  <p>원점수</p>
                  <input type="number" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 평균</p>
                  <input readOnly placeholder="-" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 등수</p>
                  <input readOnly placeholder="-" /> 등
                </div>
              </div>
            </div>
            <div className="info-title" id="info-grade-select">
              <span>미술</span>
              <div className="grade-info-section">
                <div className="grade-info">
                  <p>원점수</p>
                  <input type="number" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 평균</p>
                  <input readOnly placeholder="-" /> 점
                </div>
                <div className="grade-info">
                  <p>반/전체 등수</p>
                  <input readOnly placeholder="-" /> 등
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="all-grade">
          <div className="grade-rank">
            학년 전체 등수 <input readOnly placeholder="-" /> /312등
          </div>
          <div className="grade-rank">
            반 등수 <input readOnly placeholder="-" /> /312등
          </div>
        </div>
        <Signature />
      </div>
    </div>
  );
};

export default Grade;
