import React, { useState } from "react";
import LoginIdField from "./LoginIdField";
import LoginPassField from "./LoginPassField";
import SocialSignin from "./SocialSignin";
import cleanupBt from "../../images/tabler_circle-x-filled.svg";
const Signin = () => {
  const [userId, setUserId] = useState("");
  const [userPass, setUserPass] = useState("");
  const cleanupId = e => {
    e.preventDefault();
    setUserId("");
  };
  const cleanupPass = e => {
    e.preventDefault();
    setUserPass("");
  };
  return (
    <form className="login-wrap-panel">
      <LoginIdField
        cleanupBt={cleanupBt}
        cleanupId={cleanupId}
        userId={userId}
        setUserId={setUserId}
      ></LoginIdField>
      <LoginPassField
        cleanupBt={cleanupBt}
        cleanupPass={cleanupPass}
        userPass={userPass}
        setUserPass={setUserPass}
      ></LoginPassField>
      <button className="login-wrap-panel-loginbt">로그인</button>
      <SocialSignin />
    </form>
  );
};

export default Signin;
