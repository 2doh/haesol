import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";

const ChatWrapInner = styled.div`
  font-size: 17px;
  .receive-msg-wrap {
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: 20px;
    .receivemsg-timewrap {
      .receivemsg-time {
        font-size: 11px;
      }
    }
    .receivemsg-msg {
      background-color: #ffdfe4;
      border: solid 1px #dd838f;
      border-radius: 15px;
      margin-left: 10px;
      padding: 8px;
      margin-right: 10px;
    }
  }
`;

// 대화 내용 반복 처리 필요
const ReceiveMsg = ({ receiveMsg, receiveTime }) => {
  const [aaa, setAaa] = useState("tlqkf!");
  return (
    <ChatWrapInner>
      <div className="receive-msg-wrap">
        <div className="receivemsg-msg">{setAaa}</div>
        <div className="receivemsg-timewrap">
          <div className="receivemsg-time">{receiveTime}</div>
        </div>
      </div>
    </ChatWrapInner>
  );
};

export default ReceiveMsg;
