import { useEffect } from "react";
import styled from "@emotion/styled";
import "../scss/nonfound.css";
const NotFoundStyle = styled.div`
  /* * {
    box-sizing: border-box;
  }

  .wrapper-404 {
    padding: 0;
    margin: 0;
    font-family: sans-serif;
    background-color: rgb(248, 219, 130);
  }

  p,
  h1,
  h2,
  h3,
  h4 {
    display: inline-block;
    margin-block-start: 0em;
    margin-block-end: 0em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 0px;
  } */
`;

const NotFound = ({ setNotFoundPage }) => {
  return (
    <NotFoundStyle>
      <div className="wrapper-404">
        <div className="wrapper-inner">
          {/* 마커를 보려면 마커에서 d-none을 제거하세요 */}

          {/* 개의 위치 */}
          <div className="marker red d-none"></div>

          {/* 커서 위치 */}
          <div className="marker green d-none"></div>

          {/* 개의 얼굴 위치 */}
          <div className="marker blue d-none"></div>

          <div className="dog">
            <div className="body-wrapper">
              <div className="body img-bg"></div>
            </div>
            <div className="head-wrapper">
              <div className="head img-bg"></div>
            </div>
            <div className="leg-wrapper">
              <div className="leg one img-bg"></div>
            </div>
            <div className="leg-wrapper">
              <div className="leg two img-bg"></div>
            </div>
            <div className="leg-wrapper">
              <div className="leg three img-bg"></div>
            </div>
            <div className="leg-wrapper">
              <div className="leg four img-bg"></div>
            </div>
            <div className="tail-wrapper">
              <div className="tail img-bg"></div>
            </div>
          </div>
        </div>

        <div className="indicator"></div>
        <div className="sign">
          by masahito / <a href="http://www.ma5a.com/">ma5a.com</a>
        </div>
      </div>
    </NotFoundStyle>
  );
};

export default NotFound;
