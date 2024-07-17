import axios from "axios";
import { getCookie, setCookie } from "utils/cookie";
import jwtAxios from "./jwtUtil";

/** (Admin) 액세스 토큰 재발생 */
export const getReAccessToken = async () => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await axios.get("/api/user/parents/access-token", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log("액세스 토큰 재발생 결과 : ", response.data.accessToken);
    setCookie("accessToken", response.data.accessToken);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
