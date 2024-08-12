import styled from "@emotion/styled";
import React from "react";
import { PiChatCircleDotsFill } from "react-icons/pi";

const StartChatButton = styled.div`
  margin: 10px;
  position: relative;
  display: flex;
  width: 250px;

  .chat-button-contain {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 70px;
    flex-shrink: 0;
    border-radius: 40px;
    border: 4px solid #5f909f;
    background-color: #dee8e9;
    .chat-button-text {
      color: #1b4957;
      font-size: 24px;
      font-weight: 700;
      line-height: normal;
    }
  }
  .chat-button-icon {
    position: absolute;
    right: 10px;
    top: -15px;
  }
  &:hover .chat-button-contain {
    background-color: #add2d8;
    .chat-button-text {
      color: white;
    }
  }
  .chat-button {
    /* z-index: 1; */
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 70px;
    border-radius: 40px;
    border: 4px solid #5f909f;
    background-color: #dee8e9;
    /* line-height: normal; */
    overflow: hidden;
    .chat-button-text {
      z-index: 1;
      color: #1b4957;
      font-size: 24px;
      font-weight: 700;
    }
  }
  .chat-button:hover {
    .chat-button-text {
      color: #fff;
    }
  }
  .chat-button:after {
    position: absolute;
    content: "";
    width: 0;
    height: 100%;
    border-radius: 40px;
    top: 0;
    right: 0;
    /* z-index: -1; */
    background: #add2d8;
    transition: all 0.3s ease;
  }
  .chat-button:hover:after {
    left: 0;
    width: 100%;
  }
  .chat-button:active {
    top: 2px;
  }
`;

const ChatButton = () => {
  return (
    <StartChatButton>
      {/* <div className="chat-button-contain">
        <div className="chat-button-text">채팅하기</div>
      </div> */}
      <button className="chat-button">
        <div className="chat-button-text">채팅하기</div>
      </button>
      <div className="chat-button-icon">
        <PiChatCircleDotsFill size="60" fill="#5f909f" />
      </div>
    </StartChatButton>
  );
};

export default ChatButton;
