import { useEffect, useState } from "react";

const PassInputField = () => {
  const [showPass, setShowPass] = useState(false);
  const [changeInputType, setChangeInputType] = useState("password");

  const handleShowPass = e => {
    e.preventDefault();
    setShowPass(!showPass);
    console.log(showPass);
  };

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
          <div className="fields-section-errmsg">
            20자 이내의 비밀번호를 입력해 주세요
          </div>
        </div>
        <div className="signup-main-fields-section-bottom-pass">
          <input
            className="fieleds-section-input"
            type={changeInputType}
            placeholder="비밀번호 입력 (영어, 숫자, 특수문자 포함 8~20자)"
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
          <div className="fields-section-errmsg">
            비밀번호가 일치하지 않습니다
          </div>
        </div>
        <div className="signup-main-fields-section-bottom-pass">
          <input
            className="fieleds-section-input"
            type={changeInputType}
            placeholder="비밀번호 확인"
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
