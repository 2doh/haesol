import { useState } from "react";
import kakao from "../../../images/ri_kakao-talk-fill.svg";
import naver from "../../../images/simple-icons_naver.svg";
import LoginGoogle from "./LoginGoogle";
import { googleLogout } from "@react-oauth/google";
import { googleSignin } from "api/login/socialsignin";

const SocialSignin = () => {
  const [userInfo, setUserInfo] = useState(null);

  const handleGoogleSuccess = async response => {
    // 로그인 성공 로직
    console.log("Google Login Success:", response);
    console.log("Google Login Success:", response.access_token);

    // 아래는 BE와 통신 코드
    // const result = await googleSignin();

    // 토큰 내용 확인
    // const token = response.access_token;
    // try {
    //   const response = await fetch(
    //     `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`,
    //   );
    //   const data = await response.json();
    //   console.log(data);
    //   if (response.ok) {
    //     return data; // 사용자 정보
    //   } else {
    //     throw new Error(`Error: ${data.error}`);
    //   }
    // } catch (error) {
    //   console.error("Error verifying token:", error);
    //   throw error;
    // }
  };

  const handleGoogleFailure = error => {
    // 로그인 실패 로직
    console.log("Google Login Failure:", error);
  };

  return (
    <div className="login-wrap-panel-social">
      <div className="login-panel-social-title">간편 로그인</div>
      <div className="login-panel-social-list">
        <div className="login-panel-social-naver">
          <img src={naver} />
        </div>
        <div className="login-panel-social-kakao">
          <img src={kakao} />
        </div>
        <LoginGoogle
          onSuccess={handleGoogleSuccess}
          onFailure={handleGoogleFailure}
        />
      </div>
    </div>
  );
};

export default SocialSignin;
