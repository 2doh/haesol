import { findParentPass } from "api/findinfo/findinfoparentapi";
import { findTeacherPass } from "api/findinfo/findinfoteacherapi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { PhoneNumber } from "utils/helpers";
import logo from "../../images/logo_b.png";
import FindInfoNavi from "./FindInfoNavi";

const FindPass = () => {
  // 교사 테스트 : xptmxmid1111 / 010-8323-6670
  // 학부모 테스트 : dbwj312 / 010-1591-3573
  const navi = useNavigate();
  const [naviState, setNaviState] = useState("parent")
  const [userId, setUserName] = useState(" dbwj312");
  const [userNum, setUserNum] = useState("010-1591-3573");
  const [tempState, setTempState] = useState(false)
  const [showErrMsg, setShowErrMsg] = useState(false)
  const [errMsg, setErrMsg] = useState("")
  const [changePass, setChangePass] = useState("")
  const [confirmChangePass, setConfirmChangePass] = useState("")
  const [certification,setCertification] = useState(false)
  const [certCode, setCertCode] = useState("")
  const [randomCode, setRandomCode] = useState("")


  const handleOnChange = e => {
    // 전화번호 자동 `-` 삽입
    setUserNum(PhoneNumber(e));
  };

  // 비밀번호찾기
  const handleOnSubmit = async e => {
    e.preventDefault()
    if(tempState===false){
      const tempObj = {
        uid : userId,
        phone : userNum
      }
      const reqData = {
        id : userId,
        phone : userNum
      }
      if(userId === "" || userNum === ""){
        setErrMsg("빈칸을 모두 입력해 주세요")
        setShowErrMsg(true)
        return
      }
      if (naviState === "parent") {
        const result = await findParentPass(tempObj)
        console.log(result)
        if(result === "error"){
          setShowErrMsg(true)
        }
        if(result.status === 200){
          setTempState(true)
          return
        }
      }
      if (naviState === "teacher") {
        const result = await findTeacherPass(reqData)
        console.log(result)
        if(result === "error"){
          setShowErrMsg(true)
        }
        if(result.status === 200){
          setTempState(true)
          setRandomCode(result.data.randomCode)
          return
        }
      }
    }
  }

  // 휴대폰 인증
  const handleCert = (e) => {
    e.preventDefault()
    if(certCode===""){
      setErrMsg("인증 코드를 입력해주세요")
      setShowErrMsg(true)
      return
    }
    if(certCode===randomCode){
      setCertification(true)
    }
    if(certCode!==randomCode){
      setErrMsg("인증 코드가 다릅니다")
      setShowErrMsg(true)
    }
  }

  const changePwd = async (e) => {
    e.preventDefault()
    if(confirmChangePass===changePass, errMsg===""){
      // const tempObj={
      //   teacherId : 
      // }
      // const result = await
    }
  }

  const handlePwdOnChange = e => {
    const regex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    if (regex.test(e.target.value)) {
      setErrMsg("");
    } else {
      setErrMsg("비밀번호 형식에 맞지 않습니다");
    }
  };

  useEffect(()=>{
    if(confirmChangePass===changePass){
      setErrMsg("")
    }
    if(confirmChangePass!==changePass){
      setErrMsg("비밀번호가 일치하지 않습니다")
    }
  },[confirmChangePass])

  return (
    <div className="login-inner">
      <div className="login-inner-logowrap">
          <img
            className="login-logo"
            src={logo}
            onClick={() => {
              navi("/")
            }}
          />
        </div>
    <div className="login-wrap br10">
    <FindInfoNavi naviState={naviState} setNaviState={setNaviState} setUserName={setUserName} setUserNum={setUserNum} tempState={tempState}/>
    <form className="login-wrap-panel">
    {tempState === false ? (<>
      <div className="login-wrap-panel-userid">
        <div className="login-panel-userid-title">아이디</div>
        <input
          className="login-panel-userid-input"
          type="text"
          value={userId}
          onChange={e => {setUserName(e.target.value); setShowErrMsg(false)}}
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
            setShowErrMsg(false)
          }}
          maxLength={13}
        />
      </div>
      {showErrMsg ? <div className="findinfo-errormsg">{errMsg}</div> : null}
      <button className="login-wrap-panel-loginbt" onClick={e=>handleOnSubmit(e)}>비밀번호 찾기</button>
      </>) : 
      (certification===false ?
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
        {showErrMsg ? <div className="findinfo-errormsg">{errMsg}</div> : null}
      </div>
      <button className="login-wrap-panel-loginbt" onClick={e=>handleCert(e)}>인증하기</button>
      </>
       : 
       <div className="login-wrap-panel">
      <div className="login-wrap-panel-userid">
        <div className="login-panel-userid-title">새 비밀번호</div>
        <input
          className="login-panel-userid-input"
          type="text"
          value={changePass}
          onChange={e => {setChangePass(e.target.value); setShowErrMsg(false)}}
        />
      </div>
      <div className="login-wrap-panel-userpass">
        <div className="login-panel-userpass-title">새 비밀번호 확인</div>
        <input
          className="login-panel-userpass-input"
          value={confirmChangePass}
          onChange={e => {
            setConfirmChangePass(e.target.value);
            setShowErrMsg(false)
            handlePwdOnChange()
          }}
        />
      </div>
      <button className="login-wrap-panel-loginbt" onClick={(e)=>changePwd(e)}>확인</button>
        </div>)}
    </form>
    </div>
    </div>
  );
};

export default FindPass;
