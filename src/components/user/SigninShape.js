import Footer from "components/layout/Footer";
import logo from "../../images/logo.png";
import "../../scss/signup/signup.scss";
import { useNavigate } from "react-router";

const SigninShape = ({ children }) => {
  const navi = useNavigate();
  const handleCancel = () => {
    navi("/");
  };

  return (
    <div className="signup" style={{ flexDirection: "column" }}>
      <main className="login" style={{ width: "100%", maxWidth: "1120px" }}>
        <div
          className="login-inner"
          style={{ marginBottom: "180px", marginTop: "40px" }}
        >
          <div className="login-inner-logowrap">
            <img
              className="login-logo"
              src={logo}
              onClick={() => {
                handleCancel();
              }}
            />
            <div className="student-list-title">
              <span>회원정보 입력</span>
            </div>
          </div>
          <div className="login-wrap br10">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SigninShape;
