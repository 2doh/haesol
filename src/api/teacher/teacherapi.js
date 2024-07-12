import axios from "axios";
import { getCookie } from "utils/cookie";

/** 선생님 정보 불러오기 */
export const getTeacherInfo = async () => {
  const accessToken = getCookie("accessToken");
  console.log("들어오나? : ", accessToken);
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

/** 선생님 비밀번호 변경 */
export const putTeacherPwChange = async (userId, userNewPw) => {
  const accessToken = getCookie("accessToken");
  console.log(`유저 ID : ${userId}, New PW : ${userNewPw}`)
  // try {
  //   const response = await axios.put("/api/teacher/put_pwd", {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //     data: {
  //       teacherId: `${userId}`,
  //       passWord: `${userNewPw}`,
  //     },
  //   });
  //   console.log("선생님 정보 확인 : ", response);
  //   return response;
  // } catch (error) {
  //   console.log(error);
  // }
};
