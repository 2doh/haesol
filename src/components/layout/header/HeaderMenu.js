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
  padding-bottom: 10px;

  .header-menu-wrap {
    display: flex;
    position: absolute;
    left: 0;

    width: calc(100% - 10%);
    max-width: 2000px;
    min-width: 1285px;

    border-radius: 0px 50px 50px 0px;

    height: 100%;
    background-color: #5f909f;

    margin-right: 60px;

    .header-menu-inner {
      display: flex;
      justify-content: center;

      position: absolute;
      width: 100vw;
      height: 100%;

      & > ul {
        height: 100%;
        width: 100%;
        max-width: 1023px;

        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
      }

      & > ul > li {
        position: relative;
        white-space: nowrap;
        font-size: 22px;
        cursor: pointer;
        z-index: 1000;

        h2 {
          a {
            color: white;
          }
        }
        #user-type-menu-label {
          min-width: 102px;
          text-align: center;
        }

        .navi_arrow_icon {
          display: none;

          position: absolute;
          top: 35px;
          left: 50%;
          transform: translateX(calc(-50% + 0.5px));
          text-align: center;
          width: 50px;
          height: 23px;
          z-index: 20;

          path {
            color: #385f72;
          }
        }

        .navi_sub {
          /* display: none; */

          max-height: 0px;
          overflow: hidden;

          position: absolute;
          padding: 0px;
          /* padding: 14px 4px 11px; */
          z-index: 10;

          left: -34px;
          top: 48px;
          width: 188px;

          transition: max-height 0.3s; /* height를 변화 시켰을 때 0.2초간 변화 되도록 설정(기본) */
          /* -webkit-transition: height 0.2s;
          -moz-transition: height 0.2s;
          -o-transition: height 0.2s; */

          border-radius: 30px 30px 5px 5px;
          box-shadow: 0px 2px 5px 0px rgba(7, 7, 7, 0.2);
          background: #fff;

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
        /* 서브 메뉴들 - start */
        .notice-menu {
        }
        .user-type-menu {
          left: -28px;
        }
        .online-menu {
          left: -28px;
        }
        .my-info-menu {
        }
        .learning-services-menu {
          left: -28px;
        }
        /* 서브 메뉴들 - end */

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
          padding: 14px 4px 11px;
          max-height: 500px;
        }
        .navi_arrow_icon {
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
    // 2n : 2번째 메뉴의 서브메뉴

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
      case 10:
        // navigate("/selftest");

        // 추가하기
        // navigate("/selftest");
        break;
      case 11:
        // 추가하기
        navigate("/notice/list/classid");
        break;
      case 21:
        // 국어 문제 출제 페이지
        navigate("/online/test/create/korean");
        break;
      case 22:
        // 영어 문제 출제 페이지
        navigate("/online/test/create/english");
        break;
      case 23:
        // 수학 문제 출제 페이지
        navigate("/online/test/create/math");
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
                  <div className="navi_arrow_icon">
                    <IoMdArrowDropdownCircle size={30} />
                  </div>
                  <div className="navi_sub notice-menu">
                    <ul className="depth2">
                      <li
                        onClick={() => {
                          moveMyPage(10);
                        }}
                      >
                        <a>
                          <span>전체 일정</span>
                        </a>
                      </li>
                      <li
                        onClick={() => {
                          moveMyPage(11);
                        }}
                      >
                        <a>
                          <span>알림장</span>
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
                  <h2 id="user-type-menu-label">
                    <a>OOO 마당</a>
                  </h2>
                  <div className="navi_arrow_icon">
                    <IoMdArrowDropdownCircle size={30} />
                  </div>
                  <div className="navi_sub user-type-menu">
                    <ul className="depth2">
                      <li>
                        <a>
                          <span>학급 관리</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span>문제 출제 리스트</span>
                        </a>
                      </li>
                      <li
                        onClick={e => {
                          e.stopPropagation();
                          moveMyPage(22);
                        }}
                      >
                        <a>
                          <span>영어 문제 출제</span>
                        </a>
                      </li>
                      <li
                        onClick={e => {
                          e.stopPropagation();
                          moveMyPage(21);
                        }}
                      >
                        <a>
                          <span>국어 문제 출제</span>
                        </a>
                      </li>
                      <li
                        onClick={e => {
                          e.stopPropagation();
                          moveMyPage(23);
                        }}
                      >
                        <a>
                          <span>수학 문제 출제</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li
                  onClick={() => {
                    moveMyPage(3);
                  }}
                >
                  <h2>
                    <a>온라인 학습</a>
                  </h2>
                  {/* <div className="navi_arrow_icon">
                    <IoMdArrowDropdownCircle size={30} />
                  </div>
                  <div className="navi_sub online-menu">
                    <ul className="depth2">
                      <li>
                        <a>
                          <span>전체 일정</span>
                        </a>
                      </li>
                      <li>
                        <a>
                          <span>알림장</span>
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
                    <a>나의 공간</a>
                  </h2>
                  {/* <div className="navi_arrow_icon my-info-menu">
                    <IoMdArrowDropdownCircle size={30} />
                  </div>
                  <div className="navi_sub">
                    <ul className="depth2">
                      <li
                        onClick={() => {
                          moveMyPage(10);
                        }}
                      >
                        <a>
                          <span>전체 일정</span>
                        </a>
                      </li>
                      <li
                        onClick={() => {
                          moveMyPage(11);
                        }}
                      >
                        <a>
                          <span>알림장</span>
                        </a>
                      </li>
                    </ul>
                  </div> */}
                </li>
                <li
                  onClick={() => {
                    moveMyPage(5);
                  }}
                >
                  <h2>
                    <a>학습 서비스</a>
                  </h2>
                  {/* <div className="navi_arrow_icon">
                    <IoMdArrowDropdownCircle size={30} />
                  </div>
                  <div className="navi_sub learning-services-menu">
                    <ul className="depth2">
                      <li
                        onClick={() => {
                          moveMyPage(10);
                        }}
                      >
                        <a>
                          <span>전체 일정</span>
                        </a>
                      </li>
                      <li
                        onClick={() => {
                          moveMyPage(11);
                        }}
                      >
                        <a>
                          <span>알림장</span>
                        </a>
                      </li>
                    </ul>
                  </div> */}
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
