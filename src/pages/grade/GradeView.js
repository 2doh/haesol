import {
  getStudentGrade1,
  getStudentGrade2,
  getStudentGradeSelect1,
  getStudentGradeSelect2,
  getStudentInfo,
  postStudentGradeScore,
} from "api/student/studentapi";

import Signature from "pages/grade/Signature";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "../../scss/student/grade.css";
import "../../scss/student/studentEdit.css";
import styled from "@emotion/styled";
import Signature2 from "./Signature2";
import moment from "moment";
import StudentClassInfo from "pages/student/StudentClassInfo";
import Footer from "components/layout/Footer";
import HeaderTopPublic from "components/layout/header/HeaderTopPublic";
import HeaderMemu from "components/layout/header/HeaderMenu";
import Title from "components/Title";

const initData = [
  {
    name: "국어",
    mark: 0,
    classAvg: 0,
    classRank: 0,
    gradeAvg: 0,
    gradeRank: 0,
    subjectClassRank: 0,
    subjectGradeRank: 0,
    exam: 1,
    semester: 1,
    year: "",
    grade: 1,
  },
  {
    name: "수학",
    mark: 0,
    classAvg: 0,
    classRank: 0,
    gradeAvg: 0,
    gradeRank: 0,
    subjectClassRank: 0,
    subjectGradeRank: 0,
    exam: 1,
    semester: 1,
    year: "",
    grade: 1,
  },
  {
    name: "바른 생활",
    mark: 0,
    classAvg: 0,
    classRank: 0,
    gradeAvg: 0,
    gradeRank: 0,
    subjectClassRank: 0,
    subjectGradeRank: 0,
    exam: 1,
    semester: 1,
    year: "",
    grade: 1,
  },
  {
    name: "사회/도덕",
    mark: 0,
    classAvg: 0,
    classRank: 0,
    gradeAvg: 0,
    gradeRank: 0,
    subjectClassRank: 0,
    subjectGradeRank: 0,
    exam: 1,
    semester: 1,
    year: "",
    grade: 1,
  },
  {
    name: "과학",
    mark: 0,
    classAvg: 0,
    classRank: 0,
    gradeAvg: 0,
    gradeRank: 0,
    subjectClassRank: 0,
    subjectGradeRank: 0,
    exam: 1,
    semester: 1,
    year: "",
    grade: 1,
  },
  {
    name: "영어",
    mark: 0,
    classAvg: 0,
    classRank: 0,
    gradeAvg: 0,
    gradeRank: 0,
    subjectClassRank: 0,
    subjectGradeRank: 0,
    exam: 1,
    semester: 1,
    year: "",
    grade: 1,
  },
  {
    name: "실과",
    mark: 0,
    classAvg: 0,
    classRank: 0,
    gradeAvg: 0,
    gradeRank: 0,
    subjectClassRank: 0,
    subjectGradeRank: 0,
    exam: 1,
    semester: 1,
    year: "",
    grade: 1,
  },
  {
    name: "체육",
    mark: 0,
    classAvg: 0,
    classRank: 0,
    gradeAvg: 0,
    gradeRank: 0,
    subjectClassRank: 0,
    subjectGradeRank: 0,
    exam: 1,
    semester: 1,
    year: "",
    grade: 1,
  },
  {
    name: "음악",
    mark: 0,
    classAvg: 0,
    classRank: 0,
    gradeAvg: 0,
    gradeRank: 0,
    subjectClassRank: 0,
    subjectGradeRank: 0,
    exam: 1,
    semester: 1,
    year: "",
    grade: 1,
  },
  {
    name: "미술",
    mark: 0,
    classAvg: 0,
    classRank: 0,
    gradeAvg: 0,
    gradeRank: 0,
    subjectClassRank: 0,
    subjectGradeRank: 0,
    exam: 1,
    semester: 1,
    year: "",
    grade: 1,
  },
];

