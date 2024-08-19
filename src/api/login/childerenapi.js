import axios from "axios";
import { setCookie } from "utils/cookie";
import base64 from "base-64";
import useLoginTimerStart from "hooks/common/useLoginTimerStart";

export const studentsignin = async data => {
  try {
    const response = await axios.post(`/api/student/sign-in`, data);
    // console.log(response);
    setCookie("accessToken", response.data.studentAccessToken);

    let acTken = response.data.studentAccessToken;
    // console.log("토큰 획득 : ", res);
    const payload = JSON.parse(base64.decode(acTken.split(".")[1])).signedUser;
    const signedUser = JSON.parse(payload);

    // ROLE_ADMIN = 어드민;
    // ROLE_TEAHCER = 교직원;
    // ROLE_PARENTS = 학부모;
    // ROLE_STUDENT = 학생;
    setCookie("studentPk", response.data.studentPk);
    setCookie("userRole", signedUser.role);

    // console.log("권한 :", signedUser.role);
    // console.log("유저 PK :", signedUser.userId);
    // alert(signedUser.role);
    useLoginTimerStart();

    return response;
  } catch (error) {
    console.log(error);
  }
};
