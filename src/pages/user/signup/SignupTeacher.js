import { teacherSignup } from "api/signup/teacherapi";
import { useEffect, useState } from "react";
import "../../../scss/signup/signup.scss";
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
  const [userId, setUserId] = useState("");
  const [userPass, setUserPass] = useState("");
  const [userPassConfirm, setUserPassConfirm] = useState("");
  const [userName, setUserName] = useState("");
  const [userPhoneNum, setUserPhoneNum] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userBirth, setUserBirth] = useState("");
  const [zoneCode, setZoneCode] = useState(0);
  const [addr, setAddr] = useState("");
  const [modalText, setModalText] = useState("");
  const dispatch = useDispatch();
  const [canId, setCanId] = useState(false);

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

  const showModal = selectModalType => {
    const data = { bodyText: [modalText], modalRes: [16], buttonCnt: 1 };
    dispatch(updateModalDate(data));
    const modalRes = dispatch(openModal(selectModalType));
  };

  const signupTeacher = async e => {
    // console.log(canId);
    e.preventDefault();
    if (canId === false) {
      setModalText("아이디 중복확인을 해주세요");
      return;
    }
    if (canId === true) {
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
      if (result.status === 200) {
        const data = {
          bodyText: ["회원가입 되었습니다"],
          modalRes: [17],
          buttonCnt: 1,
        };
        dispatch(updateModalDate(data));
        const modalRes = dispatch(openModal("BasicModal"));
        return;
      }
      if (result === "err") {
        setModalText("이미 존재하는 정보입니다");
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
            onClick={() => {
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
