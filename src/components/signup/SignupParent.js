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
import { useState } from "react";
import { parentSignup } from "api/signup/parentapi";

const SignupParent = ({
  handleSelect,
  handleSelectTeacher,
  userType,
  handleCancel,
}) => {
  const [userId, setUserId] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userName, setUserName] = useState("");
  // const [userChildrenName, setUserChildrenName] = useState("");
  const [userPhoneNum, setUserPhoneNum] = useState("");
  const [userSubPhoneNum, setUserSubPhoneNum] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userConnet, setUserConnet] = useState("");
  const [zoneCode, setZoneCode] = useState("");
  const [addr, setAddr] = useState("");
  const tempObj = {
    uid: "idtest1",
    upw: "passtesT1!",
    nm: userName,
    phone: userPhoneNum,
    subPhone: userSubPhoneNum,
    email: userEmail,
    connet: userConnet,
    zoneCode: zoneCode,
    addr: addr,
  };
  console.log(tempObj);
  const handleOnSubmit = async e => {
    e.preventDefault();
    const result = await parentSignup(tempObj);
    console.log(result);
  };

  return (
    <div className="signup-wrap">
      <div className="signup-wrap-inner br20">
        <div className="signup-wrap-inner-content">
          <div className="signup-top">
            <img className="siginup-logo" src={logo}></img>
            <UserSelect
              handleSelect={handleSelect}
              handleSelectTeacher={handleSelectTeacher}
              userType={userType}
            />
          </div>
          <form onSubmit={e => handleOnSubmit(e)}>
            <div className="signup-main">
              <IdInputField
                userId={userId}
                setUserId={setUserId}
              ></IdInputField>
              <PassInputField
                userPass={userPass}
                setUserPass={setUserPass}
              ></PassInputField>
              <UserNameStyle>
                <ParentInputFields
                  setUserName={setUserName}
                  userName={userName}
                >
                  보호자
                </ParentInputFields>
                {/* <ChildInputFields setUserChildrenName={setUserChildrenName}>
                  자녀이름
                </ChildInputFields> */}
              </UserNameStyle>
              <PhoneInputFields
                userPhoneNum={userPhoneNum}
                setUserPhoneNum={setUserPhoneNum}
              >
                전화번호
              </PhoneInputFields>
              <DropFields setUserConnet={setUserConnet}>가족관계</DropFields>
              <EmailInputField setUserEmail={setUserEmail}>
                이메일(선택)
              </EmailInputField>
              <SubPhoneInputFields setUserSubPhoneNum={setUserSubPhoneNum}>
                추가연락처(선택)
              </SubPhoneInputFields>
              <HomeAdressFields setZoneCode={setZoneCode} setAddr={setAddr}>
                상세주소
              </HomeAdressFields>
              <div className="btwrap">
                <button className="signupbt">회원가입</button>
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
