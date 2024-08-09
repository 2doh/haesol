import React, { useEffect, useState } from "react";
import RandomAdZone from "./RandomAdZone";
import styled from "@emotion/styled";
import BoxTitle from "components/common/style/BoxTitle";
import useWindowDimensions from "hooks/common/useWindowDimensions";
import PageTitle from "components/common/style/PageTitle";

const PopUpStyle = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 20px 0 0;
  @media screen and (max-width: 1023px) {
    padding: 0;

    & > div:first-of-type {
      /* padding: 10px 0 0 40px; */
      padding: 0;
      text-align: center;
    }

    & > div:last-of-type {
      margin-top: 20px;
      padding: 0 20px;
    }

    span {
      font-size: 24px !important;
    }
  }
`;

const PopUpView = () => {
  const { height, width } = useWindowDimensions();
  const [changeStyle, setChangeStyle] = useState(true);

  useEffect(() => {
    if (width < 1023) {
      setChangeStyle(false);
    } else {
      setChangeStyle(true);
    }
  }, [width]);

  return (
    <PopUpStyle>
      {changeStyle ? (
        <BoxTitle>팝업존</BoxTitle>
      ) : (
        <PageTitle>팝업존</PageTitle>
      )}

      <RandomAdZone />
    </PopUpStyle>
  );
};

export default PopUpView;
