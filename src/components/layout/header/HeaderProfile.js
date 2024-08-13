import styled from "@emotion/styled";
import ParentsProfile from "pages/Home/profile/ParentsProfile";
import TeacherProfile from "pages/Home/profile/TeacherProfile";
import { getCookie } from "utils/cookie";
import "../../../scss/main/profile.css";
import MainBanner from "./MainBanner";
import UnauthenticatedProfile from "./UnauthenticatedProfile";
import useWindowDimensions from "hooks/common/useWindowDimensions";
import { useEffect, useState } from "react";

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

  @media screen and (max-width: 1023px) {
    top: 70px;
    flex-direction: column;
    min-width: 750px;
    gap: 0px;

    .banner-warp {
      width: 100%;
    }

    /* section {
      .main-inner-info {
        .main-login-user-info {
          margin: 0px;

          .main-inner-info-login {
            margin: 0px;
          }
        }
      }
    } */
    /* section:last-of-type {
      padding-bottom: 20px;
    } */
  }
`;

const HeaderProfile = () => {
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
    <HeaderProfileStyle>
      <section className="banner-warp">
        <MainBanner />
      </section>
      {changeStyle ? (
        <section>
          {!getCookie("accessToken") ? <UnauthenticatedProfile /> : null}
          {getCookie("userRole") === "ROLE_PARENTS" ? <ParentsProfile /> : null}
          {getCookie("userRole") === "ROLE_TEACHER" ? <TeacherProfile /> : null}
        </section>
      ) : null}
    </HeaderProfileStyle>
  );
};

export default HeaderProfile;
