import { teacherSignup } from "api/signup/teacherapi";
import { useState } from "react";
import logo from "../../images/logo_b.png";
import "../../scss/signup/signup.scss";
import DropDate from "./DropDate";
import EmailInputField from "./EmailInputField";
import GenderSelect from "./GenderSelect";
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
}) => {
  const [userId, setUserId] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhoneNum, setUserPhoneNum] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [zoneCode, setZoneCode] = useState("");
  const [addr, setAddr] = useState("");

  const testObj = {
    teacherId: "rlacjf1",
    password: "Rlacjf12!",
    name: "김철",
    phone: "053-1111-1111",
    email: "asdsad@naver.net",
    gender: "남",
    birth: "2024-1-1",
    zoneCode: 38800,
    addr: "경북 연청신 신녕면 대학길 5-13 안녕",
  };

  const tempObj = {
    teacherId: userId,
    password: userPass,
    name: userName,
    phone: userPhoneNum,
    email: userEmail,
    gender: userGender,
    birth: userBirth,
    zoneCode: zoneCode,
    addr: addr,
  };
  const signupTeacher = async e => {
    e.preventDefault();
    console.log("회원가이 ㅂ확인용");
    const result = await teacherSignup(tempObj);
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
          <form
            onSubmit={e => {
              signupTeacher(e);
            }}
          >
            <div className="signup-main">
              <IdInputField userId={userId} setUserId={setUserId} />
              <PassInputField userPass={userPass} setUserPass={setUserPass} />
              <InputFields userName={userName} setUserName={setUserName}>
                이름
              </InputFields>
              <PhoneInputFields
                userPhoneNum={userPhoneNum}
                setUserPhoneNum={setUserPhoneNum}
              >
                전화번호
              </PhoneInputFields>
              <EmailInputField
                userEmail={userEmail}
                setUserEmail={setUserEmail}
              >
                이메일
              </EmailInputField>
              <GenderSelect setUserGender={setUserGender}>성별</GenderSelect>
              <DropDate setUserBirth={setUserBirth}>생년월일</DropDate>
              <HomeAdressFields setZoneCode={setZoneCode} setAddr={setAddr}>
                상세주소
              </HomeAdressFields>
              <div className="btwrap">
                <button
                  className="signupbt"
                  onClick={e => {
                    signupTeacher(e);
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
