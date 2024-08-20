import styled from "@emotion/styled";

const ChatWrapInner = styled.div`
  font-size: 17px;
  .send-msg-wrap {
    display: flex;
    width: 100%;
    align-items: flex-end;
    justify-content: flex-end;
    margin-bottom: 20px;
    .sendmsg-timewrap {
      .sendmsg-time {
        white-space: nowrap;
        font-size: 11px;
      }
    }
    .sendmsg-msg {
      background-color: #add2d8;
      border: solid 1px #1b4957;
      border-radius: 15px;
      margin-left: 10px;
      padding: 8px;
    }
  }
`;

// 대화 내용 반복 처리 필요
const SendMsg = ({ sandingMsg, nowTime }) => {
  return (
    <ChatWrapInner>
      <div className="send-msg-wrap">
        <div className="sendmsg-timewrap">
          <div className="sendmsg-time">{nowTime}</div>
        </div>
        <div className="sendmsg-msg">{sandingMsg}</div>
      </div>
    </ChatWrapInner>
  );
};

export default SendMsg;
