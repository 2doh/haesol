import { useEffect, useState } from "react";

const LoginPassField = ({ cleanupBt, cleanupPass, userPass, setUserPass }) => {
  const [passPlacholder, setPassPlacholder] =
    useState("비밀번호를 입력해 주세요");
  const [changeInputType, setChangeInputType] = useState("password");
  const [showPass, setShowPass] = useState(false);

  const handleShowPass = () => {
    setShowPass(!showPass);
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
      <div className="login-panel-userpass-title">비밀번호</div>
      <input
        className="login-panel-userpass-input"
        type={changeInputType}
        placeholder={passPlacholder}
        onFocus={() => setPassPlacholder("")}
        onBlur={() => setPassPlacholder("비밀번호를 입력해 주세요")}
        value={userPass}
        onChange={e => setUserPass(e.target.value)}
      ></input>
      <div
        className={!showPass ? "showpass" : "hidepass"}
        onClick={e => {
          handleShowPass(e);
        }}
      />
      <img className="cleanupbt" src={cleanupBt} onClick={cleanupPass} />
    </div>
  );
};

export default LoginPassField;
