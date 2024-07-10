import React, { useEffect, useState } from "react";
import { PhoneNumber } from "utils/helpers";

const SubPhoneInputFields = ({ children, setUserSubPhoneNum }) => {
  const [isUserSubPhoneNum, setIsUserSubPhoneNum] = useState("");
  const handleOnChange = e => {
    setIsUserSubPhoneNum(PhoneNumber(e));
  };
  useEffect(() => {
    setUserSubPhoneNum(isUserSubPhoneNum);
  }, [isUserSubPhoneNum]);
  return (
    <div className="signup-main-fields">
      <div className="signup-main-fields-section-top">
        <div className="fields-section-title">{children}</div>
      </div>
      <div className="signup-main-fields-section-bottom">
        <input
          className="fieleds-section-input"
          type="text"
          placeholder={children}
          value={isUserSubPhoneNum}
          onChange={e => {
            setIsUserSubPhoneNum(e.target.value);
            handleOnChange(e);
          }}
          maxLength={13}
        ></input>
      </div>
    </div>
  );
};

export default SubPhoneInputFields;
