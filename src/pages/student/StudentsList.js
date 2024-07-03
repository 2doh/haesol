import React, { useState } from "react";
import "../../scss/student/studentList.scss";
import { useNavigate } from "react-router";
const StudentsList = () => {
  // 반 정보
  const [gradeClass, setGradeClass] = useState("5학년 7반");
  // 학생 리스트 정보
  const [studentNumber, setStudentNumber] = useState(1);
  const [studentName, setStudentName] = useState("김누구");
  const [studentGender, setStudentGendr] = useState("여자");
  const [studentBirth, setStudentBirth] = useState("010102");
  const [studentPhone, setStudentPhone] = useState("010-1234-5687");
  const [parentsName, setParentsName] = useState("김구누");
  const [parentsPhone, setParentsPhone] = useState("010-9876-5612");

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/students/edit`);
  };

  return (
    <div className="main-core">
      <div className="student-list-title">
        {/* <!-- 제목 위치 --> */}
        <span>{gradeClass}</span>
      </div>
      {/* <!-- 리스트 --> */}
      <div className="list-wrap">
        {/* <!-- 리스트 타이틀 --> */}
        <div className="list-title">
          <ul>
            <li>번호</li>
            <li>이름</li>
            <li>성별</li>
            <li>생년월일</li>
            <li>전화번호</li>
            <li>학부모</li>
            <li>학부모 전화번호</li>
          </ul>
        </div>
        {/* <!-- 학생 리스트 --> */}
        {/* map 돌려서 아래로 추가되게 해야할것같다... 
        컴포넌트로 뽑아야 하나? 고민...*/}
        <div
          className="list-content"
          onClick={() => {
            handleClick();
          }}
        >
          <ul>
            <li>{studentNumber}번</li>
            <li>{studentName}</li>
            <li>{studentGender}</li>
            <li>{studentBirth}</li>
            <li>{studentPhone}</li>
            <li>{parentsName}</li>
            <li>{parentsPhone}</li>
          </ul>
        </div>
        <div className="list-content">
          <ul>
            <li>{studentNumber}번</li>
            <li>{studentName}</li>
            <li>{studentGender}</li>
            <li>{studentBirth}</li>
            <li>{studentPhone}</li>
            <li>{parentsName}</li>
            <li>{parentsPhone}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StudentsList;
