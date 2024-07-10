import { useState } from "react";
import { PhoneNumber } from "utils/helpers";

const FindId = () => {
  const [userName, setUserName] = useState("");
  const [userNum, setUserNum] = useState("");
  const handleOnChange = e => {
    setUserNum(PhoneNumber(e));
  };
  return (
    <form className="login-wrap-panel">
      <div className="login-wrap-panel-userid">
        <div className="login-panel-userid-title">이름</div>
        <input
          className="login-panel-userid-input"
          type="text"
          value={userName}
          onChange={e => setUserName(e.target.value)}
        ></input>
      </div>
      <div className="login-wrap-panel-userpass">
        <div className="login-panel-userpass-title">전화번호</div>
        <input
          className="login-panel-userpass-input"
          value={userNum}
          onChange={e => {
            setUserNum(e.target.value);
            handleOnChange(e);
          }}
          maxLength={13}
        ></input>
      </div>
      <button className="login-wrap-panel-loginbt">아이디찾기</button>
    </form>
  );
};

export default FindId;
