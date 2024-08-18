import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

const ChatWrapInner = styled.div`
  font-size: 17px;
  .send-msg-wrap {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 20px;
    .sendmsg-timewrap {
      .sendmsg-time {
        font-size: 11px;
      }
    }
    .sendmsg-msg {
      margin-right: 10px;
    }
  }
`;

// 대화 내용 반복 처리 필요
const SendMsg = ({ sandingMsg, nowTime }) => {
  return (
    <ChatWrapInner>
      <div className="send-msg-wrap">
        <div className="sendmsg-msg">{sandingMsg}</div>
        <div className="sendmsg-timewrap">
          <div className="sendmsg-time">{nowTime}</div>
        </div>
      </div>
    </ChatWrapInner>
  );
};

export default SendMsg;
