import { useNavigate } from "react-router";
import "../../scss/header/header.css";
import Timer from "./Timer";

const Header = () => {
  const navigate = useNavigate();

  /** 메인 페이지로 이동 */
  const moveHomePage = () => {
    navigate("/");
  };

  return (
    <div className="header">
      <div className="header-left-div"></div>
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
              <a href="" className="menu-main-title">
                선생님 마당
              </a>

              <ul>
                <li></li>
              </ul>
            </ul>
            <ul>
              <a href="" className="menu-main-title">
                온라인 학습{" "}
              </a>

              <ul>
                <li></li>
              </ul>
            </ul>
          </div>
        </div>
      </div>

      <div className="header-right-div">
        <div className="inner-div">
          <Timer></Timer>
        </div>
      </div>
    </div>
  );
};

export default Header;
