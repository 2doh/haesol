import { removeCookie } from "utils/cookie";

/** 로그아웃 기능 */
export const logout = () => {
  removeCookie("accessToken");
  removeCookie("userIdPk");
  removeCookie("userRole");
  removeCookie("selectChildNum");
  removeCookie("studentPk");

  removeCookie("timerMin");
  removeCookie("timerSec");
  removeCookie("timerTime");
  window.location.reload("/");
};
