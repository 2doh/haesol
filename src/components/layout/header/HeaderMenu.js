import styled from "@emotion/styled";
import useWindowDimensions from "hooks/common/useWindowDimensions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IoMdArrowDropdownCircle } from "react-icons/io";

const HeaderMemuStyle = styled.div`
  font-size: 17px;
  position: relative;
  z-index: 999;
  height: 65px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f9fa;

  .header-menu-wrap {
    display: flex;
    position: absolute;
    left: 0;

    width: calc(100% - 10%);
    max-width: 2000px;
    min-width: 1285px;

    border-radius: 0px 50px 50px 0px;

    /* width: 100%; */
    height: 100%;
    background-color: #5f909f;

    margin-right: 60px;

    .header-menu-inner {
      display: flex;
      justify-content: center;

      position: absolute;
      width: 100vw;
      height: 100%;
      overflow: hidden;
      /* margin-right: 130px; */
      /* padding: 0px 180px; */

      & > ul {
        /* position: relative; */

        height: 100%;
        width: 100%;
        max-width: 1023px;

        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
      }

      & > ul > li {
        /* position: relative; */
        white-space: nowrap;
        font-size: 22px;
        cursor: pointer;
        z-index: 1000;
        /* width: 100%; */

        h2 {
          a {
            color: white;
          }
        }

        .navi_sub {
          display: none;

          position: fixed;
          padding: 14px 4px 11px;
          z-index: 999;

          left: 116px;
          top: 130px;
          width: 188px;
          /* margin-left: -105px; */

          border-radius: 30px 30px 5px 5px;
          box-shadow: 0px 2px 5px 0px rgba(7, 7, 7, 0.2);
          background: #fff;
          /* box-sizing: border-box; */

          .navi_arrow_icon {
            position: absolute;
            top: -11px;
            left: 50%;
            transform: translateX(calc(-50% + 0.5px));
            text-align: center;
            width: 50px;
            height: 23px;
            z-index: 1;

            path {
              color: #385f72;
            }
          }

          .depth2 {
            & > li {
              & > a {
                display: block;
                line-height: 130%;
                padding: 13px 7px;
                text-align: center;
                font-size: 15px;
                color: #000;
                font-weight: 400;
                word-break: keep-all;
                border-bottom: 2px dashed #ced4da;
                /* background: url(../images/main/gray_line.jpg) repeat-x left bottom; */

                span {
                  word-break: keep-all;
                  font-size: 18px;
                }
                span:hover {
                  color: #385f72;
                  font-weight: bold;
                }
              }

              &:last-child > a {
                border-bottom: 0px;
              }
            }
          }
        }

        .navi_sub::after {
          width: calc(100% - 8px);
          background: #385f72;
          height: 4px;
          bottom: 3px;

          content: "";
          display: block;
          clear: both;
          position: absolute;
        }
      }

      & > ul > li:hover {
        background-color: rgba(173, 210, 216, 0.5);
        padding: 12px 15px;
        margin: 0px -15px;
        border-radius: 50px;

        .navi_sub {
          display: block;
        }
      }
    }
  }
`;

const HeaderMemu = () => {
  const navigate = useNavigate();
  const [changeStyle, setChangeStyle] = useState(true);
  const { height, width } = useWindowDimensions();

  useEffect(() => {
    if (width < 1023) {
      setChangeStyle(false);
    } else {
      setChangeStyle(true);
    }
  }, [width]);

  const moveMyPage = pageNum => {
    switch (pageNum) {
      case 1:
        navigate("/notice/list/classid");
        break;
      case 2:
        navigate("/test");
        break;
      case 3:
        console.log("설정 안됬어요.");
        // navigate("/selftest");
        break;
      case 4:
        navigate("/online/test/create");
        break;
      case 5:
        navigate("/selftest");
        break;
      default:
        break;
    }
  };

  return (
    <>
      {changeStyle ? (
        <HeaderMemuStyle>
          <div className="header-menu-wrap">
            <nav className="header-menu-inner">
              <ul>
                <li
                  onClick={() => {
                    moveMyPage(1);
                  }}
                >
                  <h2>
                    <a>알림 마당</a>
                  </h2>
                  <div className="navi_sub">
                    <div className="navi_arrow_icon">
                      <IoMdArrowDropdownCircle size={30} />
                    </div>

                    <ul className="depth2">
                      <li>
                        <a>
                          <span>서브 메뉴 1</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span>서브 메뉴 2</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span>서브 메뉴 3</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span>서브 메뉴 4</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li
                  onClick={() => {
                    moveMyPage(2);
                  }}
                >
                  <h2>
                    <a>학생 마당</a>
                  </h2>
                </li>
                <li
                  onClick={() => {
                    moveMyPage(3);
                  }}
                >
                  <h2>
                    <a>학부모 마당</a>
                  </h2>
                  {/* <div className="navi_sub">
                    <div className="navi_arrow_icon">
                      <IoMdArrowDropdownCircle size={30} />
                    </div>

                    <ul className="depth2">
                      <li>
                        <a>
                          <span>서브 메뉴 1</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span>서브 메뉴 2</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span>서브 메뉴 3</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span>서브 메뉴 4</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span>서브 메뉴 5</span>
                        </a>
                      </li>
                    </ul>
                  </div> */}
                </li>
                <li
                  onClick={() => {
                    moveMyPage(4);
                  }}
                >
                  <h2>
                    <a>선생님 마당</a>
                  </h2>
                </li>
                <li
                  onClick={() => {
                    moveMyPage(5);
                  }}
                >
                  <h2>
                    <a>온라인 학습</a>
                  </h2>
                </li>
              </ul>
            </nav>
          </div>
        </HeaderMemuStyle>
      ) : null}
    </>
  );
};

export default HeaderMemu;
