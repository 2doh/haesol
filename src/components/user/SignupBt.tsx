import styled from "@emotion/styled";
import React from "react";
import { useNavigate } from "react-router";

// 버튼 컴포넌트의 스타일 정의
const BtWrapStyle = styled.div`
  margin: 30px auto 0;
  display: flex;
  gap: 10px;
  /* justify-content: center; */
`;

const BtStyle = styled.button`
  /* padding: 10px 50px; */
  width: 50%;
  height: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
  border-radius: 5px;
`;

const SignupBt: React.FC = () => {
  const navigate = useNavigate();

  return (
    <BtWrapStyle>
      <BtStyle
        style={{
          border: "1px solid #a8172a",
          backgroundColor: "#dd838f",
          color: "#fff",
        }}
      >
        회원가입
      </BtStyle>
      <BtStyle
        onClick={() => {
          navigate("/");
        }}
        style={{
          border: "1px solid #a8172a",
          backgroundColor: "#fff",
          color: "#dd838f",
        }}
      >
        취소
      </BtStyle>
    </BtWrapStyle>
  );
};

export default SignupBt;
