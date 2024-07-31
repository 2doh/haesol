import styled from "@emotion/styled";
import React from "react";

const TestTitleStyle = styled.div`
  width: 100%;
  height: 60px;
  background-color: #dff0f2;
  color: #1b4957;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 20px;
  font-weight: bold;
`;

const TestTitle = () => {
  // 나중에 데이터 받아노는 걸로 수정
  return <TestTitleStyle>학년 : 5학년 | 과목 : 국어</TestTitleStyle>;
};

export default TestTitle;
