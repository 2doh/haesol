import React, { useEffect } from "react";
import "../../scss/chat/chat.scss";

const SendMsg = () => {
  useEffect(() => {}, []);

  return (
    <div className="sendmsg-wrap">
      <div className="sendmsg-timewrap">
        <div className="sendmsg-time">123123</div>
      </div>
      <div className="sendmsg-msg">123123</div>
    </div>
  );
};

export default SendMsg;
