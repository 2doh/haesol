const LoginNavi = ({ setNaviState, naviState }) => {
  const findIdStyle = {
    width: "100%",
    borderLeft: "1px solid #886348",
    borderTopLeftRadius: "10px",
    borderRight: "0",
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
        학부모 로그인
      </div>
      <div
        className={
          naviState === "teacherlogin" ? "selectednavi" : "unselectednavi"
        }
        onClick={() => {
          setNaviState("teacherlogin");
        }}
        style={naviState === "teacherlogin" ? findIdStyle : null}
      >
        교직원
      </div>
    </div>
  );
};

export default LoginNavi;
