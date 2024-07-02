import logo from "../images/logo_b.png";
import "../scss/login/login.scss";
import "../scss/login/loginnavi.scss";
import kakao from "../images/ri_kakao-talk-fill.svg";
import naver from "../images/simple-icons_naver.svg";
import google from "../images/devicon_google.svg";
import LoginNavi from "components/login/LoginNavi";

const Login = () => {
  return (
    <main className="login">
      <div className="login-inner">
        <div className="login-inner-logowrap">
          <img className="login-logo" src={logo}></img>
        </div>
        <div className="login-wrap br10">
          <LoginNavi />
          <form className="login-wrap-panel">
            <div className="login-wrap-panel-userid">
              <div className="login-panel-userid-title">아이디</div>
              <input className="login-panel-userid-input" type="text"></input>
            </div>
            <div className="login-wrap-panel-userpass">
              <div className="login-panel-userpass-title">비밀번호</div>
              <input
                className="login-panel-userpass-input"
                type="password"
              ></input>
            </div>
            <button className="login-wrap-panel-loginbt">로그인</button>
            <div className="login-wrap-panel-social">
              <div className="login-panel-social-title">간편 로그인</div>
              <div className="login-panel-social-list">
                <div className="login-panel-social-naver">
                  <img src={naver} />
                </div>
                <div className="login-panel-social-kakao">
                  <img src={kakao} />
                </div>
                <div className="login-panel-social-google">
                  <img src={google} />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
