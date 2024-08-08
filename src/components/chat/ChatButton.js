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
`;

const ChatButton = () => {
  return (
    <StartChatButton>
      <div className="chat-button-contain">
        <div className="chat-button-text">채팅 시작하기</div>
      </div>
      <div className="chat-button-icon">
        <PiChatCircleDotsFill size="60" fill="#5f909f" />
      </div>
    </StartChatButton>
  );
};

export default ChatButton;