const GradeView = () => {
  // 네비게이트
  const navigate = useNavigate();
  const { studentPk } = useParams();
  const handleClick = () => {
    navigate(`/parents/studentinfo`);
  };
  const handleClickChart = () => {
    navigate(`/grade/chart/${studentPk}`);
  };

  // const [studentInfo, setStudentInfo] = useState({});
  // const [studentName, setStudentName] = useState("");
  // const [studentClass, setStudentClass] = useState("");
  // const [studentGrade, setStudentGrade] = useState("");

  // format에 맞게 출력된다.
  const nowTime = moment().format("YYYY");
  console.log(nowTime);
  const [nowYear, setNowYear] = useState(new Date().getFullYear());
  const [yearOptions, setYearOptions] = useState([]);

  const [classStudentCount, setClassStudentCount] = useState("-");
  const [gradeStudentCount, setGradeStudentCount] = useState("-");
  const [classRank, setClassRank] = useState("-");
  const [gradeRank, setGradeRank] = useState("-");

  // 싸인 정보
  const [signResultPic1, setSignResultPic1] = useState(null);
  const [signResultPic2, setSignResultPic2] = useState(null);

  // // 학생 정보 불러오기
  // const studentInfoData = async () => {
  //   try {
  //     const response = await getStudentInfo(studentPk);
  //     const result = response.data;
  //     setStudentInfo(result);
  //     setStudentName(result.studentName);
  //     setStudentClass(result.studentClass);
  //     setStudentGrade(result.studentGrade);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   // 학생 데이터 불러오기
  //   studentInfoData();
  // }, [studentPk]);

  // 최초 조회 시 성적 불러오기 중간고사
  const [examListOne, setExamListOne] = useState(initData);
  const [examListTwo, setExamListTwo] = useState(initData);
  const [latestGrade, setLatestGrade] = useState(1); // 최종학년
  const [latestSemester, setLatestSemester] = useState(1); // 최종학기
  const [latestYear, setLatestYear] = useState("2024"); // 최종년도

  const studentGrade1 = async () => {
    try {
      // 중간고사
      const response = await getStudentGrade1(studentPk);
      const result = response.data.data.list || [];
      // console.log(response);
      // 요것은 조금 위험하다.
      setLatestGrade(response.data.data.latestGrade || 1);
      setLatestSemester(response.data.data.latestSemester || 1);
      setLatestYear(response.data.data.latestYear || "");
      setClassRank(response.data.data.classRank.classRank);
      setGradeRank(response.data.data.classRank.gradeRank);
      setClassStudentCount(response.data.data.classRank.classStudentCount);
      setGradeStudentCount(response.data.data.classRank.gradeStudentCount);
      setSignResultPic1(response.data.data.signResult);

      {
        response.data.data.signResult === null
          ? setSignResultPic1(null)
          : setSignResultPic1(response.data.data.signResult);
      }

      const updatedData = examListOne.map(subject => {
        const update = result.find(data => data.name === subject.name);
        if (update) {
          return {
            ...subject,
            mark: update.mark,
            classAvg: update.classAvg,
            classRank: update.classRank,
            gradeAvg: update.gradeAvg,
            gradeRank: update.gradeRank,
            subjectClassRank: update.subjectClassRank,
            subjectGradeRank: update.subjectGradeRank,
            exam: 1,
            semester: response.data.data.latestSemester,
            year: response.data.data.latestYear,
            grade: response.data.data.latestGrade,
          };
        }
        return subject;
      });
      setExamListOne(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  // 최초 조회 시 성적 불러오기 기말고사
  const studentGrade2 = async () => {
    try {
      const response = await getStudentGrade2(studentPk);
      // console.log(response);
      const result = response.data.data.list || [];
      // 요것은 조금 위험하다.
      setLatestGrade(response.data.data.latestGrade || 1);
      setLatestSemester(response.data.data.latestSemester || 1);
      setLatestYear(response.data.data.latestYear || "");
      setClassRank(response.data.data.classRank.classRank);
      setGradeRank(response.data.data.classRank.gradeRank);
      setClassStudentCount(response.data.data.classRank.classStudentCount);
      setGradeStudentCount(response.data.data.classRank.gradeStudentCount);
      setSignResultPic2(response.data.data.signResult);

      {
        response.data.data.signResult === null
          ? setSignResultPic2(null)
          : setSignResultPic2(response.data.data.signResult);
      }

      const updatedData = examListTwo.map(subject => {
        const update = result.find(data => data.name === subject.name);
        if (update) {
          return {
            ...subject,
            mark: update.mark,
            classAvg: update.classAvg,
            classRank: update.classRank,
            gradeAvg: update.gradeAvg,
            gradeRank: update.gradeRank,
            subjectClassRank: update.subjectClassRank,
            subjectGradeRank: update.subjectGradeRank,
            exam: 2,
            semester: response.data.data.latestSemester,
            year: response.data.data.latestYear,
            grade: response.data.data.latestGrade,
          };
        }
        return subject;
      });
      setExamListTwo(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    studentGrade1();
    studentGrade2();
  }, [studentPk]);

  const handleGradeChange = async e => {
    const newGrade = e.target.value;
    setLatestGrade(newGrade);
    await studentGradeSelect1(newGrade, latestSemester);
    await studentGradeSelect2(newGrade, latestSemester);
  };
  const handleSemesterChange = async e => {
    const newSemester = e.target.value;
    setLatestSemester(newSemester);
    await studentGradeSelect1(latestGrade, newSemester);
    await studentGradeSelect2(latestGrade, newSemester);
  };

  // const handleYearChange = async e => {
  //   const newLatestYear = e.target.value;
  //   // console.log(newLatestYear);
  //   setLatestYear(newLatestYear);
  //   await studentGradeSelect1(latestGrade, latestSemester, newLatestYear);
  //   await studentGradeSelect2(latestGrade, latestSemester, newLatestYear);
  // };

  // 학기, 학년 선택 성적 출력 중간고사
  const studentGradeSelect1 = async (grade, semester, year) => {
    try {
      // 중간고사
      const response = await getStudentGradeSelect1(
        studentPk,
        grade,
        semester,
        year,
      );
      const err = response.data;
      if (err.code < 0) {
        alert("선택한 학기의 중간고사 성적이 없습니다.");
        setExamListOne(initData);
        setSignResultPic1(null);
        return;
      }

      const result = response.data.data.list || [];
      setSignResultPic1(response.data.data.signResult);

      {
        response.data.data.signResult === null
          ? setSignResultPic1(null)
          : setSignResultPic1(response.data.data.signResult);
      }
      const updatedData = examListOne.map(subject => {
        const update = result.find(data => data.name === subject.name);
        if (update) {
          return {
            ...subject,
            mark: update.mark,
            classAvg: update.classAvg,
            classRank: update.classRank,
            gradeAvg: update.gradeAvg,
            gradeRank: update.gradeRank,
            subjectClassRank: update.subjectClassRank,
            subjectGradeRank: update.subjectGradeRank,
            exam: 1,
            semester: semester,
            year: year,
            grade: grade,
          };
        }
        return subject;
      });
      setExamListOne(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  // 학기, 학년 선택 성적 출력 기말고사
  const studentGradeSelect2 = async (grade, semester, year) => {
    try {
      const response = await getStudentGradeSelect2(
        studentPk,
        grade,
        semester,
        year,
      );

      const err = response.data;
      if (err.code < 0) {
        alert("선택한 학기의 기말고사 성적이 없습니다.");
        setExamListTwo(initData);
        setSignResultPic2(null);
        return;
      }
      const result = response.data.data.list || [];
      setSignResultPic2(response.data.data.signResult);

      {
        response.data.data.signResult === null
          ? setSignResultPic2(null)
          : setSignResultPic2(response.data.data.signResult);
      }
      const updatedData = examListTwo.map(subject => {
        const update = result.find(data => data.name === subject.name);
        if (update) {
          return {
            ...subject,
            mark: update.mark,
            classAvg: update.classAvg,
            classRank: update.classRank,
            gradeAvg: update.gradeAvg,
            gradeRank: update.gradeRank,
            subjectClassRank: update.subjectClassRank,
            subjectGradeRank: update.subjectGradeRank,
            exam: 2,
            semester: semester,
            year: year,
            grade: grade,
          };
        }
        return subject;
      });
      setExamListTwo(updatedData);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   const generateYearOptions = () => {
  //     const currentYear = new Date().getFullYear();
  //     const startYear = currentYear - 10;
  //     const options = [];
  //     for (let year = currentYear; year >= startYear; year--) {
  //       options.push(year.toString());
  //     }
  //     setYearOptions(options);
  //   };
  //   generateYearOptions();
  // }, []);

  const ParentCheckStyle = styled.div`
    display: flex;
    /* flex-direction: column; */
    flex-direction: row-reverse;
    gap: 15px;
    align-items: flex-end;
    margin-bottom: 100px;
    button {
      cursor: Default;
      width: 120px;
      height: 30px;
      border: solid 2px #886348;
      font-size: 18px;
    }

    .is-sign {
      background-color: #dd838f;
      color: #fbfaf9;
      position: relative;

      .sign-view {
        display: none;
        object-fit: cover;
        overflow: hidden;
      }
      &:hover {
        .sign-view {
          display: block;
          position: absolute;
          bottom: -100%;
          left: -10%;
          width: 120%;
          height: 300%;
          border: solid 1px #886348;
          background-color: #fbfaf9;

          object-fit: cover;

          img {
          }
        }
      }
    }
  `;

  return (
    <>
      <HeaderTopPublic />
      <HeaderMemu />
      <div className="main-core">
        <div className="student-list-title">
          {/* <!-- 제목 위치 --> */}
          {/* <StudentClassInfo /> */}
          <Title></Title>
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
                <div className="text-wrapper">성적 확인</div>
              </div>
              {/* <div className="div-wrapper"> */}
              <div
                className="div-wrapper"
                onClick={() => {
                  handleClickChart();
                }}
              >
                <div className="info-subtitle">차트</div>
              </div>
            </div>
          </div>
          <div className="info-contain-top">
            <div className="info-item-top">
              <div className="info-title" id="info-grade-select">
                <span>학기 선택</span>
                <div className="select-grade">
                  <select
                    name="grade"
                    onChange={e => {
                      handleGradeChange(e);
                    }}
                    value={latestGrade}
                  >
                    <option value="1">1학년</option>
                    <option value="2">2학년</option>
                    <option value="3">3학년</option>
                    <option value="4">4학년</option>
                    <option value="5">5학년</option>
                    <option value="6">6학년</option>
                  </select>
                  <select
                    name="semester"
                    onChange={e => {
                      handleSemesterChange(e);
                    }}
                    value={latestSemester}
                  >
                    <option value="1">1학기</option>
                    <option value="2">2학기</option>
                  </select>
                </div>
                {/* <div className="total-student">
                <p>년도 선택</p>
                <select
                  id="year"
                  value={latestYear}
                  onChange={e => {
                    handleYearChange(e);
                  }}
                >
                  {yearOptions.map((year, index) => (
                    <option key={index} value={year}>
                      {year}년
                    </option>
                  ))}
                </select>
              </div> */}
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
              {examListOne.map((item, index) => (
                <div className="info-title" id="info-grade-select" key={index}>
                  <span>{item.name}</span>
                  <div className="grade-info-section">
                    <div className="grade-info">
                      <p>원점수</p>
                      <input disabled placeholder="-" value={item.mark || ""} />
                      점
                    </div>
                    <div className="grade-info">
                      <p>반/전체 평균</p>
                      <input
                        disabled
                        value={`${Math.trunc(item.classAvg) || "-"} / ${Math.trunc(item.gradeAvg) || "-"}`}
                      />
                      점
                    </div>
                    <div className="grade-info">
                      <p>반/전체 등수</p>
                      <input
                        disabled
                        value={`${item.subjectClassRank || "-"} / ${item.subjectGradeRank || "-"}`}
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
              학년 전체 등수 <input disabled value={gradeRank} /> /{" "}
              {gradeStudentCount} 등
            </div>
            <div className="grade-rank">
              반 등수 <input disabled value={classRank} /> / {classStudentCount}{" "}
              등
            </div>
          </div>

          {signResultPic1 ? (
            <ParentCheckStyle>
              <button className="is-sign">
                학부모 확인
                <div className="sign-view">
                  <img
                    src={`http://112.222.157.156:5121/pic/sign/${signResultPic1.signId}/${signResultPic1.pic}`}
                  />
                </div>
              </button>
            </ParentCheckStyle>
          ) : (
            <Signature
              studentPk={studentPk}
              latestSemester={latestSemester}
              latestYear={latestYear}
              nowTime={nowTime}
            />
          )}

          <div className="exam-table">
            <div className="property">
              <div className="frame">
                <div className="text-wrapper">기말고사</div>
              </div>
            </div>
          </div>
          <div className="info-contain-top">
            <div className="info-item-top">
              {examListTwo.map((item, index) => (
                <div className="info-title" id="info-grade-select" key={index}>
                  <span>{item.name}</span>
                  <div className="grade-info-section">
                    <div className="grade-info">
                      <p>원점수</p>
                      <input disabled placeholder="-" value={item.mark || ""} />
                      점
                    </div>
                    <div className="grade-info">
                      <p>반/전체 평균</p>
                      <input
                        disabled
                        value={`${Math.trunc(item.classAvg) || "-"} / ${Math.trunc(item.gradeAvg) || "-"}`}
                      />
                      점
                    </div>
                    <div className="grade-info">
                      <p>반/전체 등수</p>
                      <input
                        disabled
                        value={`${item.subjectClassRank || "-"} / ${item.subjectGradeRank || "-"}`}
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
              학년 전체 등수 <input disabled value={gradeRank} /> /{" "}
              {gradeStudentCount} 등
            </div>
            <div className="grade-rank">
              반 등수 <input disabled value={classRank} /> / {classStudentCount}{" "}
              등
            </div>
          </div>
          {signResultPic2 ? (
            <ParentCheckStyle>
              <button className="is-sign">
                학부모 확인
                <div className="sign-view">
                  <img
                    src={`http://112.222.157.156:5121/pic/sign/${signResultPic2.signId}/${signResultPic2.pic}`}
                  />
                </div>
              </button>
            </ParentCheckStyle>
          ) : (
            <Signature2
              studentPk={studentPk}
              latestSemester={latestSemester}
              latestYear={latestYear}
              nowTime={nowTime}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GradeView;
