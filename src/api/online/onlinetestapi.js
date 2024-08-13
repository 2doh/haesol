import jwtAxios from "api/jwtUtil";
import { getCookie } from "utils/cookie";

// 국어/수학 시험 post
export const onlineTestCreate = async formData => {
  const accessToken = getCookie("accessToken");

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

// 영어 단어/말하기 시험 post
export const onlineTestCreateEn = async formData => {
  const accessToken = getCookie("accessToken");

  try {
    const response = await jwtAxios.post(
      `/api/online/english/words`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
// 영어 듣기 시험 post
export const onlineTestCreateListeningEn = async formData => {
  const accessToken = getCookie("accessToken");

  try {
    const response = await jwtAxios.post(
      `/api/online/english/listening`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
