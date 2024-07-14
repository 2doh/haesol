import { useEffect, useRef, useState } from "react";
import { PhoneNumber } from "utils/helpers";

const PhoneInputFields = ({ placeholder, phoneNum }) => {
  const phoneNumRes = useRef();
  // const [userPhoneNum, setUserPhoneNum] = useState();

  const handleOnChange = e => {
    phoneNumRes.current.value = PhoneNumber(e);
  };

  // console.log("전화번호 : ", userPhoneNum);

  return (
    <div className="signup-main-fields">
      <div className="signup-main-fields-section-top">
        <div className="fields-section-title"></div>
      </div>
      <div className="signup-main-fields-section-bottom">
        <input
          ref={phoneNumRes}
          className="fieleds-section-input"
          type="text"
          placeholder={placeholder}
          value={phoneNum}
          onChange={e => {
            // setUserPhoneNum(e.target.value);
            handleOnChange(e);
          }}
          maxLength={13}
        ></input>
      </div>
    </div>
  );
};
export default PhoneInputFields;
