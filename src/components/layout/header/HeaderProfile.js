import styled from "@emotion/styled";
import React from "react";
import UnauthenticatedProfile from "./UnauthenticatedProfile";
import { getCookie } from "utils/cookie";
import LoginUser from "pages/Home/LoginUser";
import LoginTeahcer from "pages/Home/LoginTeahcer";
import ParentsProfile from "pages/Home/profile/ParentsProfile";
import "../../../scss/main/profile.css";
import TeacherProfile from "pages/Home/profile/TeacherProfile";
import { useNavigate } from "react-router";
import MainBanner from "./MainBanner";

const HeaderProfileStyle = styled.div`
  font-size: 17px;
  position: relative;
  z-index: 998;
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
  }
`;

const HeaderProfile = () => {
  return (
    <HeaderProfileStyle>
      <section className="banner-warp">
        <MainBanner />
      </section>
      <section>
        {!getCookie("accessToken") ? <UnauthenticatedProfile /> : null}
        {getCookie("userRole") === "ROLE_PARENTS" ? <ParentsProfile /> : null}
        {getCookie("userRole") === "ROLE_TEACHER" ? <TeacherProfile /> : null}
      </section>
    </HeaderProfileStyle>
  );
};

export default HeaderProfile;
