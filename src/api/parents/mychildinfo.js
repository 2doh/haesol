import axios from "axios";
import { getCookie } from "utils/cookie";

/** 학부모 계정 : 자녀 정보 GET */
export const getMyChildInfo = async () => {
  const accessToken = getCookie("accessToken");
  // console.log("유저 타입 : ", userListType);
  try {
    const response = await axios.get(`/api/user/parents/get-student-parent`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("자녀 정보 GET : ", response);
    if (response.data.length === 0) {
      // console.log("자녀 정보가 없습니다.");
      return false;
    } else {
      // console.log("자녀 정보가 있습니다.");
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
