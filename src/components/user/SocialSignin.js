import {
  fetchUserInfo,
  getNaverUserInfo,
  googleSignin,
  googleToken,
  socialLogin,
  socialSignin,
} from "api/login/social";
import { useEffect, useState } from "react";
// import KakaoLogin from "react-kakao-login";
import kakao from "../../images/ri_kakao-talk-fill.svg";
import naver from "../../images/simple-icons_naver.svg";
import LoginGoogle from "./LoginGoogle";
import useSocialLogin from "hooks/useSocialLogin";
import KakaoLogin from "react-kakao-login";
import { useNavigate } from "react-router";
import { GoogleLogin } from "@react-oauth/google";

const SocialSignin = () => {
  const navi = useNavigate();
  const handleGoogleSuccess = async response => {
    // console.log(response);
    const token = response.access_token;
    const res = await fetchUserInfo(token);
    console.log(res);

    // console.log(token);
    // 토큰 파싱
    // const resp = await googleToken(token);
    const reqData = {
      id: res.id,
      providerType: 0,
    };
    // console.log(reqData);
    const result = await socialLogin(reqData);
    const naviState = useSocialLogin(result);
    const tempObj = {
      clientid: res.id,
      providerType: 0,
      useremail: res.email,
      name: res.name,
    };
    localStorage.setItem("sociallogin", JSON.stringify(tempObj));
    // localStorage.setItem("clientid", res.id);
    // localStorage.setItem("providerType", 0);
    // localStorage.setItem("useremail", res.email);
    // localStorage.setItem("name", res.name);
    navi(naviState);
  };

  const handleGoogleFailure = error => {
    // 로그인 실패 로직
    console.log(error);
    alert("로그인에 실패하였습니다");
  };

  const handleKkoSuccess = async response => {
    // 로그인 성공 확인
    console.log(response);

    const reqData = {
      id: response.profile.id,
      providerType: 2,
    };
    // console.log(reqData);
    const result = await socialLogin(reqData);
    const naviState = useSocialLogin(result);
    const tempObj = {
      clientid: response.profile.id,
      providerType: 2,
      useremail: response.profile.kakao_account.email,
      name: response.profile.properties.nickname,
    };
    localStorage.setItem("sociallogin", JSON.stringify(tempObj));
    navi(naviState);
  };

  const handleKkoFailure = error => {
    // 로그인 실패 처리
    console.log(error);
    alert("로그인에 실패하였습니다");
  };

  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;
  const CLIENT_SECRET = process.env.REACT_APP_NAVER_CLIENT_SECRET;
  const STATE = "false";
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;

  const handleClick = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  const handleNaverLogin = async data => {
    const reqData = {
      id: NAVER_CLIENT_ID,
      uri: REDIRECT_URI,
      state: STATE,
      token: data,
      secret: CLIENT_SECRET,
    };
    // 액세스 토큰을 이용하여 사용자 정보 조회

    try {
      const tokenResponse = await getNaverUserInfo(reqData);
      console.log(tokenResponse);
      const result = tokenResponse;
      console.log(result);
    } catch (error) {
      console.log(error);
    }

    console.log(data);
    getNaverUserInfo(data);
    // const reqData = {
    //   id: data,
    //   providerType: 1,
    // };
    // const result = await socialLogin(reqData);
    // const naviState = useSocialLogin(result);
    // navi(naviState);
  };

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");

    // console.log(code);
    if (code) {
      handleNaverLogin(code);
    }
  }, []);

  return (
    <div className="login-wrap-panel-social">
      <div className="login-panel-social-title">간편 로그인</div>
      <div className="login-panel-social-list">
        <div
          className="login-panel-social-naver"
          onClick={() => {
            handleClick();
          }}
        >
          <img src={naver} />
        </div>
        {/* <NaverLogin
          clientId={process.env.REACT_APP_NAVER_CLIENT_ID}
          callbackUrl={process.env.REACT_APP_NAVER_REDIRECT_URI}
          onSuccess={handleOnSuccess}
          onError={handleOnError}
          render={({ onClick }) => (
            <div className="login-panel-social-naver" onClick={onClick}>
              <img src={naver} />
            </div>
          )}
        /> */}
        <KakaoLogin
          token={process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY}
          onSuccess={handleKkoSuccess}
          onFailure={handleKkoFailure}
          render={({ onClick }) => (
            <div className="login-panel-social-kakao" onClick={onClick}>
              <img src={kakao} />
            </div>
          )}
        />
        <LoginGoogle
          onSuccess={handleGoogleSuccess}
          onFailure={handleGoogleFailure}
        />
      </div>
    </div>
  );
};

export default SocialSignin;
