import React, { useState } from "react";

const SubPhoneInputFields = ({ children }) => {
  const [userPhoneNum, setUserPhoneNum] = useState("");
  const handleOnChange = e => {
    let formattedNumber = e.target.value.replace(/[^0-9]/g, "");
    if (formattedNumber.length > 3 && formattedNumber.length <= 7) {
      formattedNumber = formattedNumber.replace(/^(\d{3})(\d{1,4})/, "$1-$2");
    } else if (formattedNumber.length > 7) {
      formattedNumber = formattedNumber.replace(
        /^(\d{3})(\d{4})(\d{1,4})/,
        "$1-$2-$3",
      );
    }
    setUserPhoneNum(formattedNumber);
  };
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

export default SubPhoneInputFields;
