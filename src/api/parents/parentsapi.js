import jwtAxios from "api/jwtUtil";

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
