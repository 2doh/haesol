import { PhoneNumber } from "utils/helpers";

const PhoneInputFields = ({ children, userPhoneNum, setUserPhoneNum }) => {
  const handleOnChange = e => {
    setUserPhoneNum(PhoneNumber(e));
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

export default PhoneInputFields;
