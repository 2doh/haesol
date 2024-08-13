import styled from "@emotion/styled";
import Footer from "components/layout/Footer";
import GreenHeaderNoOption from "components/layout/header/GreenHeaderNoOption";
import SignupChildInput from "components/user/SignupChildInput";
import SignupDrop from "components/user/SignupDrop";
import SignupPhone from "components/user/SignupPhone";
import { useState } from "react";
import { useNavigate } from "react-router";
import "../../../scss/signup/signup.scss";

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
          <SignupChildInput setUserChildrenCode={setUserChildrenCode}>
            자녀코드
          </SignupChildInput>
          <BtWrapStyle>
            <BtStyle
              onClick={() => {
                showModal("BasicModal");
              }}
              style={{
                border: "1px solid #a8172a",
                backgroundColor: "#dd838f",
                color: "#fff",
              }}
            >
              회원가입
            </BtStyle>
            <BtStyle
              onClick={handleCancel}
              style={{
                border: "1px solid #a8172a",
                backgroundColor: "#fff",
                color: "#dd838f",
              }}
            >
              취소
            </BtStyle>
          </BtWrapStyle>
        </InnerStyle>
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

const BtWrapStyle = styled.div`
  margin: 30px auto 0;
  display: flex;
  gap: 10px;
  /* justify-content: center; */
`;

const BtStyle = styled.button`
  /* padding: 10px 50px; */
  width: 50%;
  height: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
  border-radius: 5px;
`;

export default SocialSignup;
