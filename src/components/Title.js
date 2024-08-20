import { getStudentInfo, getStudentList } from "api/student/studentapi";
import { getTeacherInfo } from "api/teacher/teacherapi";
import { userRoleState } from "atoms/userState";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useRecoilState } from "recoil";
import { getCookie } from "utils/cookie";

const Title = () => {
  const studentPk = getCookie("studentPk");
  const [userRole, setUserRole] = useRecoilState(userRoleState);
  const [userInfo, setUserInfo] = useState("");
  const [userName, setUserName] = useState("");
  // console.log(userRole);

  const studentInfoHandler = async () => {
    if (userRole.role === "ROLE_PARENTS") {
      const result = await getStudentInfo(studentPk);
      // console.log(result.data.studentName);
      setUserName(result.data.studentName);
      const grade = result.data.studentGrade;
      const classNum = result.data.studentClass;
      setUserInfo(`${grade}학년 ${classNum}반`);
    }
    if (userRole.role === "ROLE_TEACHER") {
      const result = await getTeacherInfo(userRole.data.accessToken);
      // console.log(result);
      setUserName(`${result.data.name} 선생님`);
      const grade = result.data.grade;
      const classNum = result.data.class;
      setUserInfo(`${grade}학년 ${classNum}반`);
    }
  };

  useEffect(() => {
    studentInfoHandler();
  }, []);

  return (
    <div className="student-list-title" style={{ margin: 0 }}>
      {/* <!-- 제목 위치 --> */}
      <span>{userInfo}</span>
      <span style={{ marginLeft: "15px" }}>{userName}</span>
    </div>
  );
};

export default Title;
