import Signature from "pages/grade/Signature";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import "../../scss/student/grade.css";
import "../../scss/student/studentEdit.css";
import { getStudentGrade1, getStudentInfo } from "api/student/studentapi";

const GradeView = () => {
  // 네비게이트
  const navigate = useNavigate();
  const { studentPk } = useParams();
  const handleClick = () => {
    navigate(`/students/edit/${studentPk}`);
  };

  // 반 정보 > 추후 데이터 받아와서 처리
  const totalStudent = "21 / 321";
  const exam = 1;

  const [studentInfo, setStudentInfo] = useState({});
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [studentGrade, setStudentGrade] = useState([]);

  // 과목 ref
  // 국 수 바른생활 사회도덕 과학 영어 실과 체육 음악 미술
  // const ko = useRef();
  // const math = useRef();
  // const Disciplined = useRef();
  // const social = useRef();
  // const Science = useRef();
  // const Eg = useRef();
  // const Practical = useRef();
  // const physical = useRef();
  // const music = useRef();
  // const art = useRef();

  // const refs = {
  //   국어: ko,
  //   수학: math,
  //   "바른 생활": Disciplined,
  //   "사회/도덕": social,
  //   과학: Science,
  //   영어: Eg,
  //   실과: Practical,
  //   체육: physical,
  //   음악: music,
  //   미술: art,
  // };

  const [grades, setGrades] = useState({
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

  // 성적 불러오기 1학기
  const studentGrade1 = async () => {
    try {
      const response = await getStudentGrade1(studentPk, exam);
      const result = response.data.data.list || [];
      const list = result.list || [];

      // setStudentGrade(result);

      // 과목별 성적을 매핑할 객체
      const gradeMap = {};

      // const gradeMap = result.reduce((acc, subject) => {
      //   acc[subject.name] = subject.mark;
      //   return acc;
      // }, {});

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
        gradeMap[name] = {
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

      setGrades(prevGrades => ({ ...prevGrades, ...gradeMap }));

      // setGrades(prevGrades => ({ ...prevGrades, ...gradeMap }));
      // console.log("Grades loaded:", gradeMap);
      // Object.keys(refs).forEach(subject => {
      //   if (refs[subject].current) {
      //     refs[subject].current.value = gradeMap[subject] || "";
      //   }
      // });

      // console.log(result);

      // // 각 과목별 원점수를 ref에 할당
      // result.forEach(subject => {
      //   switch (subject.name) {
      //     case "국어":
      //       Ko.current.value = subject.mark;
      //       break;
      //     case "수학":
      //       math.current.value = subject.mark;
      //       break;
      //     case "바른 생활":
      //       Disciplined.current.value = subject.mark;
      //       break;
      //     case "사회/도덕":
      //       social.current.value = subject.mark;
      //       break;
      //     case "과학":
      //       Science.current.value = subject.mark;
      //       break;
      //     case "영어":
      //       Eg.current.value = subject.mark;
      //       break;
      //     case "실과":
      //       Practical.current.value = subject.mark;
      //       break;
      //     case "체육":
      //       physical.current.value = subject.mark;
      //       break;
      //     case "음악":
      //       music.current.value = subject.mark;
      //       break;
      //     case "미술":
      //       art.current.value = subject.mark;
      //       break;
      //     default:
      //       break;
      //   }
      // });

      // ko.current.value = result.mark;
      // math.current.value = result.mark;
      // Disciplined.current.value = result.mark;
      // social.current.value = result.mark;
      // Science.current.value = result.mark;
      // Eg.current.value = result.mark;
      // Practical.current.value = result.mark;
      // physical.current.value = result.mark;
      // music.current.value = result.mark;
      // art.current.value = result.mark;

      // setStudentGrade(result);
      console.log(result);
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    studentInfoData();
    studentGrade1();
  }, [studentPk, exam]);

  // useEffect(() => {
  //   console.log("영어의 결과 : ", studentGrade);
  // }, [studentGrade]);

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
                      type="number"
                      readOnly
                      value={grades[subject]?.mark || ""}
                    />
                    점
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
            ))}
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
