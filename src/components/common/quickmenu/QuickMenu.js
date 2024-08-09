import styled from "@emotion/styled";
import ChatParents from "components/chat/ChatParents";
import Chat from "pages/Home/Chat";
import { useEffect, useState } from "react";

const QuickMenuStyle = styled.div`
  .quick-menu-wrap {
    position: absolute;
    right: 0px;
    top: 50%;
    z-index: 999999;
    transform: translateY(-50%);

    border-radius: 20px 0 0 10px;
    overflow: hidden;

    /* background-color: ; */

    .quick-menu-title {
      padding: 10px;
      background-color: #d1ecff;
      color: #4279a0;
      font-size: 20px;
    }

    .quick-menu-btns {
      display: flex;
      gap: 10px;

      /* flex-direction: row-reverse; */
      flex-direction: column-reverse;
      background-color: white;
      padding: 10px;
      border-top: 1px solid white;

      .btn {
        background-color: #eaeaea;
        padding: 10px;
        border-radius: 10px;
        text-align: center;
      }

      .hidden {
        color: #1b4957;
        font-size: 15px;
      }
    }
  }
`;

const QuickMenu = () => {
  // 퀵메뉴 위치 저장
  const [barPosition, setBarPosition] = useState(510);
  const [chatOpen, setChatOpen] = useState(false);

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

  const callChat = bool => {
    setChatOpen(bool);
  };

  return (
    <>
      {chatOpen ? <ChatParents /> : null}
      {/* {chatOpen ? <Chat /> : null} */}
      <QuickMenuStyle>
        <div className="quick-menu-wrap" style={{ top: barPosition }}>
          <div className="quick-menu-title">퀵메뉴</div>

          <div className="quick-menu-btns">
            <li
              className="btn"
              onClick={() => {
                callChat(true);
              }}
            >
              {/* 채팅 */}
              {/* <a href="/" className="qk qk01" data-num="01">
              <span className="hidden">채팅</span>
            </a> */}
              <a className="qk qk01" data-num="01">
                <span className="hidden">채팅</span>
              </a>
            </li>
            <li
              className="btn"
              onClick={() => {
                callChat(false);
              }}
            >
              {/* 채팅 */}
              {/* <a href="/" className="qk qk01" data-num="01">
              <span className="hidden">채팅</span>
            </a> */}
              <a className="qk qk01" data-num="01">
                <span className="hidden">(닫기)</span>
              </a>
            </li>
          </div>
        </div>
      </QuickMenuStyle>
    </>
  );
};

export default QuickMenu;
