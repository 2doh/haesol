import { findParentPass, putPwdParent } from "api/findinfo/findinfoparentapi";
import { findTeacherPass, putPwd } from "api/findinfo/findinfoteacherapi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PhoneNumber } from "utils/helpers";
import logo from "../../images/logo.png";
import cleanupBt from "../../images/tabler_circle-x-filled.svg";
import FindInfoNavi from "./FindInfoNavi";

const FindPass = ({ setOnHeader }) => {
  // 교사 테스트 : xptmxmid1111 / 010-8323-6670 / TESTPASs!!1
  // 학부모 테스트 : dbwj312 / 010-1591-3573 / USERIDtest1!1
  const navi = useNavigate();
  const [naviState, setNaviState] = useState("parent");
  const [userId, setUserName] = useState("");
  const [userNum, setUserNum] = useState("");
  const [tempState, setTempState] = useState(false);
  const [showErrMsg, setShowErrMsg] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [changePass, setChangePass] = useState("");
  const [confirmChangePass, setConfirmChangePass] = useState("");
  const [certification, setCertification] = useState(false);
  const [certCode, setCertCode] = useState("");
  const [randomCode, setRandomCode] = useState("");
  const [inputType, setinputType] = useState("");
  const [showPass, setShowPass] = useState(false);
  // console.log(randomCode);
  const handleOnChange = e => {
    // 전화번호 자동 `-` 삽입
    setUserNum(PhoneNumber(e));
  };

  const handleShowPass = e => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  const handleClenup = e => {
    e.preventDefault();
    setChangePass("");
  };

  const handleConfirmClenup = e => {
    e.preventDefault();
    setConfirmChangePass("");
  };

  // 비밀번호찾기
  const handleOnSubmit = async e => {
    e.preventDefault();
    if (tempState === false) {
      const tempObj = {
        uid: userId,
        phone: userNum,
      };
      const reqData = {
        id: userId,
        phone: userNum,
      };
      if (userId === "" || userNum === "") {
        setErrMsg("빈칸을 모두 입력해 주세요");
        setShowErrMsg(true);
        return;
      }
      if (naviState === "parent") {
        const result = await findParentPass(tempObj);
        // console.log(result.data);
        if (result === "err") {
          setErrMsg("존재하지 않는 정보입니다");
          setShowErrMsg(true);
        }
        if (result.status === 200) {
          setTempState(true);
          setRandomCode(result.data.RANDOM_CODE);
          return;
        }
      }
      if (naviState === "teacher") {
        const result = await findTeacherPass(reqData);
        if (result === "err") {
          setErrMsg("존재하지 않는 정보입니다");
          setShowErrMsg(true);
        }
        if (result.status === 200) {
          setTempState(true);
          setRandomCode(result.data.RANDOM_CODE);
          return;
        }
      }
    }
  };

  // 휴대폰 인증
  const handleCert = e => {
    e.preventDefault();
    if (certCode === "") {
      setErrMsg("인증 코드를 입력해주세요");
      setShowErrMsg(true);
      return;
    }
    if (certCode === randomCode) {
      setCertification(true);
    }
    if (certCode !== randomCode) {
      setErrMsg("인증 코드가 다릅니다");
      setShowErrMsg(true);
    }
  };
  // console.log(certCode);
  // console.log(randomCode);
  // 비밀번호 변경
  const changePwd = async e => {
    e.preventDefault();
    if (
      confirmChangePass === changePass &&
      confirmChangePass !== "" &&
      changePass !== ""
    ) {
      const regex =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
      const canPass = regex.test(confirmChangePass, changePass);
      if (canPass) {
        setErrMsg("");
      } else {
        setErrMsg("비밀번호 형식에 맞지 않습니다");
        setShowErrMsg(true);
        return;
      }
      const tempObj = {
        teacherId: userId,
        passWord: changePass,
      };
      const temp = {
        uid: userId,
        newUpw: changePass,
      };
      if (naviState === "teacher") {
        const result = await putPwd(tempObj);
        if (result.status === 200) {
          // console.log("교사 비밀번호 변경");
          setOnHeader(true);
          navi("/login");
        }
      }
      if (naviState === "parent") {
        // console.log(temp);
        const result = await putPwdParent(temp);
        if (result.status === 200) {
          // console.log("학부모 비밀번호 변경");
          setOnHeader(true);
          navi("/login");
        }
      }
    }
    if (confirmChangePass !== changePass) {
      setErrMsg("새 비밀번호가 일치하지 않습니다");
      setShowErrMsg(true);
    }
    if (confirmChangePass === "" && changePass === "") {
      setErrMsg("빈 칸 모두 입력해주세요");
      setShowErrMsg(true);
    }
  };

  const handlePwdOnChange = e => {
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    const passConfirm = regex.test(e.target.value);
    if (passConfirm) {
      setErrMsg("");
    } else {
      setErrMsg("비밀번호 형식에 맞지 않습니다");
      setShowErrMsg(true);
    }
  };

  useEffect(() => {
    if (showPass) {
      setinputType("text");
    } else {
      setinputType("password");
    }
  }, [showPass]);

  useEffect(() => {
    setErrMsg("");
  }, [naviState]);

  useEffect(() => {
    setOnHeader(false);
  }, []);

  return (
    <div className="login-inner">
      <div className="login-inner-logowrap">
        <img
          className="login-logo"
          src={logo}
          onClick={() => {
            setOnHeader(true);
            navi("/");
          }}
        />
      </div>
      <div className="login-wrap br10">
        <FindInfoNavi
          naviState={naviState}
          setNaviState={setNaviState}
          setUserName={setUserName}
          setUserNum={setUserNum}
          tempState={tempState}
        />
        <form className="login-wrap-panel">
          {tempState === false ? (
            <>
              <div className="login-wrap-panel-userid">
                <div className="login-panel-userid-title">아이디</div>
                <input
                  className="login-panel-userid-input"
                  type="text"
                  value={userId}
                  onChange={e => {
                    setUserName(e.target.value);
                    setShowErrMsg(false);
                  }}
                />
              </div>
              <div className="login-wrap-panel-userpass">
                <div className="login-panel-userpass-title">전화번호</div>
                <input
                  className="login-panel-userpass-input"
                  value={userNum}
                  onChange={e => {
                    setUserNum(e.target.value);
                    handleOnChange(e);
                    setShowErrMsg(false);
                  }}
                  maxLength={13}
                />
              </div>
              {showErrMsg ? (
                <div className="findinfo-errormsg">{errMsg}</div>
              ) : null}
              <button
                className="login-wrap-panel-loginbt"
                onClick={e => handleOnSubmit(e)}
              >
                비밀번호 찾기
              </button>
            </>
          ) : certification === false ? (
            <>
              <div className="login-wrap-panel-userpass">
                <div className="login-panel-userpass-title">인증코드</div>
                <input
                  className="login-panel-userpass-input"
                  value={certCode}
                  onChange={e => {
                    setCertCode(e.target.value);
                  }}
                />
                {showErrMsg ? (
                  <div className="findinfo-errormsg">{errMsg}</div>
                ) : null}
              </div>
              <button
                className="login-wrap-panel-loginbt"
                onClick={e => handleCert(e)}
                style={{ cursor: "pointer" }}
              >
                인증하기
              </button>
            </>
          ) : (
            <div className="login-wrap-panel">
              <div className="login-wrap-panel-userpass">
                <div className="login-wrap-panel-userid">
                  <div className="login-panel-userid-title">새 비밀번호</div>
                  <input
                    className="login-panel-userid-input"
                    type={inputType}
                    value={changePass}
                    onChange={e => {
                      setChangePass(e.target.value);
                      setShowErrMsg(false);
                      handlePwdOnChange(e);
                    }}
                  />
                  {changePass ? (
                    <>
                      <div
                        className={!showPass ? "showpass" : "hidepass"}
                        onClick={e => {
                          handleShowPass(e);
                        }}
                      />
                      <img
                        className="cleanupbt"
                        src={cleanupBt}
                        onClick={e => {
                          handleClenup(e);
                        }}
                      />
                    </>
                  ) : null}
                </div>
              </div>
              <div className="login-wrap-panel-userpass">
                <div className="login-panel-userpass-title">
                  새 비밀번호 확인
                </div>
                <input
                  className="login-panel-userpass-input"
                  value={confirmChangePass}
                  type={inputType}
                  onChange={e => {
                    setConfirmChangePass(e.target.value);
                    setShowErrMsg(false);
                  }}
                />
                {confirmChangePass ? (
                  <>
                    <div
                      className={!showPass ? "showpass" : "hidepass"}
                      onClick={e => {
                        handleShowPass(e);
                      }}
                    />
                    <img
                      className="cleanupbt"
                      src={cleanupBt}
                      onClick={e => {
                        handleConfirmClenup(e);
                      }}
                    />
                  </>
                ) : null}
              </div>
              {showErrMsg ? (
                <div className="findinfo-errormsg">{errMsg}</div>
              ) : null}
              <button
                className="login-wrap-panel-loginbt"
                onClick={e => changePwd(e)}
              >
                확인
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FindPass;
