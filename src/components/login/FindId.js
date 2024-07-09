import React from "react";
import LoginIdField from "./LoginIdField";
import LoginPassField from "./LoginPassField";

const FindId = () => {
  return (
    <form className="login-wrap-panel">
      <LoginIdField>이름</LoginIdField>
      <LoginPassField>휴대폰번호</LoginPassField>
      <button className="login-wrap-panel-loginbt">아이디찾기</button>
    </form>
  );
};

export default FindId;
