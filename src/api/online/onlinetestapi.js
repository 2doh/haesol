import jwtAxios from "api/jwtUtil";
import { getCookie } from "utils/cookie";

// 국어 시험 post
export const onlineTestKorean = async formData => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await jwtAxios.post(`api/online/question`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
