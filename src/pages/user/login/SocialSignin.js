import kakao from "../../../images/ri_kakao-talk-fill.svg";
import naver from "../../../images/simple-icons_naver.svg";
import google from "../../../images/devicon_google.svg";
import LoginGoogle from "./LoginGoogle";

const SocialSignin = () => {
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

        <LoginGoogle>
          <div className="login-panel-social-google">
            <img src={google} />
          </div>
        </LoginGoogle>
      </div>
    </div>
  );
};

export default SocialSignin;
