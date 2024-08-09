import base64 from "base-64";
import { setCookie } from "utils/cookie";

const useSocialLogin = result => {
  if (result.data.parentsId === -1) {
    alert("자식코드,번호 보내야함");
    return "/signup/social";
  }
  if (result.data.parentsId !== -1) {
    let acTken = result.data.accessToken;
    const payload = JSON.parse(base64.decode(acTken.split(".")[1])).signedUser;
    const signedUser = JSON.parse(payload);
    setCookie("userRole", signedUser.role);
    alert(signedUser.role);
    return "/";
  }
  return;
};

export default useSocialLogin;
