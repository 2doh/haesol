import axios from "axios";
import { setCookie } from "utils/cookie";
import base64 from "base-64";

export const postParentSignin = async data => {
  try {
    const res = await axios.post(`/api/user/parents/sign-in`, data);
    setCookie("accessToken", res.data.accessToken);

    console.log(res);

    // ROLE_ADMIN = 어드민;
    // ROLE_TEAHCER = 교직원;
    // ROLE_PARENTS = 학부모;
    let acTken = res.data.accessToken;
    const payload = JSON.parse(base64.decode(acTken.split(".")[1])).signedUser;
    const signedUser = JSON.parse(payload);
    setCookie("userIdPk", signedUser.userId);
    setCookie("userRole", signedUser.role);
    // console.log("권한 :", signedUser.role);
    // console.log("유저 PK :", signedUser.userId);
    return res;
  } catch (error) {
    console.log(error);
    return "error";
  }
};
