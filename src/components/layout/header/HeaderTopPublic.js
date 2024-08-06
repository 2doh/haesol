import styled from "@emotion/styled";
import useWindowDimensions from "hooks/common/useWindowDimensions";
import { useEffect, useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router";
import { getCookie } from "utils/cookie";
import { BiSolidArrowToTop } from "react-icons/bi";
import { HiMenu } from "react-icons/hi";

const HeaderTopStyle = styled.div`
  font-size: 17px;
  position: relative;
  z-index: 999;
  height: 70px;
  width: 100%;
  min-width: 360px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f9fa;

  .header-wrap {
    display: flex;
    position: relative;
    width: 1023px;
    /* min-width: 900px; */
    /* width: 100%; */
    height: 100%;

    .header-logo-div {
      width: inherit;
      height: inherit;
      display: flex;
      align-items: center;
    }
    .header-btn-div {
      position: absolute;
      bottom: 0;
      right: 0;

      display: flex;
      flex-direction: row;
      gap: 5px;

      .header-seach-menu,
      .header-login-signup {
        display: flex;
        flex-direction: row;
        gap: 5px;

        & > div {
          cursor: pointer;
        }
      }

      .header-seach-menu {
        & > div {
          border: 2px solid #add2d8;
          border-bottom: 0px;
          border-radius: 50px 50px 0px 0px;
          width: 80px;
          height: 50px;
          background-color: white;

          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .header-login-signup {
        align-items: center;
        & > div {
          font-weight: bold;
          padding-right: 20px;
          bottom: 0;
          color: #031929;
        }
      }
    }
  }

  @media screen and (max-width: 1023px) {
    position: fixed;
    z-index: 999999;
    top: 0;
    .header-wrap {
      width: 100%;

      .header-logo-div {
      }
      .header-btn-div {
        height: 100%;
        display: flex;
        align-items: center;

        .header-seach-menu,
        .header-login-signup {
        }
      }

      .header-seach-menu {
        height: calc(100% - 10px);
        background-color: #add2d8;
        padding: 3px 30px 3px 20px;
        border-radius: 50px 0 0 50px;

        & > div {
          width: 50px !important;
          border-radius: 50px !important;
        }
      }
      .header-login-signup {
        & > div {
        }
      }
    }
  }
`;

const HeaderTopPublic = () => {
  const navigate = useNavigate();
  const [changeStyle, setChangeStyle] = useState(true);
  const { height, width } = useWindowDimensions();

  /** 메인 페이지로 이동 */
  const moveHomePage = () => {
    navigate("/");
  };

  const moveLoginPage = () => {
    navigate("/login");
  };

  const moveSingupPage = () => {
    navigate("/signup");
  };

  useEffect(() => {
    if (width < 1023) {
      setChangeStyle(false);
    } else {
      setChangeStyle(true);
    }
  }, [width]);

  /** 페이지 맨 위로 이동 */
  const MoveToTop = () => {
    // top:0 >> 맨위로  behavior:smooth >> 부드럽게 이동할수 있게 설정하는 속성
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <HeaderTopStyle>
      <div className="header-wrap">
        <div className="header-logo-div">
          <div
            className="logo"
            onClick={() => {
              moveHomePage();
            }}
          ></div>
        </div>

        <div className="header-btn-div">
          {!getCookie("accessToken") && changeStyle ? (
            <div className="header-login-signup">
              <div
                className="header-login"
                onClick={() => {
                  moveLoginPage();
                }}
              >
                로그인
              </div>
              <div
                className="header-signup"
                onClick={() => {
                  moveSingupPage();
                }}
              >
                회원가입
              </div>
            </div>
          ) : null}

          <div className="header-seach-menu">
            {changeStyle ? null : (
              <div className="header-top-move-btn" onClick={() => MoveToTop()}>
                <BiSolidArrowToTop size={30} />
              </div>
            )}
            {/* <div className="header-seach-btn">
              <FiSearch size={30} />
            </div> */}
            <div className="header-menu-btn">
              <CgMenuGridO size={33} />
            </div>
            {changeStyle ? null : (
              <div className="header-hamburger-menu-btn">
                <HiMenu size={30} />
              </div>
            )}
          </div>
        </div>
      </div>
    </HeaderTopStyle>
  );
};

export default HeaderTopPublic;
