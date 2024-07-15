import { findParentId } from "api/findinfo/findinfoparentapi";
import { findTeacherId } from "api/findinfo/findinfoteacherapi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PhoneNumber } from "utils/helpers";
import logo from "../../images/logo_b.png";
import "../../scss/findinfo/findid.scss";
import FindInfoNavi from "./FindInfoNavi";

const FindId = () => {
  // 교사 테스트 : 김스미스 / 010-8323-6670
  // 학부모 테스트 : 김순수 / 010-1591-3573
  const navi = useNavigate();
  const [naviState, setNaviState] = useState("parent");
  const [userName, setUserName] = useState("");
  const [userNum, setUserNum] = useState("");
  const [tempState, setTempState] = useState(false);
  const [getUserId, setGetUserId] = useState("");
  const [showErrMsg, setShowErrMsg] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const handleOnChange = e => {
    setUserNum(PhoneNumber(e));
  };
  const handleOnSubmit = async e => {
    e.preventDefault();
    const tempObj = {
      nm: userName,
      phone: userNum,
    };
    const reqData = {
      name: userName,
      phone: userNum,
    };
    if (userName === "" || userNum === "") {
      setErrMsg("빈칸을 모두 입력해 주세요");
      setShowErrMsg(true);
      return;
    }
    if (naviState === "parent") {
      const result = await findParentId(tempObj);
      if (result === "error") {
        setErrMsg("없는 정보입니다 다시 확인해주세요");
        setShowErrMsg(true);
        return;
      }
      if (result.status === 200) {
        setTempState(true);
        setGetUserId(result.data.uid);
        return;
      }
    }
    if (naviState === "teacher") {
      const result = await findTeacherId(reqData);
      if (result === "err") {
        setErrMsg("없는 정보입니다 다시 확인해주세요");
        setShowErrMsg(true);
        return;
      }
      if (result.status === 200) {
        setTempState(true);
        setGetUserId(result.data.id);
        return;
      }
    }
  };

  useEffect(() => {
    setUserName("");
    setUserNum("");
    setErrMsg("");
  }, [naviState]);

  return (
    <div className="login-inner">
      <div className="login-inner-logowrap">
        <img
          className="login-logo"
          src={logo}
          onClick={() => {
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
                <div className="login-panel-userid-title">이름</div>
                <input
                  className="login-panel-userid-input"
                  type="text"
                  value={userName}
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
              ) : (
                <div className="findinfo-errormsg"></div>
              )}
              <button
                className="login-wrap-panel-loginbt"
                onClick={e => handleOnSubmit(e)}
              >
                아이디찾기
              </button>
            </>
          ) : (
            <div className="login-wrap-panel-getuserid">
              <div className="login-panel-getinfo">
                아이디는 {getUserId} 입니다
              </div>
              <button
                className="login-wrap-panel-loginbt"
                onClick={() => {
                  navi("/login");
                }}
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

export default FindId;
