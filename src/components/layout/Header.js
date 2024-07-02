import React from "react";
import "../../scss/header/header.scss";

const Header = () => {
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
                {" "}
                알림마당
              </a>

              <ul>
                <li></li>
              </ul>
            </ul>
            <ul>
              <div className="logo"></div>
            </ul>
            <ul>
              <a href="" className="menu-main-title">
                {" "}
                선생님 마당{" "}
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
          <div>O</div>
          <div>58분 00초</div>
          <div>
            <input type="button" value="연장" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
