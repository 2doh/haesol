import styled from "@emotion/styled";
import ChatStart from "components/chat/ChatStart";
import { useEffect, useState } from "react";
import { BiSolidArrowToTop } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { updateDate } from "slices/openManagerSlice";

const QuickMenuStyle = styled.div`
  li {
    cursor: pointer;
  }

  .quick-menu-wrap {
    position: absolute;
    right: 0px;
    top: 50%;
    z-index: 999999;
    transform: translateY(-50%);

    /* border-radius: 20px 0 0 10px; */
    /* overflow: hidden; */

    /* background-color: ; */

    .quick-menu-title {
      display: flex;
      justify-content: center;

      padding: 10px;
      background-color: #d1ecff;
      color: #4279a0;
      font-size: 19px;

      border: 1px solid #cbd8fa;
      border-bottom: 0px;
      border-right: 0px;
      border-radius: 20px 0 0 0;
    }

    .quick-menu-btns {
      display: flex;
      gap: 10px;

      /* flex-direction: row-reverse; */
      flex-direction: column-reverse;
      background-color: white;
      padding: 10px;
      /* border-top: 1px solid white; */

      border: 1px solid #cbd8fa;
      border-right: 0px;
      border-top: 0px;
      border-radius: 0 0 0 10px;

      .btn {
        background-color: #eaeaea;
        padding: 10px;
        border-radius: 15px;
        text-align: center;
      }

      .quick-btn-text {
        color: #1b4957;
        font-size: 15px;
      }
    }

    .top-btn {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5px;

      border-radius: 50px 50px 10px 10px;
      background-color: #9fd2f7;
      color: white;
      padding: 8px;
      font-size: 13px;
      text-align: center;
      path {
        color: white;
      }
    }
  }
`;

const QuickMenu = () => {
  const dispatch = useDispatch();
  const openManagerState = useSelector(state => state.openManagerSlice);

  // 퀵메뉴 위치 저장
  const [barPosition, setBarPosition] = useState(510);

  // 퀵메뉴 - 채팅 여닫기
  const [chatOpen, setChatOpen] = useState(false);

  // 퀵메뉴 - 채팅 여닫기
  const [classScheduleOpen, setClassScheduleOpen] = useState(false);

  /** 퀵메뉴 위치 계산 */
  const handleScroll = () => {
    const position = 510 + window.scrollY;
    // const position = 956 < 510 + window.scrollY ? 956 : 510 + window.scrollY;
    setBarPosition(position);
  };

  /** 스크롤 위치 */
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // const callChat = bool => {
  //   setChatOpen(bool);
  // };

  /** 페이지 맨 위로 이동 */
  const MoveToTop = () => {
    // top:0 >> 맨위로  behavior:smooth >> 부드럽게 이동할수 있게 설정하는 속성
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpen = num => {
    let data = "";
    setChatOpen(false);

    if (num === 1) {
      data = {
        classScheduleIsOpen: !openManagerState.classScheduleIsOpen,
        classNoticeIsOpen: false,
      };
    }
    if (num === 2) {
      data = {
        classScheduleIsOpen: false,
        classNoticeIsOpen: !openManagerState.classNoticeIsOpen,
      };
    }

    dispatch(updateDate(data));
  };

  return (
    <>
      {chatOpen ? (
        <ChatStart chatOpen={chatOpen} setChatOpen={setChatOpen} />
      ) : null}

      {/* {chatOpen ? <Chat /> : null} */}
      <QuickMenuStyle>
        <div className="quick-menu-wrap" style={{ top: barPosition }}>
          <div className="quick-menu-title">퀵메뉴</div>

          <div className="quick-menu-btns">
            <li
              className="btn"
              onClick={() => {
                setChatOpen(true);
              }}
            >
              {/* 채팅 */}
              {/* <a href="/" className="qk qk01" data-num="01">
              <span className="hidden">채팅</span>
            </a> */}
              <a className="qk qk01" data-num="01">
                <span className="quick-btn-text">채팅</span>
              </a>
            </li>
            <li
              className="btn"
              onClick={() => {
                handleOpen(2);
              }}
            >
              {/* 채팅 */}
              {/* <a href="/" className="qk qk01" data-num="01">
              <span className="hidden">채팅</span>
            </a> */}
              <a className="qk qk01" data-num="01">
                <span className="quick-btn-text">알림장</span>
              </a>
            </li>

            <li
              className="btn"
              onClick={() => {
                handleOpen(1);
              }}
            >
              {/* 채팅 */}
              {/* <a href="/" className="qk qk01" data-num="01">
              <span className="hidden">채팅</span>
            </a> */}
              <a className="qk qk01" data-num="01">
                <span className="quick-btn-text">시간표</span>
              </a>
            </li>
          </div>
          <div className="top-btn" onClick={() => MoveToTop()}>
            <BiSolidArrowToTop size={15} />맨 위로
          </div>
        </div>
      </QuickMenuStyle>
    </>
  );
};

export default QuickMenu;
