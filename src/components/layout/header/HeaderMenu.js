import styled from "@emotion/styled";
import useWindowDimensions from "hooks/common/useWindowDimensions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { FaShare } from "react-icons/fa6";
import { getCookie } from "utils/cookie";

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

                align-items: center;
                display: flex;
                justify-content: center;
                gap: 10px;

                svg {
                  font-size: 12px;
                }

                span {
                  word-break: keep-all;
                  font-size: 18px;
                }
              }

              &:last-child > a {
                border-bottom: 0px;
              }
            }

            & > li:hover {
              path {
                color: #385f72;
              }
              span {
                color: #385f72;
                font-weight: bold;
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
        .user-info-menu {
          left: -38px;
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

  /** 새 탭에서 열기 */
  const handleOpenNewTab = url => {
    window.open(url, "_blank", "noopener, noreferrer");
  };

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
      case 0:
        // 로그인이 필요한 경우
        navigate("/login");
        break;
      case 1:
        navigate("");
        break;
      case 2:
        navigate("/students");
        break;
      case 3:
        navigate("/online");
        break;
      case 4:
        // 교직원 내정보
        navigate("/teacher/teacherinfo");
        break;
      case 5:
        // 학부모 내정보
        navigate("/parents/childlist");
        break;
      case 10:
        alert("준비중인 서비스입니다.");
        break;
      case 11:
        // 추가하기
        navigate("/notice/list/:userClass");
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
      case 41:
        // (교직원) 내 정보
        navigate("/teacher/teacherinfo");
        break;
      case 42:
        // 담당 이력
        alert("준비중인 서비스입니다.");
        break;
      case 51:
        // 자녀 목록
        navigate("/parents/childlist");
        break;
      case 52:
        // 자녀 정보
        navigate("/parents/studentinfo");
        break;
      case 53:
        // 자녀 성적 확인
        navigate(`/grade/${getCookie("studentPk")}`);
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
                    <a>선생님 마당</a>
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
                    switch (getCookie("userRole")) {
                      case "ROLE_TEACHER":
                        moveMyPage(4);
                        break;
                      case "ROLE_PARENTS":
                        moveMyPage(5);
                        break;
                      default:
                        moveMyPage(0);
                        break;
                    }
                  }}
                >
                  <h2>
                    <a>나의 공간</a>
                  </h2>

                  {getCookie("userRole") === "ROLE_TEACHER" ? (
                    <>
                      <div className="navi_arrow_icon">
                        <IoMdArrowDropdownCircle size={30} />
                      </div>
                      <div className="navi_sub user-info-menu">
                        <ul className="depth2">
                          <li
                            onClick={e => {
                              e.stopPropagation();
                              moveMyPage(41);
                            }}
                          >
                            <a>
                              <span>내 정보</span>
                            </a>
                          </li>
                          <li
                            onClick={e => {
                              e.stopPropagation();
                              moveMyPage(42);
                            }}
                          >
                            <a>
                              <span>담당 이력</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </>
                  ) : null}
                  {getCookie("userRole") === "ROLE_PARENTS" ? (
                    <>
                      <div className="navi_arrow_icon">
                        <IoMdArrowDropdownCircle size={30} />
                      </div>
                      <div className="navi_sub user-info-menu">
                        <ul className="depth2">
                          <li
                            onClick={e => {
                              e.stopPropagation();
                              moveMyPage(51);
                            }}
                          >
                            <a>
                              <span>자녀 목록</span>
                            </a>
                          </li>
                          <li
                            onClick={e => {
                              e.stopPropagation();
                              moveMyPage(52);
                            }}
                          >
                            <a>
                              <span>자녀 정보</span>
                            </a>
                          </li>
                          <li
                            onClick={e => {
                              e.stopPropagation();
                              moveMyPage(53);
                            }}
                          >
                            <a>
                              <span>자녀 성적 확인</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </>
                  ) : null}
                </li>
                <li
                  onClick={() => {
                    moveMyPage(5);
                  }}
                >
                  <h2>
                    <a>학습 서비스</a>
                  </h2>
                  <div className="navi_arrow_icon">
                    <IoMdArrowDropdownCircle size={30} />
                  </div>
                  <div className="navi_sub notice-menu">
                    <ul className="depth2">
                      <li
                        onClick={() => {
                          handleOpenNewTab("https://cls.edunet.net/");
                        }}
                      >
                        <a>
                          <span>e학습터</span>
                          <FaShare />
                        </a>
                      </li>
                      <li
                        onClick={() => {
                          handleOpenNewTab("https://rang.edunet.net/main.do");
                        }}
                      >
                        <a>
                          <span>위두랑</span>
                          <FaShare />
                        </a>
                      </li>
                      <li
                        onClick={() => {
                          handleOpenNewTab("https://dtbook.edunet.net/");
                        }}
                      >
                        <a>
                          <span>디지털 교과서</span>
                          <FaShare />
                        </a>
                      </li>
                      <li
                        onClick={() => {
                          handleOpenNewTab(
                            "https://educator.edunet.net/main/html/intro.html",
                          );
                        }}
                      >
                        <a>
                          <span>지식 샘터</span>
                          <FaShare />
                        </a>
                      </li>
                      <li
                        onClick={() => {
                          handleOpenNewTab(
                            "https://korean.edunet.net/lms/cm/mcom/pmco000b00.do",
                          );
                        }}
                      >
                        <a>
                          <span>모두의 한국어</span>
                          <FaShare />
                        </a>
                      </li>
                    </ul>
                  </div>

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
