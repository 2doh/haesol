import { useEffect, useState } from "react";

const PassInputField = ({
  userPass,
  setUserPass,
  userPassConfirm,
  setUserPassConfirm,
}) => {
  const [showPass, setShowPass] = useState(false);
  const [changeInputType, setChangeInputType] = useState("password");

  const [validationMsg, setValidationMsg] = useState("");
  const [validationConfirmMsg, setValidationConfirmMsg] = useState("");

  const handleShowPass = e => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  const handleOnChange = e => {
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    if (regex.test(e.target.value)) {
      setValidationMsg("");
    } else {
      setValidationMsg("비밀번호 형식에 맞지 않습니다");
    }
  };
  const handleOnChangeConfirm = e => {};
  useEffect(() => {
    if (userPass !== userPassConfirm) {
      setValidationConfirmMsg("비밀번호가 일치하지 않습니다");
    }
    if (userPass === userPassConfirm) {
      setValidationConfirmMsg("");
    }
  }, [userPassConfirm, userPass]);

  useEffect(() => {
    if (showPass) {
      setChangeInputType("text");
    } else {
      setChangeInputType("password");
    }
  }, [showPass]);
  return (
    <>
      <div className="signup-main-fields">
        <div className="signup-main-fields-section-top">
          <div className="fields-section-title">비밀번호</div>
          <div className="fields-section-errmsg">{validationMsg}</div>
        </div>
        <div className="signup-main-fields-section-bottom-pass">
          <input
            className="fieleds-section-input"
            type={changeInputType}
            value={userPass}
            onChange={e => {
              setUserPass(e.target.value);
              handleOnChange(e);
            }}
            placeholder="비밀번호 입력 (영어 소문자, 대문자, 숫자, 특수문자를 포함한 8~20자)"
          ></input>
          <div
            className={!showPass ? "showpass" : "hidepass"}
            onClick={e => {
              handleShowPass(e);
            }}
          />
        </div>
      </div>
      <div className="signup-main-fields">
        <div className="signup-main-fields-section-top">
          <div className="fields-section-title">비밀번호 확인</div>
          <div className="fields-section-errmsg">{validationConfirmMsg}</div>
        </div>
        <div className="signup-main-fields-section-bottom-pass">
          <input
            className="fieleds-section-input"
            type={changeInputType}
            placeholder="비밀번호 확인"
            value={userPassConfirm}
            onChange={e => {
              setUserPassConfirm(e.target.value);
              handleOnChangeConfirm(e);
            }}
          ></input>
          <div
            className={!showPass ? "showpass" : "hidepass"}
            onClick={e => {
              handleShowPass(e);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default PassInputField;
