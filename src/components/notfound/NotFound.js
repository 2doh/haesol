import React from "react";
import Dog from "./Dog";
import styled from "@emotion/styled";

const DogWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

const NotFound = () => {
  return (
    <DogWrap>
      <Dog></Dog>
    </DogWrap>
  );
};

export default NotFound;
