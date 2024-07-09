const LoginNavi = ({ setNaviState, naviState }) => {
  const findIdStyle = {
    width: "100%",
    borderLeft: "1px solid #886348",
    borderTopLeftRadius: "10px",
  };
  const findPassStyle = {
    width: "100%",
    borderLeft: "1px solid #886348",
    borderRight: "none",
    borderTopLeftRadius: "10px",
  };
  return (
    <div className="login-wrap-navi br10">
      <div
        className={naviState === "signin" ? "selectednavi" : "unselectednavi"}
        onClick={() => {
          setNaviState("signin");
        }}
      >
        로그인
      </div>
      <div
        className={naviState === "find-id" ? "selectednavi" : "unselectednavi"}
        onClick={() => {
          setNaviState("find-id");
        }}
        style={naviState === "find-id" ? findIdStyle : null}
      >
        아이디 찾기
      </div>
      <div
        className={
          naviState === "find-pass" ? "selectednavi" : "unselectednavi"
        }
        onClick={() => {
          setNaviState("find-pass");
        }}
        style={naviState === "find-pass" ? findPassStyle : null}
      >
        비밀번호 찾기
      </div>
    </div>
  );
};

export default LoginNavi;
