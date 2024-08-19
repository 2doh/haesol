import moment from "moment";
import { setCookie } from "utils/cookie";

/** 로그인 할 때 로그인 유효시간 저장 */
const useLoginTimerStart = () => {
  // 로그인 만료 시간 저장
  setCookie("loginTime", moment().add(1, "h").format("YYYYMMDDHHmmss"));

  // 타이머 표시 시간 초기 설정
  setCookie("timerMin", 60);
  setCookie("timerSec", 0);
  setCookie("timerTime", 3600);
};

export default useLoginTimerStart;
