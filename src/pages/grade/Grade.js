import {
  getStudentGrade1,
  getStudentGrade2,
  getStudentGradeSelect1,
  getStudentGradeSelect2,
  getStudentInfo,
  postStudentGradeScore,
} from "api/student/studentapi";

import Signature from "pages/grade/Signature";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "../../scss/student/grade.css";
import "../../scss/student/studentEdit.css";
import styled from "@emotion/styled";

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

const Grade = () => {
  const signResult1 = useRef("");
  const signResult2 = useRef("");

  // 네비게이트
  const navigate = useNavigate();
  const { studentPk } = useParams();
  const handleClick = () => {
    navigate(`/students/edit/${studentPk}`);
  };

  const [studentInfo, setStudentInfo] = useState({});
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");

  const [nowYear, setNowYear] = useState(new Date().getFullYear());
  const [yearOptions, setYearOptions] = useState([]);
  // const [selectedYear, setSelectedYear] = useState(""); // 추가된 부분

  const [classStudentCount, setClassStudentCount] = useState("-");
  const [gradeStudentCount, setGradeStudentCount] = useState("-");
  const [classRank, setClassRank] = useState("-");
  const [gradeRank, setGradeRank] = useState("-");

  // const [data, setData] = useState([]);
  //   const [isSubmitting, setIsSubmitting] = useState(false);

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

  // 최초 조회 시 성적 불러오기 중간고사
  const [examListOne, setExamListOne] = useState(initData);
  const [examListTwo, setExamListTwo] = useState(initData);
  const [latestGrade, setLatestGrade] = useState(1); // 최종학년
  const [latestSemester, setLatestSemester] = useState(1); // 최종학기
  const [latestYear, setLatestYear] = useState("2023"); // 최종년도

  // 싸인 정보
  const [signResultPic1, setSinResultPic1] = useState(null);
  const [signResultPic2, setSinResultPic2] = useState(null);

  const studentGrade1 = async () => {
    try {
      // 중간고사
      const response = await getStudentGrade1(studentPk);
      const result = response.data.data.list || [];
      // 요것은 조금 위험하다.
      setLatestGrade(response.data.data.latestGrade || 1);
      setLatestSemester(response.data.data.latestSemester || 1);
      setLatestYear(response.data.data.latestYear || "");
      setClassRank(response.data.data.classRank.classRank);
      setGradeRank(response.data.data.classRank.gradeRank);
      setClassStudentCount(response.data.data.classRank.classStudentCount);
      setGradeStudentCount(response.data.data.classRank.gradeStudentCount);
      setSinResultPic1(response.data.data.signResult);

      {
        response.data.data.signResult === null
          ? setSinResultPic1(null)
          : setSinResultPic1(response.data.data.signResult.pic);
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
            exam: update.exam,
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
      const result = response.data.data.list || [];
      // 요것은 조금 위험하다.
      setLatestGrade(response.data.data.latestGrade || 1);
      setLatestSemester(response.data.data.latestSemester || 1);
      setLatestYear(response.data.data.latestYear || "");
      setClassRank(response.data.data.classRank.classRank);
      setGradeRank(response.data.data.classRank.gradeRank);
      setClassStudentCount(response.data.data.classRank.classStudentCount);
      setGradeStudentCount(response.data.data.classRank.gradeStudentCount);
      // setSinResultPic2(response.data.data.signResult);

      // {
      //   response.data.data.signResult === null
      //     ? setSinResultPic2(false)
      //     : setSinResultPic2(response.data.data.signResult.pic);
      // }
      const signResult = response.data.data.signResult;

      // signResult가 null일 경우 null을 설정하고, 그렇지 않으면 pic 값을 설정
      setSinResultPic2(signResult ? signResult.pic : null);
      console.log("signResultPic2:", signResultPic2);

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
            exam: update.exam,
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
  // 내용 변경 처리 중간
  const handleChangeOne = item => {
    // 전달된 객체의 name 속성을 비교하고 같으면 업데이트를 해줌.
    const updatedData = examListOne.map(subject => {
      const update = item.name === subject.name;
      if (update) {
        return {
          ...subject,
          mark: parseInt(item.mark),
          classAvg: item.classAvg,
          classRank: item.classRank,
          gradeAvg: item.gradeAvg,
          gradeRank: item.gradeRank,
          subjectClassRank: item.subjectClassRank,
          subjectGradeRank: item.subjectGradeRank,
        };
      }
      return subject;
    });

    setExamListOne(updatedData);
  };

  // 내용 변경 처리 기말
  const handleChangeTwo = item => {
    // 전달된 객체의 name 속성을 비교하고 같으면 업데이트를 해줌.
    const updatedData = examListTwo.map(subject => {
      const update = item.name === subject.name;
      if (update) {
        return {
          ...subject,
          mark: parseInt(item.mark),
          classAvg: item.classAvg,
          classRank: item.classRank,
          gradeAvg: item.gradeAvg,
          gradeRank: item.gradeRank,
          subjectClassRank: item.subjectClassRank,
          subjectGradeRank: item.subjectGradeRank,
        };
      }
      return subject;
    });

    setExamListTwo(updatedData);
  };

  const handleSaveOne = async _item => {
    const scoreData = {
      studentPk: studentPk,
      year: latestYear,
      semester: latestSemester,
      name: _item.name,
      exam: _item.exam,
      mark: _item.mark,
    };
    console.log(scoreData);
    try {
      await postStudentGradeScore(scoreData);
      await studentGrade1();
      await studentGrade2();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    studentGrade1();
    studentGrade2();
  }, [studentPk]);

  useEffect(() => {
    if (signResult1.current) {
      signResult1.current.classList = "sign-btn";
    }
    if (signResult2.current) {
      signResult2.current.classList = "sign-btn";
    }
  }, [signResultPic1, signResultPic2]);

  const handleGradeChange = async e => {
    const newGrade = e.target.value;
    setLatestGrade(newGrade);
    await studentGradeSelect1(newGrade, latestSemester, latestYear);
    await studentGradeSelect2(newGrade, latestSemester, latestYear);
    if (!signResultPic1) signResult1.current.classList = "";
    if (!signResultPic2) signResult2.current.classList = "";

    // signResult2.current.classList = "";
    console.log("비웠다.");
  };
  const handleSemesterChange = async e => {
    const newSemester = e.target.value;
    setLatestSemester(newSemester);
    await studentGradeSelect1(latestGrade, newSemester, latestYear);
    await studentGradeSelect2(latestGrade, newSemester, latestYear);
    if (!signResultPic1) signResult1.current.classList = "";
    if (!signResultPic2) signResult2.current.classList = "";
    console.log("비웠다.");
  };

  const handleYearChange = async e => {
    const newLatestYear = e.target.value;
    setLatestYear(newLatestYear);
    await studentGradeSelect1(latestGrade, latestSemester, newLatestYear);
    await studentGradeSelect2(latestGrade, latestSemester, newLatestYear);
    if (!signResultPic1) signResult1.current.classList = "";
    if (!signResultPic2) signResult2.current.classList = "";
    console.log("비웠다.");
  };

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
        return;
      }
      const result = response.data.data.list || [];
      setSinResultPic1(response.data.data.signResult);

      {
        response.data.data.signResult === null
          ? setSinResultPic1(null)
          : setSinResultPic1(response.data.data.signResult.pic);
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
            exam: update.exam,
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
        return;
      }
      const result = response.data.data.list || [];
      // setSinResultPic2(response.data.data.signResult.pic);
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
            exam: update.exam,
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

  useEffect(() => {
    const generateYearOptions = () => {
      const currentYear = new Date().getFullYear();
      const startYear = currentYear - 10;
      const options = [];
      for (let year = currentYear; year >= startYear; year--) {
        options.push(year.toString());
      }
      setYearOptions(options);
    };
    generateYearOptions();
  }, []);

  const ParentCheckStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: flex-end;
    margin-bottom: 100px;
    button {
      cursor: Default;
      width: 120px;
      height: 30px;
      /* background: #fbfaf9; */
      border: solid 2px #886348;
      font-size: 18px;
    }

    .sign-btn {
      background-color: #dd838f;
      color: #fbfaf9;
    }
  `;

  return (
    <div className="main-core">
      <div className="student-list-title">
        {/* <!-- 제목 위치 --> */}
        <span>{studentClass}</span>
        <p>{studentName} 성적 입력</p>
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
              <div className="total-student">
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
            {examListOne.map((item, index) => (
              <div className="info-title" id="info-grade-select" key={index}>
                <span>{item.name}</span>
                <div className="grade-info-section">
                  <div className="grade-info">
                    <p>원점수</p>
                    <input
                      placeholder="-"
                      value={item.mark || ""}
                      onChange={e => {
                        handleChangeOne({ ...item, mark: e.target.value });
                      }}
                    />
                    점
                  </div>
                  <div className="grade-info">
                    <p>반/전체 평균</p>
                    <input
                      value={`${item.classAvg || "-"} / ${item.gradeAvg || "-"}`}
                    />
                    점
                  </div>
                  <div className="grade-info">
                    <p>반/전체 등수</p>
                    <input
                      value={`${item.subjectClassRank || "-"} / ${item.subjectGradeRank || "-"}`}
                    />
                    등
                  </div>
                  <div className="info-button">
                    <button
                      onClick={() => {
                        handleSaveOne(item);
                      }}
                    >
                      저장
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="all-grade">
          <div className="grade-rank">
            학년 전체 등수 <input value={gradeRank} /> / {gradeStudentCount} 등
          </div>
          <div className="grade-rank">
            반 등수 <input value={classRank} /> / {classStudentCount} 등
          </div>
        </div>
        <ParentCheckStyle>
          <button ref={signResult1}>학부모 확인</button>
        </ParentCheckStyle>

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
                    <input
                      placeholder="-"
                      value={item.mark || ""}
                      onChange={e => {
                        handleChangeTwo({ ...item, mark: e.target.value });
                      }}
                    />
                    점
                  </div>
                  <div className="grade-info">
                    <p>반/전체 평균</p>
                    <input
                      value={`${item.classAvg || "-"} / ${item.gradeAvg || "-"}`}
                    />
                    점
                  </div>
                  <div className="grade-info">
                    <p>반/전체 등수</p>
                    <input
                      value={`${item.subjectClassRank || "-"} / ${item.subjectGradeRank || "-"}`}
                    />
                    등
                  </div>
                  <div className="info-button">
                    <button
                      onClick={() => {
                        handleSaveOne(item);
                      }}
                    >
                      저장
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="all-grade">
          <div className="grade-rank">
            학년 전체 등수 <input value={gradeRank} /> / {gradeStudentCount} 등
          </div>
          <div className="grade-rank">
            반 등수 <input value={classRank} /> / {classStudentCount} 등
          </div>
        </div>
        <ParentCheckStyle>
          <button ref={signResult2}>학부모 확인</button>
        </ParentCheckStyle>
      </div>
    </div>
  );
};

export default Grade;
