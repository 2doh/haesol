import React from "react";
import RandomAdZone from "../RandomAdZone";
import styled from "@emotion/styled";
import BoxTitle from "components/common/style/BoxTitle";

const PopUpStyle = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 20px 0 0;
`;

const PopUpView = () => {
  return (
    <PopUpStyle>
      <BoxTitle>팝업존</BoxTitle>
      <RandomAdZone />
    </PopUpStyle>
  );
};

export default PopUpView;
