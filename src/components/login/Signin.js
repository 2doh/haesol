import { useEffect, useState } from "react";
import cleanupBt from "../../images/tabler_circle-x-filled.svg";
import LoginIdField from "./LoginIdField";
import LoginPassField from "./LoginPassField";
import SocialSignin from "./SocialSignin";
import FindId from "./FindId";
import { postTeacherSignin } from "api/login/teacherloginapi";

const Signin = ({ children, naviState, setNaviState }) => {
  const [userId, setUserId] = useState("test1234");
  const [userPass, setUserPass] = useState("Test1234!@#$");

  const login = async e => {
    e.preventDefault();
    const reqData = {
      teacherId: `${userId}`,
      password: `${userPass}`,
    };
    const result = await postTeacherSignin(reqData);
    console.log(result);
  };

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
        <FindId naviState={"find-id"}></FindId>
      ) : naviState === "find-pass" ? (
        <FindId naviState={"find-pass"}></FindId>
      ) : null}
    </>
  );
};

export default Signin;
