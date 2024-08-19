import { removeCookie } from "utils/cookie";

/** 로그인 할 때 로그인 유효시간 저장 */
const useLogout = () => {
  // 타이머
  removeCookie("timerMin");
  removeCookie("timerSec");
  removeCookie("timerTime");
  removeCookie("loginTime");

  // 공통
  removeCookie("userRole");
  removeCookie("accessToken");

  // 학부모, 교직원
  removeCookie("userIdPk");

  // 학부모
  removeCookie("studentPk");
  removeCookie("selectChildNum");

  // 교직원
  removeCookie("userClass");
  removeCookie("userEmail");
  removeCookie("userGrade");
  removeCookie("userName");

  window.location.reload("/");
};

export default useLogout;
