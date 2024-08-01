import styled from "@emotion/styled";
import { CgMenuGridO } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router";
import { getCookie } from "utils/cookie";

const HeaderTopStyle = styled.div`
  font-size: 17px;
  position: relative;
  z-index: 999;
  height: 70px;
  width: 100%;
  min-width: 900px;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f9fa;

  .header-wrap {
    display: flex;
    position: relative;

    max-width: 1130px;
    /* min-width: 900px; */
    width: 100%;
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
`;

const HeaderTopPublic = () => {
  const navigate = useNavigate();

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
          ) : null}

          <div className="header-seach-menu">
            <div className="header-seach-btn">
              <FiSearch size={30} />
            </div>
            <div className="header-menu-btn">
              <CgMenuGridO size={33} />
            </div>
          </div>
        </div>
      </div>
    </HeaderTopStyle>
  );
};

export default HeaderTopPublic;
