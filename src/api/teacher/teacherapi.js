import axios from "axios";
import { getCookie } from "utils/cookie";

/** 선생님 정보 불러오기 */
export const getTeacherInfo = async () => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await axios.get("/api/teacher", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("선생님 정보 확인 : ", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 수정하시오.
/** 선생님 비밀번호 변경 */
export const putTeacherPwChange = async (newPw, userId) => {
  const accessToken = getCookie("accessToken");

  console.log(`New PW : ${newPw}, 선생님 ID : ${userId}`);
  try {
    const response = await axios.put("/api/teacher/put_pwd", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        passWord: `${newPw}`,
        teacherId: `${userId}`,
      },
    });
    console.log("비밀번호 수정 완료");
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 수정하시오.
/** 선생님 비밀번호 변경 */
export const patchTeacherInfo = async () => {
  const accessToken = getCookie("accessToken");

  // console.log(`New PW : ${newPw}, 선생님 ID : ${userId}`);
  try {
    const response = await axios.put("/api/teacher", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {
        passWord: `${newPw}`,
        teacherId: `${userId}`,
      },
    });
    console.log("비밀번호 수정 완료");
    return response;
  } catch (error) {
    console.log(error);
  }
};
