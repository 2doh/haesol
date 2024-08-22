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
    .receivemsg-msg-wrap {
      margin-left: 10px;
      display: flex;
      flex-direction: column;
      gap: 5px;
      .receive-name {
        font-size: 14px;
      }
      .receivemsg-msg {
        background-color: #ffdfe4;
        border: solid 1px #dd838f;
        border-radius: 15px;
        padding: 8px;
      }
    }
  }
`;

// 대화 내용 반복 처리 필요
const ReceiveMsg = ({ receiveMsg, receiveTime, receiverName }) => {
  return (
    <ChatWrapInner>
      <div className="receive-msg-wrap">
        <div className="receivemsg-msg-wrap">
          <div className="receive-name">{receiverName}</div>
          <div className="receivemsg-msg">{receiveMsg}</div>
        </div>
        <div className="receivemsg-timewrap">
          <div className="receivemsg-time">{receiveTime}</div>
        </div>
      </div>
    </ChatWrapInner>
  );
};

export default ReceiveMsg;
