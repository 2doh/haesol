import { useGoogleLogin } from "@react-oauth/google";
import google from "../../images/devicon_google.svg";

const LoginGoogle = ({ onSuccess, onFailure }) => {
  const googleLogin = useGoogleLogin({
    onSuccess: onSuccess,
    onError: onFailure,
  });
  return (
    <div
      className="login-panel-social-google"
      onClick={() => {
        googleLogin();
      }}
    >
      <img src={google} alt="Google login" />
    </div>
  );
};

export default LoginGoogle;
