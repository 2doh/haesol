import styled from "@emotion/styled";
import { useNavigate } from "react-router";
import "../../../scss/header/header.css";
import { getCookie, removeCookie } from "utils/cookie";
import { useState } from "react";
import Timer from "../Timer";
import { MdOutlineLogout } from "react-icons/md";
import useLogout from "hooks/common/useLogout";

const GreenHeaderNoOptionStyle = styled.div`
  position: relative;
  z-index: 999;
  height: 70px;
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #5f909f;

  .header-wrap {
    display: flex;
    position: relative;
    flex-direction: row;

    max-width: 1130px;
    width: 100%;
    height: 100%;

    .header-logo-div {
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;

      display: flex;
      align-items: center;
    }
  }

  .access-wrap {
    position: absolute;
    right: 0;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;

    .timer-wrap {
      & > div:not(:last-of-type) * {
        color: white;
      }

      & > div:first-of-type {
        /* padding-bottom: 5px; */
      }

      display: flex;
      flex-direction: row;
      align-items: center;
    }

    .logout-icon {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-left: 20px;

      & * {
        color: #113f4d;
      }
    }
  }
`;

const GreenHeaderNoOption = () => {
  const navigate = useNavigate();

  const [loginUserType, setLoginUserType] = useState(getCookie("userRole"));

  /** 메인 페이지로 이동 */
  const moveHomePage = () => {
    navigate("/");
  };

  return (
    <GreenHeaderNoOptionStyle>
      <div className="header-wrap">
        <div className="header-logo-div">
          <div
            className="logo"
            onClick={() => {
              moveHomePage();
            }}
          ></div>
        </div>

        {getCookie("accessToken") ? (
          <div className="access-wrap">
            <div className="timer-wrap">
              <Timer />
            </div>
            <div
              className="logout-icon"
              onClick={() => {
                useLogout();
              }}
            >
              <MdOutlineLogout size="22px" title="로그아웃" />
            </div>
          </div>
        ) : null}
      </div>
    </GreenHeaderNoOptionStyle>
  );
};

export default GreenHeaderNoOption;
