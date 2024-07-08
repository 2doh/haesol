import styled from "@emotion/styled";
import React from "react";

const LoginNavi = ({ setNaviState, naviState }) => {
  return (
    <div className="login-wrap-navi br10">
      <div
        className="selectednavi"
        onClick={() => {
          setNaviState("signin");
        }}
      >
        로그인
      </div>
      <div
        className="unselectednavi"
        onClick={() => {
          setNaviState("find-id");
        }}
      >
        아이디 찾기
      </div>
      <div
        className="unselectednavi"
        onClick={() => {
          setNaviState("fint-pass");
        }}
      >
        비밀번호 찾기
      </div>
    </div>
  );
};

export default LoginNavi;
