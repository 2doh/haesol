import React from "react";
import { Navigate } from "react-router";

const PrivateRoute = ({ authenticated, component: Component }) => {
  //   console.log("권한 : ", authenticated[0]);

  return authenticated ? (
    Component
  ) : (
    <Navigate to="/login" {...alert("로그인이 필요합니다.")}></Navigate>
  );
};

export default PrivateRoute;
