import styled from "@emotion/styled";
import { parentSignup } from "api/signup/parentapi";
import { useEffect, useState } from "react";

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
import { useDispatch } from "react-redux";
import { openModal, updateModalDate } from "slices/modalSlice";

const SignupParent = ({ handleCancel, setUserType, userType }) => {
  const navi = useNavigate();
  const [userId, setUserId] = useState("dbwj312");
  const [userPass, setUserPass] = useState("USERIDtest1!");
  const [userPassConfirm, setUserPassConfirm] = useState("USERIDtest1!");
  const [userName, setUserName] = useState("김순수");
  const [userChildrenName, setUserChildrenName] = useState("최박수");
  const [userPhoneNum, setUserPhoneNum] = useState("010-1591-3573");
  const [userSubPhoneNum, setUserSubPhoneNum] = useState("");
  const [userEmail, setUserEmail] = useState("soonja1234@naver.com");
  const [userConnet, setUserConnet] = useState("");
  const [zoneCode, setZoneCode] = useState("");
  const [addr, setAddr] = useState("");
  const [canId, setCanId] = useState(false);

  const [modalText, setModalText] = useState("");
  const dispatch = useDispatch();

  /** 모달 호출 */
  const showModal = selectModalType => {
    const data = { bodyText: [modalText] };
    dispatch(updateModalDate(data));
    const modalRes = dispatch(openModal(selectModalType));
  };

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
  // console.log(tempObj)
  // const handleModal = () => {
  //   showModal("BasicModal");
  // };

  const handleOnSubmit = async e => {
    e.preventDefault();
    const result = await parentSignup(tempObj);
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
          userConnet &&
          userPhoneNum &&
          userEmail
        )
      ) {
        setModalText("필수입력항목을 작성해주세요");
        return;
      }
      if (result.data === 1) {
        setModalText("회원가입 되었습니다");
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
        handleOnSubmit(e);
      }}
    >
      <div className="signup-main">
        <IdInputField
          userId={userId}
          userType={userType}
          setUserId={setUserId}
          setUserType={setUserType}
          setCanId={setCanId}
        ></IdInputField>
        <PassInputField
          userPass={userPass}
          setUserPass={setUserPass}
          userPassConfirm={userPassConfirm}
          setUserPassConfirm={setUserPassConfirm}
        ></PassInputField>
        <UserNameStyle>
          <ParentInputFields setUserName={setUserName} userName={userName}>
            보호자
          </ParentInputFields>
          <ChildInputFields
            setUserChildrenName={setUserChildrenName}
            userChildrenName={userChildrenName}
          >
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
        <EmailInputField setUserEmail={setUserEmail} userEmail={userEmail}>
          이메일
        </EmailInputField>
        <SubPhoneInputFields setUserSubPhoneNum={setUserSubPhoneNum}>
          추가연락처(선택)
        </SubPhoneInputFields>
        <HomeAdressFields setZoneCode={setZoneCode} setAddr={setAddr}>
          상세주소
        </HomeAdressFields>
        <div className="btwrap">
          <button className="signupbt" onClick={e => handleOnSubmit(e)}>
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

export default SignupParent;

const UserNameStyle = styled.div`
  display: flex;
  gap: 10px;
`;
