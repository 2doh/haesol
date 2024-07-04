import { useState } from "react";

const EmailInputField = ({ children }) => {
  const [userEmail, setUserEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleOnChange = e => {
    const regex = /^[^\s@]+@[^\s@]+\.(com|net|co\.kr)$/i;
    if (regex.test(e.target.value)) {
      setErrMsg("");
    } else {
      setErrMsg("이메일 형식에 맞지 않습니다");
    }
  };
  return (
    <div className="signup-main-fields">
      <div className="signup-main-fields-section-top">
        <div className="fields-section-title">{children}</div>
        <div className="fields-section-errmsg">{errMsg}</div>
      </div>
      <div className="signup-main-fields-section-bottom">
        <input
          className="fieleds-section-input"
          type="text"
          placeholder="이메일"
          value={userEmail}
          onChange={e => {
            setUserEmail(e.target.value);
            handleOnChange(e);
          }}
        ></input>
      </div>
    </div>
  );
};

export default EmailInputField;
