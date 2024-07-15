import AdminHome from "pages/admin/AdminHome";
import React, { useState } from "react";
import { Navigate } from "react-router";
import { getCookie } from "utils/cookie";

const PrivateRoute = ({ authenticated, component: Component }) => {
  const [loginUserType, setLoginUserType] = useState(getCookie("userRole"));
  console.log("권한 : ", loginUserType);

  return authenticated ? (
    getCookie("userRole") === "ROLE_ADMIN" ? (
      <Navigate to="/admin/home" component={<AdminHome />}></Navigate>
    ) : (
      Component
    )
  ) : (
    <Navigate to="/login" {...alert("로그인이 필요합니다.")}></Navigate>
  );
};

export default PrivateRoute;
