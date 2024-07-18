import React from "react";
import { useParams, Navigate } from "react-router";
import { getCookie } from "utils/cookie";
import Grade from "pages/grade/Grade";
import GradeView from "pages/grade/GradeView";

const GradeAuthRedirect = ({ authenticated }) => {
  const userRole = getCookie("userRole");
  console.log(userRole);
  const { studentPk } = useParams(); // URL 파라미터에서 studentPk 가져오기

  if (!authenticated) {
    alert("로그인이 필요합니다.");
    return <Navigate to="/login" />;
  }

  if (!studentPk) {
    alert("학생 ID가 없습니다.");
    return <Navigate to="/login" />;
  }

  // 사용자 역할에 따라 컴포넌트를 선택하여 렌더링합니다.
  switch (userRole) {
    case "ROLE_TEAHCER":
      return <Grade studentPk={studentPk} />;
    case "ROLE_PARENTS":
      return <GradeView studentPk={studentPk} />;
    default:
      return <Navigate to="/login" />;
  }
};

export default GradeAuthRedirect;
