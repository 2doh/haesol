import jwtAxios from "api/jwtUtil";
import { getCookie } from "utils/cookie";

// 국어/수학 시험 post
export const onlineTestCreate = async formData => {
  const accessToken = getCookie("accessToken");
  // console.log("국어 시험 post : ", formData);
  try {
    const response = await jwtAxios.post(`/api/online/question`, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

// 국어/수학 시험 get
export const getOnlineTest = async data => {
  const url = `subjectCode=${data}`;

  let res = await jwtAxios
    .get(`/api/online/test?${url}`)
    .then(res => {
      // 성공 처리
      console.log("성공 : ", res.data);
      return res.data;
    })
    .catch(error => {
      // console.log("에러 : ", error);
      return false;
      // return Promise.reject(error);
    });

  return res;
};
