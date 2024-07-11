import { useState } from "react";
import { PhoneNumber } from "utils/helpers";
const PhoneInputFields = ({ placeholder, phoneNum }) => {
  const [userPhoneNum, setUserPhoneNum] = useState(phoneNum);
  // console.log("phoneNum : ", phoneNum);
  const handleOnChange = e => {
    setUserPhoneNum(PhoneNumber(e));
  };
  return (
    <div className="signup-main-fields">
      <div className="signup-main-fields-section-top">
        <div className="fields-section-title"></div>
      </div>
      <div className="signup-main-fields-section-bottom">
        <input
          className="fieleds-section-input"
          type="text"
          placeholder={placeholder}
          value={userPhoneNum}
          onChange={e => {
            setUserPhoneNum(e.target.value);
            handleOnChange(e);
          }}
          maxLength={13}
        ></input>
      </div>
    </div>
  );
};
export default PhoneInputFields;
