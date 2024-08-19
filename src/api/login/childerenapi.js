import axios from "axios";
import { setCookie } from "utils/cookie";
import base64 from "base-64";

export const studentsignin = async data => {
  try {
    const response = await axios.post(`/api/student/sign-in`, data);
    console.log(response);
    setCookie("accessToken", response.data.studentAccessToken);
    // ROLE_ADMIN = 어드민;
    // ROLE_TEAHCER = 교직원;
    // ROLE_PARENTS = 학부모;
    let acTken = response.data.studentAccessToken;
    // console.log("토큰 획득 : ", res);
    const payload = JSON.parse(base64.decode(acTken.split(".")[1])).signedUser;
    const signedUser = JSON.parse(payload);
    setCookie("userIdPk", signedUser.userId);
    setCookie("userRole", signedUser.role);
    // 선택한 학생 번호 쿠키에 저장
    setCookie("selectChildNum", 0);
    // console.log("권한 :", signedUser.role);
    // console.log("유저 PK :", signedUser.userId);
    // alert(signedUser.role);
    return response;
  } catch (error) {
    console.log(error);
  }
};
