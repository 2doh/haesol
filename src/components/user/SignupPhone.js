import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { PhoneNumber } from "utils/helpers";

const SignupPhone = ({
  placeholder,
  phoneNum,
  setStudentPhone,
  setParentPhone,
  children,
}) => {
  const [userPhoneNum, setUserPhoneNum] = useState(phoneNum);

  useEffect(() => {
    setUserPhoneNum(phoneNum);
  }, [phoneNum]);

  const handleOnChange = e => {
    // console.log(e.target.value);
    setUserPhoneNum(PhoneNumber(e));
    // setStudentPhone(PhoneNumber(e));
    // setParentPhone(PhoneNumber(e));
  };

  return (
    <WrapStyle>
      <TitleWrap>
        <TitleStyle>{children}</TitleStyle>
      </TitleWrap>
      <div className="signup-main-fields-section-bottom">
        <input
          value={userPhoneNum}
          className="fieleds-section-input"
          type="text"
          placeholder={placeholder}
          // value={phoneNum}
          onChange={e => {
            handleOnChange(e);
          }}
          maxLength={13}
        ></input>
      </div>
    </WrapStyle>
  );
};

const WrapStyle = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 30px;
`;

const TitleWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
  width: 100%;
`;

const TitleStyle = styled.div`
  display: flex;
  font-size: 20px;
  white-space: nowrap;
`;

const SelectStyle = styled.select`
  border-radius: 5px;
  border: 1px solid #886348;
  width: 100%;
  height: 40px;
  padding-left: 5px;
  color: #2a1b07;
  width: 100%;
`;

export default SignupPhone;
