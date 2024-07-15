import Signature from "pages/grade/Signature";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import "../../scss/student/grade.css";
import "../../scss/student/studentEdit.css";
import {
  getStudentGrade1,
  getStudentGrade2,
  getStudentInfo,
} from "api/student/studentapi";

const GradeView = () => {
  // 네비게이트
  const navigate = useNavigate();
  const { studentPk } = useParams();
  const handleClick = () => {
    navigate(`/students/edit/${studentPk}`);
  };

  // 반 정보 > 추후 데이터 받아와서 처리
  const totalStudent = "21 / 321";

  const [studentInfo, setStudentInfo] = useState({});
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");

  const [midGrades, setMidGrades] = useState({
    국어: "",
    수학: "",
    "바른 생활": "",
    "사회/도덕": "",
    과학: "",
    영어: "",
    실과: "",
    체육: "",
    음악: "",
    미술: "",
  });
  const [finalGrades, setfinalGrades] = useState({
    국어: "",
    수학: "",
    "바른 생활": "",
    "사회/도덕": "",
    과학: "",
    영어: "",
    실과: "",
    체육: "",
    음악: "",
    미술: "",
  });

  const subjects = [
    "국어",
    "수학",
    "바른 생활",
    "사회/도덕",
    "과학",
    "영어",
    "실과",
    "체육",
    "음악",
    "미술",
  ];

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
    studentInfoData();
  }, [studentPk]);

  // 성적 불러오기 중간고사
  const studentGrade1 = async () => {
    try {
      const response = await getStudentGrade1(studentPk);
      const result = response.data.data.list || [];
      const list = result || [];

      // setStudentGrade(result);

      // 과목별 성적을 매핑할 객체
      const midgradeMap = {};

      // 각 과목에 대해 데이터 추출 및 매핑
      list.forEach(subject => {
        const {
          name,
          mark,
          classAvg,
          classRank,
          schoolAvg,
          schoolRank,
          midtermAvg,
          final_avg,
          subjectAvg,
        } = subject;
        midgradeMap[name] = {
          mark,
          classAvg,
          classRank,
          schoolAvg,
          schoolRank,
          midtermAvg,
          final_avg,
          subjectAvg,
        }; // 필요한 데이터들을 객체 형태로 매핑
      });
      setMidGrades(prevGrades => ({ ...prevGrades, ...midgradeMap }));

      // console.log(result);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    studentGrade1();
  }, [studentPk]);

  // 성적 불러오기 기말고사
  const studentGrade2 = async () => {
    try {
      const response = await getStudentGrade2(studentPk);
      const result = response.data.data.list || [];
      const list = result || [];

      // setStudentGrade(result);

      // 과목별 성적을 매핑할 객체
      const gradeMap2 = {};

      // 각 과목에 대해 데이터 추출 및 매핑
      list.forEach(subject => {
        const {
          name,
          mark,
          classAvg,
          classRank,
          schoolAvg,
          schoolRank,
          midtermAvg,
          final_avg,
          subjectAvg,
        } = subject;
        gradeMap2[name] = {
          mark,
          classAvg,
          classRank,
          schoolAvg,
          schoolRank,
          midtermAvg,
          final_avg,
          subjectAvg,
        }; // 필요한 데이터들을 객체 형태로 매핑
      });
      setfinalGrades(prevGrades => ({ ...prevGrades, ...gradeMap2 }));

      // console.log(result);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    studentGrade2();
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
            {subjects.map((subject, index) => (
              <div className="info-title" id="info-grade-select" key={index}>
                <span>{subject}</span>
                <div className="grade-info-section">
                  <div className="grade-info">
                    <p>원점수</p>
                    <input
                      // type="number"
                      readOnly
                      value={midGrades[subject]?.mark || "-"}
                    />
                    점
                  </div>
                  <div className="grade-info">
                    <p>반/전체 평균</p>
                    <input
                      readOnly
                      // placeholder="-"
                      value={`${midGrades[subject]?.classAvg || "-"} / ${midGrades[subject]?.schoolAvg || "-"}`}
                    />
                    점
                  </div>
                  <div className="grade-info">
                    <p>반/전체 등수</p>
                    <input
                      readOnly
                      value={`${midGrades[subject]?.classRank || "-"} / ${midGrades[subject]?.schoolRank || "-"}`}
                    />
                    등
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="all-grade">
          <div className="grade-rank">
            학년 전체 등수 <input readOnly /> /312등
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
            {subjects.map((subject, index) => (
              <div className="info-title" id="info-grade-select" key={index}>
                <span>{subject}</span>
                <div className="grade-info-section">
                  <div className="grade-info">
                    <p>원점수</p>
                    <input
                      // type="number"
                      readOnly
                      value={finalGrades[subject]?.mark || "-"}
                    />
                    점
                  </div>
                  <div className="grade-info">
                    <p>반/전체 평균</p>
                    <input
                      readOnly
                      // placeholder="-"
                      value={`${finalGrades[subject]?.classAvg || "-"} / ${finalGrades[subject]?.schoolAvg || "-"}`}
                    />
                    점
                  </div>
                  <div className="grade-info">
                    <p>반/전체 등수</p>
                    <input
                      readOnly
                      value={`${finalGrades[subject]?.classRank || "-"} / ${finalGrades[subject]?.schoolRank || "-"}`}
                    />
                    등
                  </div>
                </div>
              </div>
            ))}
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
