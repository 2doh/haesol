import React, { useEffect, useState } from "react";
import "../../scss/chat/chat.scss";

const SendMsg = ({ sandingMsg, nowTime }) => {
  return (
    <div className="sendmsg-wrap br5">
      <div className="sendmsg-timewrap">
        <div className="sendmsg-time">{nowTime}</div>
      </div>
      <div className="sendmsg-msg">{sandingMsg}</div>
    </div>
  );
};

export default SendMsg;
