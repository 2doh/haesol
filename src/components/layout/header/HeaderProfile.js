import styled from "@emotion/styled";
import React from "react";
import UnauthenticatedProfile from "./UnauthenticatedProfile";

const HeaderProfileStyle = styled.div`
  font-size: 17px;
  position: relative;
  z-index: 999;
  min-height: 80px;
  width: 100%;
  min-width: 1000px;
  display: flex;
  align-items: center;
  gap: 50px;
  background-color: #f3f9fa;

  .banner-warp {
    padding: 20px 0px;
    width: 60%;

    .banner {
      height: 300px;
      width: 100%;
      background-color: #dbebee;
      border-radius: 0px 50px 50px 0px;

      /* 나중에 삭제 */
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const HeaderProfile = () => {
  return (
    <HeaderProfileStyle>
      <section className="banner-warp">
        <div className="banner">배너</div>
      </section>
      <section>
        <UnauthenticatedProfile />
      </section>
    </HeaderProfileStyle>
  );
};

export default HeaderProfile;
