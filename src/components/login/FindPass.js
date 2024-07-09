import React from "react";

const FindPass = () => {
  return (
    <form className="login-wrap-panel">
      <LoginIdField>이름</LoginIdField>
      <LoginPassField>휴대폰번호</LoginPassField>
      <button className="login-wrap-panel-loginbt">아이디찾기</button>
    </form>
  );
};

export default FindPass;
