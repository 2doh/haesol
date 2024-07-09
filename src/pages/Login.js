import LoginNavi from "components/login/LoginNavi";
import { useState } from "react";
import { useNavigate } from "react-router";
import logo from "../images/logo_b.png";
import Signin from "components/login/Signin";
import "../scss/login/login.scss";
import "../scss/login/loginnavi.scss";
import FindId from "components/login/FindId";

const Login = () => {
  const navi = useNavigate();

  const [naviState, setNaviState] = useState("signin");

  const goHome = () => {
    navi("/");
  };

  return (
    <main className="login">
      <div className="login-inner">
        <div className="login-inner-logowrap">
          <img
            className="login-logo"
            src={logo}
            onClick={() => {
              goHome();
            }}
          />
        </div>
        <div className="login-wrap br10">
          <LoginNavi setNaviState={setNaviState} naviState={naviState} />
          <Signin naviState={naviState} setNaviState={setNaviState}>
            {naviState}
          </Signin>
        </div>
      </div>
    </main>
  );
};

export default Login;
