import { useEffect, useRef, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { PiEyeClosed } from "react-icons/pi";
import { VscEye } from "react-icons/vsc";
import "../../scss/user/viewpw.css";

const ViewPw = ({ setNewPw, setNewPwWarningCheck }) => {
  const hidePw = useRef("");
  const [hidePassword, setHidePassword] = useState(true);
  const [inputTextChlick, setInputTextChlick] = useState(false);

  const [validationMsg, setValidationMsg] = useState("");
  // const [validationConfirmMsg, setValidationConfirmMsg] = useState("");

  /** 비밀번호 형식 체크 */
  // const handleOnChange = e => {
  //   const regex =
  //     /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
  //   if (regex.test(e.target.value)) {
  //     setValidationMsg("");
  //   } else {
  //     setValidationMsg("비밀번호 형식에 맞지 않습니다");
  //   }
  // };
  // const handleOnChangeConfirm = e => {};

  // /** 비밀번호 일치 여부 체크 */
  // useEffect(() => {
  //   if (userPass !== userPassConfirm) {
  //     setValidationConfirmMsg("비밀번호가 일치하지 않습니다");
  //   }
  //   if (userPass === userPassConfirm) {
  //     setValidationConfirmMsg("");
  //   }
  // }, [userPassConfirm, userPass]);

  /** 비밀번호 형식 체크 */
  const handleOnChange = e => {
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    if (regex.test(e.target.value)) {
      setNewPwWarningCheck(true);
      setValidationMsg("");
    } else {
      setNewPwWarningCheck(false);
      setValidationMsg("비밀번호 형식에 맞지 않습니다");
    }

    // if (newPwRe !== newPw) {
    //   setValidationConfirmMsg("비밀번호가 일치하지 않습니다");
    // }
  };

  const hidePasswordHandler = ({ hidePassword, setHidePassword, hidePw }) => {
    setHidePassword(!hidePassword);
    //   console.log(hidePw.current.type);
    switch (hidePw.current.type) {
      case "text":
        hidePw.current.type = "password";
        break;
      case "password":
        hidePw.current.type = "text";
        break;
      default:
        hidePw.current.type = "text";
        break;
    }
  };

  /** 비밀번호 형식 체크 */
  const inputPw = e => {
    setNewPw(e.target.value);

    if (e.target.value) {
      setInputTextChlick(true);
    } else {
      setInputTextChlick(false);
    }

    // const regex =
    //   /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    // if (regex.test(e.target.value)) {
    //   setValidationMsg("");
    // } else {
    //   setValidationMsg("비밀번호 형식에 맞지 않습니다");
    // }
  };

  useEffect(() => {
    // console.log("inputTextChlick : ", inputTextChlick);
  }, [inputTextChlick]);

  /** 입력 내용 리셋 */
  const inputTextReset = () => {
    hidePw.current.value = "";
    hidePw.current.type = "password";
    setHidePassword(true);
    setInputTextChlick(false);
  };

  return (
    <div className="view-pw-div">
      <div className="pw-input-div">
        <div className="hide-pw-div">
          <input
            ref={hidePw}
            type="password"
            onChange={e => {
              inputPw(e);
              handleOnChange(e);
            }}
          />
        </div>
        {inputTextChlick ? (
          <div className="pw-icon-div">
            <div className="hide-pw-div hide-pw-icon">
              {hidePassword ? (
                <VscEye
                  size={20}
                  onClick={() => {
                    hidePasswordHandler({
                      hidePassword,
                      setHidePassword,
                      hidePw,
                    });
                  }}
                >
                  눈모양 아이콘
                </VscEye>
              ) : (
                <PiEyeClosed
                  size={20}
                  onClick={() => {
                    hidePasswordHandler({
                      hidePassword,
                      setHidePassword,
                      hidePw,
                    });
                  }}
                >
                  눈모양 아이콘
                </PiEyeClosed>
              )}
            </div>
            <div
              className="hide-pw-div hide-pw-icon"
              onClick={() => {
                inputTextReset();
              }}
            >
              <IoCloseCircle size={18}>입력 리셋 아이콘</IoCloseCircle>
            </div>
          </div>
        ) : null}
      </div>
      {validationMsg === "" ? null : (
        <div className="pw-check">{validationMsg}</div>
      )}
    </div>
  );
};

export default ViewPw;
