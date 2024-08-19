import { getStudentInfo } from "api/student/studentapi";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCookie } from "utils/cookie";

const StudentClassInfo = () => {
  const userClass = getCookie("userClass");
  const userGrade = getCookie("userGrade");
  const userName = getCookie("userName");
  const { studentPk } = useParams();
  // const [studentInfo, setStudentInfo] = useState({});
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [studentGrade, setStudentGrade] = useState("");

  // 학생 정보 불러오기
  const studentInfoData = async () => {
    try {
      const response = await getStudentInfo(studentPk);
      const result = response.data;

      setStudentClass(result.studentClass);
      setStudentGrade(result.studentGrade);
      setStudentName(result.studentName);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // 학생 데이터 불러오기
    studentInfoData();
  }, [studentPk]);

  return (
    <>
      <span>
        {userGrade || studentGrade}학년 {userClass || studentClass}반
      </span>
      {studentName ? <p>{studentName}</p> : null}
    </>
  );
  // 확인용
};

export default StudentClassInfo;
