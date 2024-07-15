import { useNavigate } from "react-router";
import "../../scss/header/header.css";
import Timer from "./Timer";
import { useEffect, useState } from "react";
import { getCookie, removeCookie } from "utils/cookie";
import { MdOutlineLogout } from "react-icons/md";

const Header = () => {
  const navigate = useNavigate();
  const [loginUserType, setLoginUserType] = useState(getCookie("userRole"));

  useEffect(() => {
    console.log("loginUserType : ", loginUserType);
    // setLoginUserType(getCookie("userRole"));
  }, [loginUserType]);

  /** 메인 페이지로 이동 */
  const moveHomePage = () => {
    navigate("/");
  };

  /** 회원가입 승인 리스트 페이지로 이동 */
  const moveAdminHomePage = () => {
    navigate("/admin");
  };

  /** 로그아웃 기능 */
  const logout = () => {
    removeCookie("accessToken");
    removeCookie("userIdPk");
    removeCookie("userRole");
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="header">
      <div className="header-left-div"></div>
      {loginUserType === "ROLE_ADMIN" ? (
        <div className="header-inner">
          <div className="nav">
            <div className="nav-inner admin-nav-inner">
              <div
                className="logo"
                onClick={() => {
                  moveHomePage();
                }}
              ></div>
              <div className="admin-header-timer-div">
                <div className="inner-div">
                  <Timer></Timer>
                  <div
                    className="logout-icon"
                    onClick={() => {
                      logout();
                    }}
                  >
                    <MdOutlineLogout size="22px" title="로그아웃" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="header-inner">
          <div className="nav">
            <div className="nav-inner">
              <ul>
                <a href="" className="menu-main-title">
                  학교소개
                </a>

                <ul>
                  <li></li>
                </ul>
              </ul>
              <ul>
                <a href="" className="menu-main-title">
                  알림마당
                </a>

                <ul>
                  <li></li>
                </ul>
              </ul>
              <ul>
                <div
                  className="logo"
                  onClick={() => {
                    moveHomePage();
                  }}
                ></div>
              </ul>
              <ul>
                <a
                  href=""
                  className="menu-main-title"
                  onClick={() => {
                    moveAdminHomePage();
                  }}
                >
                  선생님 마당
                </a>

                <ul>
                  <li></li>
                </ul>
              </ul>
              <ul>
                <a href="" className="menu-main-title">
                  온라인 학습
                </a>

                <ul>
                  <li></li>
                </ul>
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="header-right-div">
        {loginUserType !== "ROLE_ADMIN" && loginUserType ? (
          <div className="inner-div">
            <Timer></Timer>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
