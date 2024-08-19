import styled from "@emotion/styled";
import useLogout from "hooks/common/useLogout";
import useWindowDimensions from "hooks/common/useWindowDimensions";
import { useEffect, useRef, useState } from "react";
import { BiSolidArrowToTop } from "react-icons/bi";
import { CgMenuGridO } from "react-icons/cg";
import { HiMenu } from "react-icons/hi";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router";
import { getCookie } from "utils/cookie";
import Timer from "../Timer";

const HeaderTopStyle = styled.div`
  font-size: 17px;
  position: relative;
  z-index: 999;
  height: 70px;
  width: 100%;
  min-width: 530px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f9fa;

  /* 반응형 시, 하단 밑줄 추가 */
  .line-active {
    border-bottom: 1px solid #e6e5e6 !important;
  }

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

  .access-wrap {
    position: absolute;
    right: 92px;
    height: 90%;
    border-radius: 15px 15px 0 0;
    background-color: #2b708978;
    padding: 10px 10px 10px 10px;
    top: 5px;
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

    .access-wrap {
      height: 65%;
      border-radius: 15px;
      position: static;

      .timer-wrap {
        & > :nth-of-type(2) {
          min-width: 65px;
        }
      }

      .logout-icon {
        padding-left: 5px;
      }
    }
  }
`;

const HeaderTopPublic = () => {
  const navigate = useNavigate();
  const [changeStyle, setChangeStyle] = useState(true);
  const { height, width } = useWindowDimensions();

  const header = useRef(null);

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

  /** 반응형 시, 하단 밑줄 추가 */
  useEffect(() => {
    const headerActiveClass = "line-active";
    const headerActiveValue = 0;

    function showLine(_html, _tgY, _active, _scY) {
      if (_html && _html.classList) {
        // _html이 null이 아니고 classList가 존재하는지 확인
        if (_scY > _tgY) {
          _html.classList.add(_active);
        } else {
          _html.classList.remove(_active);
        }
      }
    }

    if (header.current) {
      // header.current가 null이 아닌지 확인
      showLine(
        header.current,
        headerActiveValue,
        headerActiveClass,
        window.scrollY,
      );
      window.addEventListener("scroll", () => {
        showLine(
          header.current,
          headerActiveValue,
          headerActiveClass,
          window.scrollY,
        );
      });
    }

    return () => {
      if (header.current) {
        window.removeEventListener("scroll", () => {
          showLine(
            header.current,
            headerActiveValue,
            headerActiveClass,
            window.scrollY,
          );
        });
      }
    };
  }, []);

  return (
    <HeaderTopStyle>
      <div className="header-wrap" ref={header}>
        <div className="header-logo-div">
          <div
            className="logo"
            onClick={() => {
              moveHomePage();
            }}
          ></div>
        </div>

        <div className="header-btn-div">
          {!getCookie("accessToken") ? (
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
          ) : (
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
          )}

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
