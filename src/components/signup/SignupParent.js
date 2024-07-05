import styled from "@emotion/styled";
import logo from "../../images/logo_b.png";
import "../../scss/signup/signup.scss";
import ChildInputFields from "./ChildInputFields";
import DropFields from "./DropFields";
import EmailInputField from "./EmailInputField";
import HomeAdressFields from "./HomeAdressFields";
import IdInputField from "./IdInputField";
import ParentInputFields from "./ParentInputFields";
import PassInputField from "./PassInputField";
import PhoneInputFields from "./PhoneInputFields";
import SubPhoneInputFields from "./SubPhoneInputFields";
import UserSelect from "./UserSelect";

const SignupParent = ({
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
              <UserNameStyle>
                <ParentInputFields>보호자</ParentInputFields>
                <ChildInputFields>자녀이름</ChildInputFields>
              </UserNameStyle>
              <PhoneInputFields>전화번호</PhoneInputFields>
              <DropFields>가족관계</DropFields>
              <EmailInputField>이메일(선택)</EmailInputField>
              <SubPhoneInputFields>추가연락처(선택)</SubPhoneInputFields>
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

export default SignupParent;

const UserNameStyle = styled.div`
  display: flex;
  gap: 10px;
`;
