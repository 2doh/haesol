import React, { useEffect, useState } from "react";
import cleanupBt from "../../images/tabler_circle-x-filled.svg";
import { PassValidation } from "utils/helpers";

// userPass는 입력되는 사용자의 비밀번호임
const PasswordField = ({ children, userPass, setUserPass }) => {
  const [passPlaceholder, setPassPlaceholder] =
    useState("비밀번호를 입력해 주세요");
  const [changeInputType, setChangeInputType] = useState("password");
  const [showPass, setShowPass] = useState(false);

  const cleanupPass = e => {
    e.preventDefault(e);
    setUserPass("");
  };
  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  const handleOnChange = e => {
    setUserPass(e.target.value);
    const result = PassValidation(e);
    return result;
  };

  useEffect(() => {
    if (showPass) {
      setChangeInputType("text");
    } else {
      setChangeInputType("password");
    }
  }, [showPass]);

  return (
    <div className="login-wrap-panel-userpass">
      <div className="login-panel-userpass-title">{children}</div>
      <input
        className="login-panel-userpass-input"
        type={changeInputType}
        placeholder={passPlaceholder}
        onFocus={() => setPassPlaceholder("")}
        onBlur={() => setPassPlaceholder("비밀번호를 입력해 주세요")}
        value={userPass}
        onChange={e => {
          handleOnChange(e);
        }}
      ></input>
      {userPass ? (
        <>
          <div
            className={!showPass ? "showpass" : "hidepass"}
            onClick={e => {
              {
                handleShowPass(e);
              }
            }}
          />
          <img
            className="cleanupbt"
            src={cleanupBt}
            onClick={e => cleanupPass(e)}
          />
        </>
      ) : null}
    </div>
  );
};

export default PasswordField;
