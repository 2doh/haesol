import React from "react";

const IdInputField = () => {
  return (
    <div className="signup-main-fields">
      <div className="signup-main-fields-section-top">
        <div className="fields-section-title">아이디</div>
        <div className="fields-section-errmsg">사용할 수 없는 아이디입니다</div>
      </div>
      <div className="signup-main-fields-section-bottom-id">
        <input
          className="fieleds-section-input"
          type="text"
          placeholder="아이디 입력 (6~12자)"
        ></input>
        <button className="check-duplicate-id-bt">중복확인</button>
      </div>
    </div>
  );
};

export default IdInputField;
