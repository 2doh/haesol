import LoginNavi from "components/login/LoginNavi";
import Signin from "components/login/Signin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import logo from "../../images/logo.png";
import "../../scss/login/login.scss";
import "../../scss/login/loginnavi.scss";

const Login = ({ setOnHeader, onHedaer }) => {
  const navi = useNavigate();

  const [naviState, setNaviState] = useState("signin");
  const goHome = () => {
    navi("/");
  };

  const handleClickFindId = e => {
    e.preventDefault();
    navi("/findid");
  };
  const handleClickFindPass = e => {
    e.preventDefault();
    navi("/findpass");
  };
  const handleClickSignup = e => {
    e.preventDefault();
    navi("/signup");
  };

  useEffect(() => {
    setOnHeader(false);
  }, []);

  return (
    <main className="login">
      <div className="login-inner">
        <div className="login-inner-logowrap">
          <img
            className="login-logo"
            src={logo}
            onClick={() => {
              setOnHeader(true);
              goHome();
            }}
          />
        </div>
        <div className="login-wrap br10">
          <LoginNavi setNaviState={setNaviState} naviState={naviState} />
          <Signin naviState={naviState} setNaviState={setNaviState} navi={navi}>
            {naviState}
          </Signin>
        </div>
        <div className="login-menu">
          <div
            onClick={e => {
              handleClickFindId(e);
            }}
            className="login-navi"
          >
            아이디 찾기
          </div>
          <div
            onClick={e => {
              handleClickFindPass(e);
            }}
            className="login-navi"
          >
            비밀번호 찾기
          </div>
          <div
            onClick={e => {
              handleClickSignup(e);
            }}
            className="login-navi"
          >
            회원가입
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
