import { googleSignin, googleToken } from "api/login/google";
import { kkoLogin } from "api/login/kko";
import { useEffect, useState } from "react";
import KakaoLogin from "react-kakao-login";
import kakao from "../../../images/ri_kakao-talk-fill.svg";
import naver from "../../../images/simple-icons_naver.svg";
import LoginGoogle from "./LoginGoogle";
import { naverLogin } from "api/login/naver";

const SocialSignin = () => {
  const handleGoogleSuccess = async response => {
    // 로그인 성공 확인
    // console.log(response);
    // 토큰 내용 확인
    const token = response.access_token;
    // console.log(token);
    // 토큰 파싱
    const resp = await googleToken(token);
    // console.log(reqData);

    const reqData = {
      id: resp,
    };
    // console.log(reqData);
    // 아래는 BE와 통신 코드
    const result = await googleSignin(reqData);
    console.log(result);
  };

  const handleGoogleFailure = error => {
    // 로그인 실패 로직
    console.log(error);
    alert("로그인에 실패하였습니다");
  };

  const handleSuccess = async response => {
    // 로그인 성공 확인
    console.log(response);

    const reqData = {
      id: response.profile.id,
    };

    const result = await kkoLogin(reqData);
    console.log(result);
  };

  const handleFailure = error => {
    // 로그인 실패 처리
    console.log(error);
    alert("로그인에 실패하였습니다");
  };

  const NAVER_CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_NAVER_REDIRECT_URI;
  const STATE = "false";
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;
  const handleClick = () => {
    window.location.href = NAVER_AUTH_URL;
    handleNaverLogin();
  };

  const handleNaverLogin = async data => {
    const reqData = {
      id: data,
    };
    const result = await naverLogin(reqData);
    console.log(result);
  };

  useEffect(() => {
    // 백엔드로 코드값을 넘겨주는 로직
    // 요청 성공 코드값
    let code = new URL(window.location.href).searchParams.get("code");
    console.log(code);
    handleNaverLogin(code);
  }, [handleClick]);

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
          onSuccess={handleSuccess}
          onFailure={handleFailure}
          render={({ onClick }) => (
            <div className="login-panel-social-kakao" onClick={onClick}>
              <img src={kakao} />
            </div>
          )}
        />
        {/* <LoginGoogle
          onSuccess={handleGoogleSuccess}
          onFailure={handleGoogleFailure}
        /> */}
      </div>
    </div>
  );
};

export default SocialSignin;
