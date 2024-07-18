import React from "react";
import { Navigate } from "react-router";
import { getCookie } from "utils/cookie";

const TeacherProtectedRoute = ({ authenticated, component: Component }) => {
  //   const [loginUserType, setLoginUserType] = useState(getCookie("userRole"));
  console.log("권한 : ", getCookie("userRole"));

  return !authenticated || getCookie("userRole") !== "ROLE_TEAHCER" ? (
    <Navigate to="/" {...alert("접근 권한이 없습니다.")}></Navigate>
  ) : (
    Component
  );
};

export default TeacherProtectedRoute;
