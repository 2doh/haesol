import jwtAxios from "api/jwtUtil";

// 국어 시험 post
export const onlineTestKorean = async formData => {
  try {
    const response = await jwtAxios.post(`/api/online`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
