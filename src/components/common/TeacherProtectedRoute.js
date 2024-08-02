import React from "react";
import { Navigate } from "react-router";
import { getCookie } from "utils/cookie";

const TeacherProtectedRoute = ({ authenticated, component: Component }) => {
  return authenticated ? (
    getCookie("userRole") === "ROLE_TEACHER" ? (
      Component
    ) : (
      <Navigate to="/" {...alert("권한이 없습니다.")}></Navigate>
    )
  ) : (
    <Navigate to="/login" {...alert("로그인이 필요합니다.")}></Navigate>
  );
};

export default TeacherProtectedRoute;
