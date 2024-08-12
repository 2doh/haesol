import { getStudentInfo } from "api/student/studentapi";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getCookie } from "utils/cookie";

const StudentClassInfo = () => {
  //   getCookie("studentPk");
  //   const studentPk = 1;

  const { studentPk } = useParams();
  const [studentInfo, setStudentInfo] = useState({});
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [studentGrade, setStudentGrade] = useState("");

  // 학생 정보 불러오기
  const studentInfoData = async () => {
    try {
      const response = await getStudentInfo(studentPk);
      const result = response.data;
      setStudentInfo(result);
      setStudentName(result.studentName);
      setStudentClass(result.studentClass);
      setStudentGrade(result.studentGrade);
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
        {studentGrade}학년 {studentClass}반
      </span>
      <p>{studentName}</p>
    </>
  );
};

export default StudentClassInfo;
