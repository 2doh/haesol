import styled from "@emotion/styled";
import React from "react";
import { useNavigate } from "react-router";

const SubjectsListWrapStyle = styled.div`
  padding: 0 100px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  .box {
    cursor: pointer;
    width: 200px;
    height: 200px;
    background-color: violet;
  }
`;

const SubjectsListWrap = () => {
  const navigate = useNavigate();

  const movePage = pageNnum => {
    switch (pageNnum) {
      case 1:
        navigate("/selftest");
        break;

      default:
        break;
    }
  };
  return (
    <SubjectsListWrapStyle>
      <div
        className="box"
        onClick={() => {
          movePage(1);
        }}
      >
        국어
      </div>
      <div className="box">수학</div>
      <div className="box">영어</div>
      <div className="box">...</div>
    </SubjectsListWrapStyle>
  );
};

export default SubjectsListWrap;
