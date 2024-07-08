import React, { useState } from "react";

const LoginIdField = ({ cleanupBt, cleanupId, userId, setUserId }) => {
  const [idPlacholder, setIdPlacholder] = useState("아이디를 입력해 주세요");

  return (
    <div className="login-wrap-panel-userid">
      <div className="login-panel-userid-title">아이디</div>
      <input
        className="login-panel-userid-input"
        type="text"
        placeholder={idPlacholder}
        onFocus={() => setIdPlacholder("")}
        onBlur={() => setIdPlacholder("아이디를 입력해 주세요")}
        value={userId}
        onChange={e => {
          setUserId(e.target.value);
        }}
      ></input>
      <img className="idcleanupbt" src={cleanupBt} onClick={cleanupId} />
    </div>
  );
};

export default LoginIdField;
