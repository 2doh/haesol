import { useEffect, useState } from "react";

const LoginPassField = ({ cleanupBt, children, userPass, setUserPass }) => {
  const [passPlacholder, setPassPlacholder] =
    useState("비밀번호를 입력해 주세요");
  const [changeInputType, setChangeInputType] = useState("password");
  const [showPass, setShowPass] = useState(false);

  const cleanupPass = e => {
    e.preventDefault();
    setUserPass("");
  };
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
      <div className="login-panel-userpass-title">{children}</div>
      <input
        className="login-panel-userpass-input"
        type={changeInputType}
        placeholder={passPlacholder}
        onFocus={() => setPassPlacholder("")}
        onBlur={() => setPassPlacholder("비밀번호를 입력해 주세요")}
        value={userPass}
        onChange={e => setUserPass(e.target.value)}
      ></input>
      {userPass ? (
        <>
          <div
            className={!showPass ? "showpass" : "hidepass"}
            onClick={e => {
              handleShowPass(e);
            }}
          />
          <img className="cleanupbt" src={cleanupBt} onClick={cleanupPass} />
        </>
      ) : null}
    </div>
  );
};

export default LoginPassField;
