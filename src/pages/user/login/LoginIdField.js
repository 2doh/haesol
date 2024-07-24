import React, { useState } from "react";

const LoginIdField = ({ children, cleanupBt, userId, setUserId }) => {
  const [idPlacholder, setIdPlacholder] = useState("아이디를 입력해 주세요");
  const cleanupId = e => {
    e.preventDefault();
    setUserId("");
  };

  return (
    <div className="login-wrap-panel-userid">
      <div className="login-panel-userid-title">{children}</div>
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
      {userId ? (
        <img className="idcleanupbt" src={cleanupBt} onClick={cleanupId} />
      ) : null}
    </div>
  );
};

export default LoginIdField;
