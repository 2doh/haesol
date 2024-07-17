import React from "react";
import { Navigate } from "react-router";

export const AuthenticatedRedirect = () => {
  return <Navigate to="/" {...alert("이미 로그인이 되었습니다.")}></Navigate>;
};
