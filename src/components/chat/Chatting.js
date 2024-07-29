import styled from "@emotion/styled";
import React from "react";
import "../../scss/chat/chat.scss";
import SendMsg from "./SendMsg";

const Chatting = () => {
  return (
    <ChatWrapStyle>
      <ChatHeaderStyle></ChatHeaderStyle>
      <ChatFieldStyle></ChatFieldStyle>
      <ChatInputStyle>
        <form className="chat-wrap">
          <textarea className="chat-input"></textarea>
          <div className="chat-sendbtn br5">전송</div>
        </form>
      </ChatInputStyle>
      <SendMsg></SendMsg>
    </ChatWrapStyle>
  );
};

export default Chatting;

const ChatWrapStyle = styled.div`
  width: 335px;
  height: 550px;
  background-color: green;
`;

const ChatHeaderStyle = styled.div`
  width: 100%;
  height: 10%;
  background-color: #5f909f;
`;

const ChatFieldStyle = styled.div`
  width: 100%;
  height: 70%;
  background-color: #dee8e9;
`;

const ChatInputStyle = styled.div`
  width: 100%;
  height: 20%;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 10px;
  gap: 10px;
`;
