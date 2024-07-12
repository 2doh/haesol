import Signature from "pages/grade/Signature";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import "../../scss/student/grade.css";
import "../../scss/student/studentEdit.css";
import { getStudentGrade1, getStudentInfo } from "api/student/studentapi";

const GradeView = () => {
  // 네비게이트
  const navigate = useNavigate();
  const location = useLocation();
  const studentPk = location.pathname.split("/")[2];
  const handleClick = () => {
    navigate(`/students/edit/${studentPk}`);
  };

  // 반 정보 > 추후 데이터 받아와서 처리
  const totalStudent = "21 / 321";

  // const stu_id = 3;

  const [studentInfo, setStudentInfo] = useState({});
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");

  // 학생 정보 불러오기
  const studentInfoData = async () => {
    try {
      const response = await getStudentInfo(studentPk);
      const result = response.data;

      setStudentInfo(result);
      setStudentName(result.studentName);
      setStudentClass(result.studentClass);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // 학생 데이터 불러오기
    // console.log("studentInfoData 확인중 : ", studentInfo);
    studentInfoData();
  }, [studentPk]);

  // 성적 불러오기
  const studentGrade = async () => {
    try {
      const response = await getStudentGrade1(studentPk);
      const result = response.data;
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("studentGrade 확인중 : ", studentGrade);
    studentGrade();
  }, [studentPk]);

  return (
    <div className="main-core">
      <div className="student-list-title">
        {/* <!-- 제목 위치 --> */}
        <span>{studentClass}</span>
        <p>{studentName} 성적 확인</p>
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
                  <input type="number" readOnly /> 점
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
                  <input type="number" readOnly /> 점
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
                  <input type="number" readOnly /> 점
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
                  <input type="number" readOnly /> 점
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
                  <input type="number" readOnly /> 점
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
                  <input type="number" readOnly /> 점
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
                  <input type="number" readOnly /> 점
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
                  <input type="number" readOnly /> 점
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
                  <input type="number" readOnly /> 점
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
                  <input type="number" readOnly /> 점
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
            반 등수 <input readOnly placeholder="-" /> /21등
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
                  <input type="number" readOnly /> 점
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
                  <input type="number" readOnly /> 점
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
                  <input type="number" readOnly /> 점
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
                  <input type="number" readOnly /> 점
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
                  <input type="number" readOnly /> 점
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
                  <input type="number" readOnly /> 점
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
                  <input type="number" readOnly /> 점
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
                  <input type="number" readOnly /> 점
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
                  <input type="number" readOnly /> 점
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
                  <input type="number" readOnly /> 점
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

export default GradeView;
