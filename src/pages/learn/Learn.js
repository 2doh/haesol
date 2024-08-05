import React from "react";
import Vocabulary from "./Vocabulary";
import VocaLearn from "./VocaLearn";
import styled from "@emotion/styled";
import Footer from "components/layout/Footer";
import GreenHeaderNoOption from "components/layout/header/GreenHeaderNoOption";

const Learn = () => {
  return (
    <>
      {/* <GreenHeaderNoOption />
      <WrapStyle>
        <SelectStyle>
          <NavStyle></NavStyle>
          
        </SelectStyle>
      </WrapStyle>
      <Footer /> */}
      <VocaLearn></VocaLearn>
    </>
  );
};

export default Learn;

const WrapStyle = styled.div`
  width: 100%;
  max-width: 1180px;
  height: 100vh;
  margin: 0 auto;
  background-color: #f3f9fa;
  display: flex;
  align-items: center;
`;

const SelectStyle = styled.div`
  width: 100%;
  height: 350px;
  background-color: red;
`;

const NavStyle = styled.div`
  /* width:; */
`;
