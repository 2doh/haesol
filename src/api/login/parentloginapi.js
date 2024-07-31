import axios from "axios";
import { setCookie } from "utils/cookie";
import base64 from "base-64";
import { useSetRecoilState } from "recoil";
import { userClassState, userNameState, userRoleState } from "atoms/formState";

export const postParentSignin = async data => {
  try {
    const res = await axios.post(`/api/user/parents/sign-in`, data);
    // <<<<<<< HEAD

    //     setCookie("accessToken", res.data.accessToken);
    // =======
    // setCookie("accessToken", res.data.accessToken);
    // >>>>>>> b03eba6234f3194e922193ce8463e251ad51c0cd

    // ROLE_ADMIN = 어드민;
    // ROLE_TEAHCER = 교직원;
    // ROLE_PARENTS = 학부모;
    // <<<<<<< HEAD

    //     // console.log("토큰 획득 : ", res);
    //     let acTken = res.data.accessToken;
    //     const payload = JSON.parse(base64.decode(acTken.split(".")[1])).signedUser;
    //     const signedUser = JSON.parse(payload);
    //     setCookie("userIdPk", signedUser.userId);
    //     setCookie("userRole", signedUser.role);
    // =======
    // console.log("토큰 획득 : ", res);

    // 리코일 적용하며 아래 주석처리 하였음
    // let acTken = res.data.accessToken;
    // const payload = JSON.parse(base64.decode(acTken.split(".")[1])).signedUser;
    // const signedUser = JSON.parse(payload);
    // setCookie("userIdPk", signedUser.userId);
    // setCookie("userRole", signedUser.role);
    // >>>>>>> b03eba6234f3194e922193ce8463e251ad51c0cd
    // 선택한 학생 번호 쿠키에 저장
    // setCookie("selectChildNum", 0);
    // console.log("권한 :", signedUser.role);
    // console.log("유저 PK :", signedUser.userId);

    return res;
  } catch (error) {
    // console.log(error);
    return "error";
  }
};
