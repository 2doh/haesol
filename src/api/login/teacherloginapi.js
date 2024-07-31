import axios from "axios";
import { setCookie } from "utils/cookie";

import { useSetRecoilState } from "recoil";
import { userClassState, userNameState, userRoleState } from "atoms/formState";

export const postTeacherSignin = async data => {
  try {
    const res = await axios.post(`/api/teacher/sign-in`, data);
    // setCookie("accessToken", res.data.accessToken);

    // ROLE_ADMIN = 어드민;
    // ROLE_TEAHCER = 교직원;
    // ROLE_PARENTS = 학부모;

    setCookie("userClass", res.data.class);
    setCookie("userName", res.data.name);
    setCookie("userEmail", res.data.email);
    // console.log(signedUser);
    // console.log("권한 :", sigedUser.role);
    // console.log("유저 PK :", signedUser.userId);
    return res;
  } catch (error) {
    // console.log(error);
    return "error";
  }
};
