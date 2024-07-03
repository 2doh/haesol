import styled from "@emotion/styled";
import logo from "../../images/logo_b.png";
import "../../scss/signup/signup.scss";
import HomeAdressFields from "./HomeAdressFields";
import IdInputField from "./IdInputField";
import InputFields from "./InputFields";
import PassInputField from "./PassInputField";
import UserSelect from "./UserSelect";

const SignupParent = ({ handleSelect, handleSelectTeacher, userType }) => {
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
                <InputFields>보호자</InputFields>
                <InputFields>자녀이름</InputFields>
              </UserNameStyle>
              <InputFields>전화번호</InputFields>
              <InputFields>가족관계</InputFields>
              <InputFields>이메일</InputFields>
              <InputFields>추가연락처</InputFields>
              <HomeAdressFields>상세주소</HomeAdressFields>
              <div className="btwrap">
                <button className="signupbt">회원가입</button>
                <button className="cancelbt">취소</button>
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
