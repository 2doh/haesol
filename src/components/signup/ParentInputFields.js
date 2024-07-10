import React from "react";

const ParentInputFields = ({ children, setUserName, userName }) => {
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
          value={userName}
          onChange={e => {
            setUserName(e.target.value);
          }}
        ></input>
      </div>
    </div>
  );
};

export default ParentInputFields;
