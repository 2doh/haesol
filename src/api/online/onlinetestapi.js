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
