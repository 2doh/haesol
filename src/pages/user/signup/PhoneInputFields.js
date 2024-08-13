import usePlaceholder from "hooks/common/usePlaceholder";
import { PhoneNumber } from "utils/helpers";

const PhoneInputFields = ({ children, userPhoneNum, setUserPhoneNum }) => {
  const handleOnChange = e => {
    setUserPhoneNum(PhoneNumber(e));
  };

  const { placeholder, handleFocus, handleBlur } = usePlaceholder(children);

  return (
    <div className="signup-main-fields">
      <div className="signup-main-fields-section-top">
        <div className="fields-section-title">{children}</div>
      </div>
      <div className="signup-main-fields-section-bottom">
        <input
          className="fieleds-section-input"
          type="text"
          value={children}
          onChange={e => {
            setUserPhoneNum(e.target.value);
            handleOnChange(e);
          }}
          placeholder={placeholder}
          onFocus={() => handleFocus()}
          onBlur={() => handleBlur()}
          maxLength={13}
        ></input>
      </div>
    </div>
  );
};

export default PhoneInputFields;
