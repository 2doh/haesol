import styled from "@emotion/styled";
import React, { useState } from "react";
import "../../scss/chat/chat.scss";
import SendMsg from "./SendMsg";
import ChatButton from "./ChatButton";

const ChatWrapStyle = styled.div`
  margin: 20px;
  width: 530px;
  height: 860px;
  overflow: hidden;
  border-radius: 10px;
  /* box-shadow: 0 0 10px; */
  box-shadow:
    0px 3px 6px rgba(0, 0, 0, 0.16),
    0 3px 6px rgba(0, 0, 0, 0.23);
  .chat-header {
    width: 100%;
    height: 10%;
    background-color: #5f909f;
  }
  .chat-field {
    width: 100%;
    height: 70%;
    background-color: #dee8e9;
  }
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

const ChatParents = () => {
  const [myMsg, setMyMsg] = useState("");
  const [sandingMsg, setSendingMsg] = useState("");
  const [nowTime, setNowTime] = useState("");

  const asd = () => {
    setSendingMsg(myMsg);
    const now = new Date();
    const nowhours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const meridiem = nowhours > 12 ? "오후" : "오전";
    // console.log(meridiem);
    if (meridiem === "오후") {
      const hours = nowhours - 12;
      // console.log(hours);
      const formattedTime = `${meridiem} ${hours}:${minutes}`;
      setNowTime(formattedTime);
    }
  };
  return (
    <>
      {/* 버튼 클릭하면 채팅창 나오게 */}
      <ChatButton />
      <ChatWrapStyle>
        <div className="chat-header">
          <span>채팅 헤더</span>
        </div>
        <div className="chat-field">
          <SendMsg sandingMsg={sandingMsg} nowTime={nowTime}></SendMsg>
        </div>

        <ChatInputStyle>
          <form className="chat-wrap">
            <textarea
              className="chat-input"
              value={myMsg}
              onChange={e => {
                setMyMsg(e.target.value);
              }}
            ></textarea>
            <div
              className="chat-sendbtn br5"
              onClick={() => {
                asd();
              }}
            >
              전송
            </div>
          </form>
        </ChatInputStyle>
      </ChatWrapStyle>
    </>
  );
};

export default ChatParents;
