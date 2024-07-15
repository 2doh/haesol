import axios from "axios";
import { getCookie } from "utils/cookie";
import jwtAxios from "./jwtUtil";

/** (Admin) 액세스 토큰 재발생 */
export const getReAccessToken = async () => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await axios.get("/api/admin/access-token", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("액세스 토큰 재발생 결과 : ", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
