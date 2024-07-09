import { useEffect, useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";

const ViewPw = ({ setNewPw }) => {
  const hidePw = useRef("");
  const [hidePassword, setHidePassword] = useState(true);
  const [inputTextChlick, setInputTextChlick] = useState(false);

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

  /** 입력한 값 전달 */
  const inputPw = e => {
    setNewPw(e.target.value);

    if (e.target.value) {
      setInputTextChlick(true);
    } else {
      setInputTextChlick(false);
    }
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
    <div className="pw-input-div">
      <div className="hide-pw-div">
        <input
          ref={hidePw}
          type="password"
          // placeholder="Password를 입력해주세요"
          // placeholder={setNewPw}
          // value={userPassword}
          // secureTextEntry={hidePassword}
          // onChangeText={text => setUserPassword(text)}
          onChange={e => {
            inputPw(e);
          }}
        />
      </div>
      {inputTextChlick ? (
        <div className="pw-icon-div">
          <div className="hide-pw-div hide-pw-icon">
            {hidePassword ? (
              <AiFillEyeInvisible
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
              </AiFillEyeInvisible>
            ) : (
              <AiFillEye
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
              </AiFillEye>
            )}
          </div>
          <div
            className="hide-pw-div hide-pw-icon"
            onClick={() => {
              inputTextReset();
            }}
          >
            <TiDelete size={20}>입력 리셋 아이콘</TiDelete>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ViewPw;
