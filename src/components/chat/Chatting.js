import styled from "@emotion/styled";
import React, { useState } from "react";
import "../../scss/chat/chat.scss";
import SendMsg from "./SendMsg";

const Chatting = () => {
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
    <ChatWrapStyle>
      <ChatHeaderStyle></ChatHeaderStyle>
      <ChatFieldStyle>
        <SendMsg sandingMsg={sandingMsg} nowTime={nowTime}></SendMsg>
      </ChatFieldStyle>
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
  );
};

export default Chatting;

const ChatWrapStyle = styled.div`
  width: 335px;
  height: 550px;
  background-color: green;
  margin-bottom: 888px;
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
