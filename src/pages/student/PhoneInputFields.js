import { useEffect, useRef, useState } from "react";
import { PhoneNumber } from "utils/helpers";

const PhoneInputFields = ({ placeholder, phoneNum, setPhoneNum }) => {
  const [userPhoneNum, setUserPhoneNum] = useState(phoneNum);

  useEffect(() => {
    setUserPhoneNum(phoneNum);
  }, [phoneNum]);

  const handleOnChange = e => {
    // console.log(e.target.value);
    setUserPhoneNum(PhoneNumber(e));
    setPhoneNum(PhoneNumber(e));
  };

  return (
    <div className="signup-main-fields">
      <div className="signup-main-fields-section-top">
        <div className="fields-section-title"></div>
      </div>
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
    </div>
  );
};
export default PhoneInputFields;
