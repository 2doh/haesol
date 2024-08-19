import axios from "axios";
import { setCookie } from "utils/cookie";
import base64 from "base-64";
export const postParentSignin = async data => {
  try {
    const res = await axios.post(`/api/user/parents/sign-in`, data);
    setCookie("accessToken", res.data.accessToken);
    // ROLE_ADMIN = 어드민;
    // ROLE_TEACHER = 교직원;
    // ROLE_PARENTS = 학부모;
    let acTken = res.data.accessToken;
    // console.log("토큰 획득 : ", res);
    const payload = JSON.parse(base64.decode(acTken.split(".")[1])).signedUser;
    const signedUser = JSON.parse(payload);
    setCookie("userIdPk", signedUser.userId);
    setCookie("userRole", signedUser.role);
    setCookie("selectChildNum", 0);
    // 선택한 학생 번호 쿠키에 저장
    // console.log("권한 :", signedUser.role);
    // console.log("유저 PK :", signedUser.userId);
    alert(signedUser.role);
    return res;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      const { resultMsg } = error.response.data;
      alert(`로그인 실패: ${resultMsg}`);
      return resultMsg;
    }
    // else {
    //   // 기타 네트워크 오류 처리
    //   // console.error(error);
    //   const { resultMsg } = error.response.data;
    //   alert("로그인 중 문제가 발생했습니다. 다시 시도해주세요.");
    //   return resultMsg;
    // }
  }
};
