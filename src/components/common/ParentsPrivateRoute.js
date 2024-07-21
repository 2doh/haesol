import React from "react";
import { Navigate } from "react-router";
import { getCookie } from "utils/cookie";

const ParentsPrivateRoute = ({ authenticated, component: Component }) => {
  return authenticated ? (
    getCookie("userRole") === "ROLE_PARENTS" ? (
      Component
    ) : (
      <Navigate to="/" {...alert("권한이 없습니다.")}></Navigate>
    )
  ) : (
    <Navigate to="/login" {...alert("로그인이 필요합니다.")}></Navigate>
  );
};

export default ParentsPrivateRoute;
