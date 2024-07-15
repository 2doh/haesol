import { teacherSignup } from "api/signup/teacherapi";
import { useEffect, useState } from "react";
import "../../scss/signup/signup.scss";
import DropDate from "./DropDate";
import EmailInputField from "./EmailInputField";
import GenderSelect from "./GenderSelect";
import HomeAdressFields from "./HomeAdressFields";
import IdInputField from "./IdInputField";
import InputFields from "./InputFields";
import PassInputField from "./PassInputField";
import PhoneInputFields from "./PhoneInputFields";
import { useDispatch } from "react-redux";
import { openModal, updateModalDate } from "slices/modalSlice";

const SignupTeacher = ({ handleCancel, userType, setUserType }) => {
  const [userId, setUserId] = useState("xptmxmid1111");
  const [userPass, setUserPass] = useState("TESTPASs!!1");
  const [userPassConfirm, setUserPassConfirm] = useState("TESTPASs!!1");
  const [userName, setUserName] = useState("김스미스");
  const [userPhoneNum, setUserPhoneNum] = useState("010-8323-6670");
  const [userEmail, setUserEmail] = useState("simeqs1344@naver.com");
  const [userGender, setUserGender] = useState("남");
  const [userBirth, setUserBirth] = useState("2024-12-01");
  const [zoneCode, setZoneCode] = useState(0);
  const [addr, setAddr] = useState("");
  const [modalText, setModalText] = useState("");
  const dispatch = useDispatch();
  const [errObj, setErrObj] = useState(null);
  const [canId, setCanId] = useState(false)

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

  console.log(tempObj)
  const showModal = selectModalType => {
    const data = { bodyText: [modalText] };
    dispatch(updateModalDate(data));
    const modalRes = dispatch(openModal(selectModalType));
  };
  
  const signupTeacher = async e => {
    console.log(canId)
    e.preventDefault();
    if(canId === false) {
      setModalText("아이디 중복확인을 해주세요");
      return
    }
    if (canId===true) {
      if (
        !(
          userId &&
          userPass &&
          userPassConfirm &&
          userName &&
          userGender &&
          userPhoneNum &&
          userEmail
        )
      ) {
        setModalText("필수입력항목을 작성해주세요");
        return;
      }
    const result = await teacherSignup(tempObj);
    if (result.data === 1) {
      setModalText("회원가입 되었습니다");
      return;
    }
    if (result === "err") {
      setModalText("이미 존재하는 이메일/전화번호 정보입니다");
      return;
    }
  }
  };

  useEffect(() => {
    if (modalText) {
      showModal("BasicModal");
    }
  }, [modalText]);

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
          setCanId={setCanId}
        />
        <PassInputField
          userPass={userPass}
          setUserPass={setUserPass}
          userPassConfirm={userPassConfirm}
          setUserPassConfirm={setUserPassConfirm}
        ></PassInputField>
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
              showModal("BasicModal");
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
