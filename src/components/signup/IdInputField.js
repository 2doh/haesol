import { duplicateId } from "api/signup/apiteacherapi";
import { useEffect, useState } from "react";

const IdInputField = ({ userId, setUserId }) => {
  const [validationMsg, setValidationMsg] = useState("");

  const handleCheckUserId = async e => {
    e.preventDefault();
    const result = await duplicateId(userId);
    console.log(result);
  };

  const handleOnChange = e => {
    const regex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{6,16}$/;
    if (regex.test(e.target.value)) {
      setValidationMsg("");
    } else {
      setValidationMsg("아이디 형식에 맞지 않습니다");
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="signup-main-fields">
      <div className="signup-main-fields-section-top">
        <div className="fields-section-title">아이디</div>
        <div className="fields-section-errmsg">{validationMsg}</div>
      </div>
      <div className="signup-main-fields-section-bottom-id">
        <input
          className="fieleds-section-input"
          type="text"
          placeholder="아이디 입력 (영어,숫자가 포함된 6~16자)"
          value={userId}
          onChange={e => {
            setUserId(e.target.value);
            handleOnChange(e);
          }}
        ></input>
        <button
          className="check-duplicate-id-bt"
          onClick={e => {
            handleCheckUserId(e);
          }}
        >
          중복확인
        </button>
      </div>
    </div>
  );
};

export default IdInputField;
