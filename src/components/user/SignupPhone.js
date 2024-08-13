import styled from "@emotion/styled";
import usePlaceholder from "hooks/common/usePlaceholder";
import React, { useEffect, useState } from "react";
import { PhoneNumber } from "utils/helpers";

const SignupPhone = ({ userPhoneNum, setUserPhoneNum, children }) => {
  const handleOnChange = e => {
    // console.log(e.target.value);
    setUserPhoneNum(PhoneNumber(e));
    // setStudentPhone(PhoneNumber(e));
    // setParentPhone(PhoneNumber(e));
  };

  const { placeholder, handleFocus, handleBlur } =
    usePlaceholder("전화번호를 입력해 주세요");

  return (
    <WrapStyle>
      <TitleWrap>
        <TitleStyle>{children}</TitleStyle>
      </TitleWrap>
      <div className="signup-main-fields-section-bottom">
        <FieldStyle
          value={userPhoneNum}
          className="fieleds-section-input"
          type="text"
          placeholder={placeholder}
          onFocus={() => handleFocus()}
          onBlur={() => handleBlur()}
          // value={phoneNum}
          onChange={e => {
            handleOnChange(e);
          }}
          maxLength={13}
        ></FieldStyle>
      </div>
    </WrapStyle>
  );
};

const WrapStyle = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;
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

const FieldStyle = styled.input`
  border-radius: 5px;
  border: 1px solid #886348;
  width: 100%;
  height: 40px;
  padding-left: 5px;
  color: #2a1b07;
  width: 100%;
`;

export default SignupPhone;
