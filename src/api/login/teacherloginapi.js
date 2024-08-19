import axios from "axios";
import { setCookie } from "utils/cookie";
import base64 from "base-64";
import moment from "moment";
import useLoginTimerStart from "hooks/common/useLoginTimerStart";
export const postTeacherSignin = async data => {
  try {
    const res = await axios.post(`/api/teacher/sign-in`, data);
    setCookie("accessToken", res.data.accessToken);
    // ROLE_ADMIN = 어드민;
    // ROLE_TEACHER = 교직원;
    // ROLE_PARENTS = 학부모;
    let acTken = res.data.accessToken;
    const payload = JSON.parse(base64.decode(acTken.split(".")[1])).signedUser;
    const signedUser = JSON.parse(payload);

    setCookie("userRole", signedUser.role);
    setCookie("userIdPk", signedUser.userId);
    setCookie("userGrade", res.data.grade);
    setCookie("userClass", res.data.class);
    setCookie("userName", res.data.name);
    setCookie("userEmail", res.data.email);
    // console.log("권한 :", sigedUser.role);
    // console.log("유저 PK :", signedUser.userId);
    useLoginTimerStart();

    return res;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      const { resultMsg } = error.response.data;
      alert(`로그인 실패: ${resultMsg}`);
      return resultMsg;
    }
  }
};
