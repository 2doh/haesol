import { teacherSignup } from "api/signup/teacherapi";
import { useState } from "react";
import "../../scss/signup/signup.scss";
import DropDate from "./DropDate";
import EmailInputField from "./EmailInputField";
import GenderSelect from "./GenderSelect";
import HomeAdressFields from "./HomeAdressFields";
import IdInputField from "./IdInputField";
import InputFields from "./InputFields";
import PassInputField from "./PassInputField";
import PhoneInputFields from "./PhoneInputFields";

const SignupTeacher = ({ handleCancel, userType, setUserType }) => {
  const [userId, setUserId] = useState("rlacjf111");
  const [userPass, setUserPass] = useState("Rlacjf112!!");
  const [userName, setUserName] = useState("김철숙");
  const [userPhoneNum, setUserPhoneNum] = useState("010-1111-1111");
  const [userEmail, setUserEmail] = useState("asdsad12@naver.com");
  const [userGender, setUserGender] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [zoneCode, setZoneCode] = useState(38811);
  const [addr, setAddr] = useState("경북 연청신 신녕면 대학길 5-13 안녕하세요");

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
    if (
      !(
        userId &&
        userPass &&
        userName &&
        userEmail &&
        userGender &&
        userPhoneNum
      )
    ) {
      alert("필수입력항목을 작성해주세요");
      return;
    }
    const result = await teacherSignup(tempObj);
    if (result.status === 200) {
      console.log("교사회원가입 성공");
    }
    // if (result.status === 404) {
    //   alert(result.response.data);
    // }
    if (result === undefined) {
      alert("회원가입 실패");
    }
  };

  return (
    <form
      onSubmit={e => {
        signupTeacher(e);
      }}
    >
      <div className="signup-main">
        <IdInputField
          userId={userId}
          setUserId={setUserId}
          userType={userType}
          setUserType={setUserType}
        />
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
        <EmailInputField userEmail={userEmail} setUserEmail={setUserEmail}>
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
  );
};

export default SignupTeacher;
