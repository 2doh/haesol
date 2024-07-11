import styled from "@emotion/styled";
import { parentSignup } from "api/signup/parentapi";
import { useState } from "react";

import "../../scss/signup/signup.scss";
import DropFields from "./DropFields";
import EmailInputField from "./EmailInputField";
import HomeAdressFields from "./HomeAdressFields";
import IdInputField from "./IdInputField";
import ParentInputFields from "./ParentInputFields";
import PassInputField from "./PassInputField";
import PhoneInputFields from "./PhoneInputFields";
import SubPhoneInputFields from "./SubPhoneInputFields";
import ChildInputFields from "./ChildInputFields";
import { useNavigate } from "react-router";

const SignupParent = ({ userType, handleCancel, setUserType }) => {
  const navi = useNavigate();
  const [userId, setUserId] = useState("g4q1121");
  const [userPass, setUserPass] = useState("Qlalh!1511");
  const [userName, setUserName] = useState("김이박");
  const [userChildrenName, setUserChildrenName] = useState("");
  const [userPhoneNum, setUserPhoneNum] = useState("");
  const [userSubPhoneNum, setUserSubPhoneNum] = useState("");
  const [userEmail, setUserEmail] = useState("sdacw12@naver.com");
  const [userConnet, setUserConnet] = useState("부");
  const [zoneCode, setZoneCode] = useState("08080");
  const [addr, setAddr] = useState("ㅎㅇ");
  const tempObj = {
    uid: userId,
    upw: userPass,
    nm: userName,
    phone: userPhoneNum,
    subPhone: userSubPhoneNum,
    email: userEmail,
    connet: userConnet,
    zoneCode: zoneCode,
    addr: addr,
  };

  const handleOnSubmit = async e => {
    e.preventDefault();
    const result = await parentSignup(tempObj);
    if (result?.data === 1) {
      alert("회원가입 되었습니다");
      navi("/login");
      return;
    }
    if (result?.response.status === 404) {
      alert("에러?");
    } else {
      console.log("400에러");
    }
  };

  return (
    <form onSubmit={e => handleOnSubmit(e)}>
      <div className="signup-main">
        <IdInputField
          userId={userId}
          setUserId={setUserId}
          userType={userType}
          setUserType={setUserType}
        ></IdInputField>
        <PassInputField
          userPass={userPass}
          setUserPass={setUserPass}
        ></PassInputField>
        <UserNameStyle>
          <ParentInputFields setUserName={setUserName} userName={userName}>
            보호자
          </ParentInputFields>
          <ChildInputFields setUserChildrenName={setUserChildrenName}>
            자녀이름
          </ChildInputFields>
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
  );
};

export default SignupParent;

const UserNameStyle = styled.div`
  display: flex;
  gap: 10px;
`;
