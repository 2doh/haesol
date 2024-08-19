import styled from "@emotion/styled";
import { useNavigate } from "react-router";
import { MdHearing } from "react-icons/md";
import { RiSpeakFill } from "react-icons/ri";
import { TbWriting } from "react-icons/tb";

// Define constants for reusable styles
const skewAngle = "15deg";
const panelX = "40px";
const panelY = "50px";
const contrast = "15%";

const defaultBg = "#1a2e5b"; // darken(#2896d7, 40%) can be approximated or preprocessed
const altBg1 = "#c34a1f"; // darken(#f06826, 20%) can be approximated or preprocessed
const altBg2 = "#a01b4b"; // darken(#c82672, 10%) can be approximated or preprocessed
const altBg3 = "#b74e27"; // darken(desaturate(#f65429, 33%), 20%) can be approximated or preprocessed

const SubSubjectsListWrapStyle = styled.div`
  min-height: 150px;
  padding: 0 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 80px;

  .sub-subjects-list-inner {
    background: #c2d3d5;
    width: 100%;
    height: 100%;
    padding: 0px 50px 15px 50px;
    border-radius: 50px;
  }

  .english-buttons {
    min-height: 150px;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 80px;

    & button {
      width: 100%;
      height: 100%;
      /* height: 130px; */
    }
  }

  .container {
    width: 800px;
    margin: auto;
    padding-bottom: 10px;
  }

  .row {
    position: relative;
    height: 50px;
    z-index: 1;
    clear: both;
    margin-bottom: 30px;
    text-align: center;
  }

  .skew-title {
    font-size: calc(${panelY} / 2);
    top: -20px;

    span {
      position: relative;
      display: inline-block;
      width: ${panelX};
      height: ${panelY};
      margin: auto;
      z-index: 2;
      text-align: center;
      color: #fff;
      font-family: "Roboto Condensed";
      font-weight: 700;
      font-size: calc(${panelY} / 1.4);
      line-height: ${panelY};
      transform: skewY(-${skewAngle});
      transform-origin: 0 100%;
      transition: all 0.2s;
      cursor: default;

      &:after,
      &:before {
        display: block;
        top: 0;
        left: 0;
        width: ${panelX};
        height: ${panelY};
        position: absolute;
        background: ${defaultBg};
        content: " ";
        z-index: -1;
        transition: all 0.2s;
      }

      &:before {
        background: rgba(0, 0, 0, 0.1);
        transform: skewY(${skewAngle});
        transform-origin: 0 0;
      }

      &:nth-of-type(even) {
        background-color: darken(${defaultBg}, ${contrast});
        transform: skewY(${skewAngle});
        transform-origin: 100% 100%;
        color: darken(#fff, ${contrast});

        &:after {
          background-color: darken(${defaultBg}, ${contrast});
        }

        &:before {
          transform-origin: 100% 0;
          transform: skewY(-${skewAngle});
        }
      }

      &.flat {
        transform: skewY(0);
        color: #fff;

        &:before {
          transform: skewY(0);
        }

        &:nth-of-type(even) {
          &:after {
            background-color: ${defaultBg};
          }
        }
      }

      &.alt {
        &:after {
          background-color: ${altBg1};
        }

        &:nth-of-type(even) {
          &:after {
            background-color: darken(${altBg1}, ${contrast});
          }
        }

        &.flat {
          &:nth-of-type(even) {
            &:after {
              background-color: ${altBg1};
            }
          }
        }
      }
    }
  }
`;

const SubSubjectsListWrap = () => {
  const navigate = useNavigate();

  const movePage = type => {
    navigate("/learn/voca", { state: { type: type } });
  };

  return (
    <SubSubjectsListWrapStyle>
      <div className="sub-subjects-list-inner">
        <div className="container">
          <h1 className="row skew-title">
            <span>S</span>
            <span>T</span>
            <span>U</span>
            <span>D</span>
            <span className="last">Y</span>
            &nbsp;
            <span className="alt">E</span>
            <span className="alt">N</span>
            <span className="alt">G</span>
            <span className="alt">L</span>
            <span className="alt">I</span>
            <span className="alt">S</span>
            <span className="alt last">H</span>
          </h1>
        </div>

        <div className="english-buttons">
          <button
            className="button-1"
            role="button"
            onClick={() => movePage("말하기")}
          >
            <span className="button-1-shadow"></span>
            <span className="button-1-edge"></span>
            <span className="button-1-front text">
              <RiSpeakFill size={50} />
              Speaking
            </span>
          </button>
          <button
            className="button-1"
            role="button"
            onClick={() => movePage("듣기")}
          >
            <span className="button-1-shadow"></span>
            <span className="button-1-edge"></span>
            <span className="button-1-front text">
              <MdHearing size={50} />
              Listening
            </span>
          </button>
          <button
            className="button-1"
            role="button"
            onClick={() => movePage("쓰기")}
          >
            <span className="button-1-shadow"></span>
            <span className="button-1-edge"></span>
            <span className="button-1-front text">
              <TbWriting size={50} />
              Writing
            </span>
          </button>
        </div>
      </div>
    </SubSubjectsListWrapStyle>
  );
};

export default SubSubjectsListWrap;
