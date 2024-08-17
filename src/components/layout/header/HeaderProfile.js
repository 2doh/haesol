import styled from "@emotion/styled";
import ParentsProfile from "pages/Home/profile/ParentsProfile";
import TeacherProfile from "pages/Home/profile/TeacherProfile";
import { getCookie } from "utils/cookie";
import "../../../scss/main/profile.css";
import MainBanner from "./MainBanner";
import UnauthenticatedProfile from "./UnauthenticatedProfile";
import useWindowDimensions from "hooks/common/useWindowDimensions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import StudentProfile from "pages/Home/profile/StudentProfile";

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

  .not-access-service-menu-wrap {
    width: 100%;
    border-radius: 20px;
    background-color: #c8dfe6;
    box-shadow: inset 0 0 4px;

    .menu-header {
      font-size: 20px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .menu-body {
      display: flex;
      flex-direction: row;
      /* gap: 10px; */
      justify-content: space-between;
      padding: 20px;
      padding-top: 10px;
      height: 80px;

      .menu-btn {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;

        height: 100%;
        border-radius: 10px;
        /* flex-grow: 1; */
        width: 30%;
        /* background-color: white; */
        font-size: 15px;
      }
    }
  }

  .profile-label {
    width: 100%;
    display: flex;
    justify-content: center;
    .user-type-label-wrap {
      box-shadow: 2px 2px 3px 0px #c1c1c1;

      width: 80%;
      height: 100%;

      background-color: white;
      border-radius: 5px;
      padding: 5px;

      .user-type-label {
        border: red 5px solid;
        padding: 7px;
        border-radius: 3px;

        .user-type-label-inner {
          border: red 2px solid;
          padding: 10px;
          border-radius: inherit;
          text-align: center;

          span {
            text-align: center;
          }
        }
      }
    }
  }

  .text-3d {
    line-height: 1.2em;
    color: white;
    font-weight: bold;
    font-size: 50px;
    text-shadow:
      0px 0px 0 rgb(214, 214, 214),
      1px 1px 0 rgb(183, 183, 183),
      2px 2px 0 rgb(152, 152, 152),
      3px 3px 2px rgba(0, 0, 0, 0.25),
      3px 3px 1px rgba(0, 0, 0, 0.5),
      0px 0px 2px rgba(0, 0, 0, 0.2);
  }

  input[type="button"] {
  border: 1px solid #0f988e;
  letter-spacing: 1px;
  padding: 0;
  text-align: center;
  width: 100px;
  display: block;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  text-transform: uppercase;
  font-weight: normal;
  border-radius: 3px;
  outline: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  top: -3px;
  transform: translateY(0px);
  position: relative;
  box-shadow: inset 0 30px 30px -15px rgba(255,255,255,.1), inset 0 0 0 1px rgba(255,255,255,.3), inset 0 1px 20px rgba(0,0,0,0), 0 3px 0 #0f988e, 0 3px 2px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.1), 0 10px 20px rgba(0,0,0,.1);
  background: #37c0b6;
  /* background: #15ccbe; */
  color: white;
  text-shadow: 0 1px 0 rgba(0,0,0,.3);
  transition: 150ms all;
  -webkit-transition 150ms all;
  -moz-transition: 150ms all;
  -o-transition: 150ms all;
  -ms-transition: 150ms all;
}

input[type="button"]:active {
  transform: translateY(3px);
  box-shadow: inset 0 16px 2px -15px rgba(0,0,0,0), inset 0 0 0 1px rgba(255,255,255,.15), inset 0 1px 20px rgba(0,0,0,.1), 0 0 0 #0f988e, 0 0 0 2px rgba(255,255,255,.5), 0 0 0 rgba(0,0,0,0), 0 0 0 rgba(0,0,0,0);
}

input[type="button"][disabled] {
  cursor: default;
  background: #eee;
  color: #bbb;
  border-color: #bbb;
  text-shadow: 0 1px 0 white;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,1), inset 0 1px 20px rgba(0,0,0,0), 0 3px 0 #bbb, 0 0 0 1px white, 0 3px 0 1px white, 0 10px 20px rgba(0,0,0,0);
  top: -3px;
  transition: none;
  -webkit-transition: none;
  -moz-transition: none;
  -o-transition: none;
  -ms-transition: none;
}

input[type="button"][disabled]:active {
  top: -2px;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,1), inset 0 1px 20px rgba(0,0,0,0), 0 2px 0 #bbb, 0 0 0 1px white, 0 2px 0 1px white, 0 10px 20px rgba(0,0,0,0);
}

`;

const HeaderProfile = () => {
  const navigate = useNavigate();

  const { height, width } = useWindowDimensions();
  const [changeStyle, setChangeStyle] = useState(true);

  useEffect(() => {
    if (width < 1023) {
      setChangeStyle(false);
    } else {
      setChangeStyle(true);
    }
  }, [width]);

  const userType = () => {
    if (getCookie("userRole") === "ROLE_PARENTS") {
      return "학부모";
    }
    if (getCookie("userRole") === "ROLE_TEACHER") {
      return "교직원";
    }
    if (getCookie("userRole") === "ROLE_STUDENT") {
      return "학생";
    }
  };

  const movePage = () => {
    alert("로그인 해주세요.");
    navigate("/login");
  };

  return (
    <HeaderProfileStyle>
      <section className="banner-warp">
        <MainBanner />
      </section>
      {changeStyle ? (
        <section>
          {getCookie("accessToken") ? (
            <div className="profile-label">
              <div className="user-type-label-wrap">
                <div className="user-type-label">
                  <div className="user-type-label-inner">
                    <span>{userType()}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {!getCookie("accessToken") ? (
            <div className="not-access-service-menu-wrap">
              <div className="menu-header text-3d">퀵메뉴</div>
              <div className="menu-body">
                <input
                  type="button"
                  value="시간표"
                  className="menu-btn timetable-menu"
                  onClick={() => {
                    movePage();
                  }}
                ></input>
                <input
                  type="button"
                  value="알림장"
                  className="menu-btn notice-menu"
                  onClick={() => {
                    movePage();
                  }}
                ></input>
                <input
                  type="button"
                  value="채팅"
                  className="menu-btn chat-menu"
                  onClick={() => {
                    movePage();
                  }}
                ></input>
              </div>
            </div>
          ) : null}

          {!getCookie("accessToken") ? <UnauthenticatedProfile /> : null}
          {/* {getCookie("userRole") === "ROLE_PARENTS" ? <ParentsProfile /> : null} */}
          {/* <StudentProfile /> */}
          {getCookie("userRole") === "ROLE_PARENTS" ? <ParentsProfile /> : null}
          {getCookie("userRole") === "ROLE_TEACHER" ? <TeacherProfile /> : null}
        </section>
      ) : null}
    </HeaderProfileStyle>
  );
};

export default HeaderProfile;
