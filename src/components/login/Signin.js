import { useEffect, useState } from "react";
import IdPwFind from "./IdPwFind";
import LoginIdField from "./LoginIdField";
import LoginPassField from "./LoginPassField";
import SocialSignin from "./SocialSignin";
import { postTeacherSignin } from "api/login/teacherloginapi";
import cleanupBt from "../../images/tabler_circle-x-filled.svg";
import { postParentSignin } from "api/login/parentloginapi";

const Signin = ({ children, naviState, setNaviState, navi }) => {
  const [userId, setUserId] = useState("");
  const [userPass, setUserPass] = useState("");

  const login = async e => {
    console.log(naviState);
    e.preventDefault();
    const reqData = {
      teacherId: userId,
      password: userPass,
    };
    const request = {
      uid: userId,
      upw: userPass,
    };
    if (naviState === "signin") {
      const result = await postParentSignin(request);
      console.log(result);
      if (result.status === 200) {
        console.log("학부모회원가입성공");
        window.location.replace("/");
      } else {
        console.log("에러시 처리코드 필요");
      }
    } else if (naviState === "teacherlogin") {
      const result = await postTeacherSignin(reqData);
      if (result.status === 200) {
        console.log("교사회원가입성공");
        window.location.replace("/");
      } else {
        console.log("에러시 처리코드 필요");
      }
    }
  };

  useEffect(() => {
    setNaviState(children);
    return;
  }, [setNaviState]);

  return (
    <>
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
        {naviState === "signin" ? <SocialSignin /> : null}
      </form>
    </>
  );
};

export default Signin;
