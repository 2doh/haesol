import logo from "../../images/logo_b.png";
import "../../scss/signup/signup.scss";
import EmailInputField from "./EmailInputField";
import HomeAdressFields from "./HomeAdressFields";
import IdInputField from "./IdInputField";
import InputFields from "./InputFields";
import PassInputField from "./PassInputField";
import PhoneInputFields from "./PhoneInputFields";
import UserSelect from "./UserSelect";

const SignupTeacher = ({
  handleSelect,
  handleSelectTeacher,
  userType,
  handleCancel,
  handleSignup,
}) => {
  return (
    <div className="signup-wrap">
      <div className="signup-wrap-inner br20">
        <div className="signip-wrap-inner-content">
          <div className="signup-top">
            <img className="siginup-logo" src={logo}></img>
            <UserSelect
              handleSelect={handleSelect}
              handleSelectTeacher={handleSelectTeacher}
              userType={userType}
            />
          </div>
          <form>
            <div className="signup-main">
              <IdInputField></IdInputField>
              <PassInputField></PassInputField>
              <InputFields>이름</InputFields>
              <PhoneInputFields>전화번호</PhoneInputFields>
              <EmailInputField>이메일</EmailInputField>
              <HomeAdressFields>상세주소</HomeAdressFields>
              <div className="btwrap">
                <button
                  className="signupbt"
                  onClick={e => {
                    handleSignup(e);
                  }}
                >
                  회원가입
                </button>
                <button className="cancelbt" onClick={handleCancel}>
                  취소
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupTeacher;
