import { googleLogout } from "@react-oauth/google";
import kakao from "../../../images/ri_kakao-talk-fill.svg";
import naver from "../../../images/simple-icons_naver.svg";
import LoginGoogle from "./LoginGoogle";
import { googleSignin } from "api/login/socialsignin";

const SocialSignin = () => {
  const handleGoogleSuccess = async response => {
    // 로그인 성공 로직
    console.log("Google Login Success:", response);
    // const result = await googleSignin(response.clientId);
    // console.log(result);
  };

  const handleGoogleFailure = error => {
    // 로그인 실패 로직
    console.log("Google Login Failure:", error);
  };

  const handleDelete = async () => {
    if (window.confirm("정말로 회원 탈퇴를 하시겠습니까?")) {
      try {
        const response = await fetch("/revoke-token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        if (response.ok) {
          alert("Account unlinked successfully");
          // 추가적인 로그아웃 또는 상태 업데이트 로직
        } else {
          alert("Failed to unlink account");
        }
      } catch (error) {
        console.error("Error unlinking account:", error);
      }
    }
  };

  return (
    <div className="login-wrap-panel-social">
      <div className="login-panel-social-title">간편 로그인</div>
      <button
        onClick={handleDelete}
        style={{ cursor: "pointer", color: "red" }}
      >
        Delete Account
      </button>
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
