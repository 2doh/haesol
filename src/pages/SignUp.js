import logo from "../images/logo_b.png";
import showpasslogo from "../images/showpass.svg";
import "../scss/signup/signup.scss";
import InputFields from "./signup/InputFields";

const SignUp = () => {
  return (
    <div className="signup">
      <div className="signup-wrap">
        <div className="signup-wrap-inner br20">
          <div className="signip-wrap-inner-content">
            <div className="signup-top">
              <img className="siginup-logo" src={logo}></img>
              <div className="siginup-top-userselect">
                <div className="siginup-user-normal br5">학부모</div>
                <div className="siginup-user-staff br5">교사용</div>
              </div>
            </div>
            <form>
              <div className="signup-main">
                <div className="signup-main-fields">
                  <div className="signup-main-fields-section-top">
                    <div className="fields-section-title">아이디</div>
                    <div className="fields-section-errmsg">
                      사용할 수 없는 아이디입니다
                    </div>
                  </div>
                  <div className="signup-main-fields-section-bottom-id">
                    <input
                      className="fieleds-section-input"
                      type="text"
                      placeholder="아이디 입력 (6~12자)"
                    ></input>
                    <button className="check-duplicate-id-bt br5">
                      중복확인
                    </button>
                  </div>
                </div>
                <div className="signup-main-fields">
                  <div className="signup-main-fields-section-top">
                    <div className="fields-section-title">비밀번호</div>
                    <div className="fields-section-errmsg">
                      20자 이내의 비밀번호를 입력해 주세요
                    </div>
                  </div>
                  <div className="signup-main-fields-section-bottom-pass">
                    <input
                      className="fieleds-section-input"
                      type="text"
                      placeholder="비밀번호 입력 (영어, 숫자, 특수문자 포함 8~20자)"
                    ></input>
                    <img className="showpasslogo" src={showpasslogo} />
                  </div>
                </div>
                <div className="signup-main-fields">
                  <div className="signup-main-fields-section-top">
                    <div className="fields-section-title">비밀번호 확인</div>
                    <div className="fields-section-errmsg">
                      비밀번호가 일치하지 않습니다
                    </div>
                  </div>
                  <div className="signup-main-fields-section-bottom-pass">
                    <input
                      className="fieleds-section-input"
                      type="text"
                      placeholder="비밀번호 확인"
                    ></input>
                    <img className="showpasslogo" src={showpasslogo} />
                  </div>
                </div>
                <InputFields></InputFields>
                <InputFields></InputFields>
                <InputFields></InputFields>
                <InputFields></InputFields>
                <div className="btwrap">
                  <button className="signupbt br5">회원가입</button>
                  <button className="cancelbt br5">취소</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
