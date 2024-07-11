import { useEffect, useState } from "react";
import IdPwFind from "./IdPwFind";
import LoginIdField from "./LoginIdField";
import LoginPassField from "./LoginPassField";
import SocialSignin from "./SocialSignin";
import { postTeacherSignin } from "api/login/teacherloginapi";
import cleanupBt from "../../images/tabler_circle-x-filled.svg";

const Signin = ({ children, naviState, setNaviState, navi }) => {
  const [userId, setUserId] = useState("test1234");
  const [userPass, setUserPass] = useState("Test1234!@#$");

  const login = async e => {
    e.preventDefault();
    const reqData = {
      teacherId: `${userId}`,
      password: `${userPass}`,
    };
    const result = await postTeacherSignin(reqData);
    navi("/");
    console.log(result);
  };

  const handleOnClick = () => {};

  useEffect(() => {
    setNaviState(children);
    return;
  }, [setNaviState]);

  return (
    <>
      {naviState === "signin" ? (
        <form
          className="login-wrap-panel"
          onSubmit={e => {
            login(e);
          }}
        >
          <LoginIdField
            cleanupBt={cleanupBt}
            userId={userId}
            setUserId={setUserId}
          >
            아이디
          </LoginIdField>
          <LoginPassField
            cleanupBt={cleanupBt}
            userPass={userPass}
            setUserPass={setUserPass}
          >
            비밀번호
          </LoginPassField>
          <button className="login-wrap-panel-loginbt">로그인</button>
          <SocialSignin />
        </form>
      ) : naviState === "find-id" ? (
        <IdPwFind naviState="find-id"></IdPwFind>
      ) : naviState === "find-pass" ? (
        <IdPwFind naviState="find-pass"></IdPwFind>
      ) : null}
    </>
  );
};

export default Signin;
