import styled from "@emotion/styled";
import Footer from "components/layout/Footer";
import GreenHeaderNoOption from "components/layout/header/GreenHeaderNoOption";
import PhoneInputFields from "pages/student/PhoneInputFields";
import { useState } from "react";
import ChildInputFields from "../signup/ChildInputFields";
import DropFields from "../signup/DropFields";
import "../../../scss/signup/signup.scss";
import { useNavigate } from "react-router";
import TextInput from "components/common/TextInput";
import SignupDrop from "components/user/SignupDrop";
import SignupPhone from "components/user/SignupPhone";

const SocialSignup = () => {
  const [userChildrenCode, setUserChildrenCode] = useState("");
  const [userConnet, setUserConnet] = useState("");
  const [userPhoneNum, setUserPhoneNum] = useState("");
  const [childList, setChildList] = useState([]);
  const [isChild, setIsChild] = useState(false);
  const navi = useNavigate();

  const handleOnSubmit = () => {};

  const handleCancel = () => {
    navi("/");
  };

  return (
    <div className="signup" style={{ flexDirection: "column" }}>
      <GreenHeaderNoOption />
      <WrapStyle>
        <InnerStyle>
          <SignupPhone
            userPhoneNum={userPhoneNum}
            setUserPhoneNum={setUserPhoneNum}
          >
            전화번호
          </SignupPhone>
          <SignupDrop setUserConnet={setUserConnet}>가족관계</SignupDrop>
        </InnerStyle>

        <ChildInputFields
          setUserChildrenCode={setUserChildrenCode}
          userChildrenCode={userChildrenCode}
          setChildList={setChildList}
          setIsChild={setIsChild}
        >
          자녀코드
        </ChildInputFields>
      </WrapStyle>
      <Footer />
    </div>
  );
};

const WrapStyle = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 650px;
  height: 100%;
  min-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #f3f9fa;
  /* border: solid 1px #000; */
  padding: 50px auto;
`;

const InnerStyle = styled.div`
  width: 100%;
  max-width: 400px;
`;

export default SocialSignup;
