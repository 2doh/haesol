import { postParentSignin } from "api/login/parentloginapi";
import { postTeacherSignin } from "api/login/teacherloginapi";
import PasswordField from "components/user/PasswordField";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "utils/cookie";
import cleanupBt from "../../../images/tabler_circle-x-filled.svg";
import LoginIdField from "./LoginIdField";
import SocialSignin from "./SocialSignin";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userRoleState } from "atoms/userState";
import base64 from "base-64";
import { useNavigate } from "react-router";

const Signin = ({ children, naviState, setNaviState }) => {
  const [userRole, setUserRole] = useRecoilState(userRoleState);
  const [userId, setUserId] = useState("parent1");
  const [userPass, setUserPass] = useState("Test1234!@#$");
  const [errMsg, setErrMsg] = useState("");
  const navi = useNavigate();

  const login = async e => {
    e.preventDefault();
    const reqData = {
      teacherId: userId,
      password: userPass,
    };
    const request = {
      uid: userId,
      upw: userPass,
    };
    if (userId === "" || userPass === "") {
      setErrMsg("빈칸을 모두 입력해주세요");
      return;
    }
    if (naviState === "signin") {
      const result = await postParentSignin(request);
      if (result.status === 200) {
        // let acTken = result.data.accessToken;
        // const payload = JSON.parse(
        //   base64.decode(acTken.split(".")[1]),
        // ).signedUser;
        // const signedUser = JSON.parse(payload);
        // setUserRole(signedUser.role);
        // console.log(userRole);
        navi("/");
      }
      if (result === "error") {
        setErrMsg("아이디 혹은 비밀번호를 확인해주세요");
      }
    }
    if (naviState === "teacherlogin") {
      const result = await postTeacherSignin(reqData);
      if (result.status === 200 && getCookie("userRole") === "ROLE_ADMIN") {
        window.location.replace("/admin");
      }
      if (result.status === 200 && getCookie("userRole") === "ROLE_TEAHCER") {
        window.location.replace("/");
      }
      if (result === "error") {
        setErrMsg("아이디 혹은 비밀번호를 확인해주세요");
      }
    }
  };

  useEffect(() => {
    setNaviState(children);
    return;
  }, [setNaviState]);

  useEffect(() => {
    setUserPass("");
    setUserId("");
  }, [naviState]);

  useEffect(() => {
    if (userPass === "" || userId === "") {
      setErrMsg("");
    }
  }, [userPass, userId]);

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
        <PasswordField userPass={userPass} setUserPass={setUserPass}>
          비밀번호
        </PasswordField>
        <div className="fields-section-errmsg">{errMsg}</div>
        <button className="login-wrap-panel-loginbt">로그인</button>
        {naviState === "signin" ? <SocialSignin /> : null}
      </form>
    </>
  );
};

export default Signin;
