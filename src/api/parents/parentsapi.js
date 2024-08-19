import jwtAxios from "api/jwtUtil";
import { getCookie } from "utils/cookie";

/** 학부모 정보 획득 */
export const getParentsInfo = async () => {
  let res = await jwtAxios
    .get(`/api/user/parents/parent-info`)
    .then(res => {
      // 성공 처리
      // console.log("성공 : ", res);
      return res.data;
    })
    .catch(error => {
      // console.log("에러 : ", error);
      return false;
      // return Promise.reject(error);
    });

  return res;
};

// 선생님 담당 학급 학부모 조회
export const getParentsListInfo = async () => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await jwtAxios.get(`/api/user/parents/detail`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
