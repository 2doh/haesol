import { useNavigate } from "react-router";

const UnauthenticatedProfile = () => {
  const navigate = useNavigate();

  const moveLoginPage = () => {
    navigate("/login");
  };

  const moveFindIdPage = () => {
    navigate("/findid");
  };
  const moveFindPwPage = () => {
    navigate("/findpass");
  };

  const moveSingupPage = () => {
    navigate("/signup");
  };

  return (
    <div className="main-inner-info">
      {/* 내 정보 - start */}
      <div className="main-login-user-info">
        {/* <div className="main-schedule-title main-contents-title">
      <div className="main-schedule-title-text">학교 일정</div>
    </div> */}
        <div className="main-inner-info-login">
          <div className="login-inner">
            <button
              className="main-info-loginbt"
              onClick={() => {
                moveLoginPage();
              }}
            >
              로그인 해주세요
            </button>
            <div className="main-info-login-menu">
              <div
                className="id-inquiry-page-move"
                onClick={() => {
                  moveFindIdPage();
                }}
              >
                아이디 찾기
              </div>
              <div
                className="pw-inquiry-page-move"
                onClick={() => {
                  moveFindPwPage();
                }}
              >
                비밀번호 찾기
              </div>
              <div
                className="signup-page-move"
                onClick={() => {
                  moveSingupPage();
                }}
              >
                회원가입
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthenticatedProfile;
