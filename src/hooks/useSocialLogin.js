import base64 from "base-64";
import { setCookie } from "utils/cookie";

const useSocialLogin = result => {
  if (result.data.parentsId === -1) {
    alert("자식코드,번호 보내야함");
    return "/signup/social";
  }
  if (result.data.parentsId !== -1) {
    alert("로그인 되었습니다");
    return "/";
  }
  return;
};

export default useSocialLogin;
