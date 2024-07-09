import axios from "axios";
import { getCookie, setCookie } from "utils/cookie";

export const jwtAxios = axios.create();

const beforeReq = config => {
  let accessToken = getCookie("accessToken");
  if (!accessToken) {
    return Promise.reject({
      response: { data: { error: "Login 하셔서 인증받으세요." } },
    });
  }
  config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
};

const failReq = err => {
  console.log("요청 후... 실패", err);
  return Promise.reject(err);
};

// axios의 intercepter 적용
jwtAxios.interceptors.request.use(beforeReq, failReq);

// Reponse
const responseFail = async err => {
  const originalRequest = err.config;
  if (err.response.status === 401) {
    try {
      const response = await axios.get("/api/auth/access-token");
      localStorage.setItem("accessToken", response.data.accessToken);
      originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
      return jwtAxios(originalRequest);
    } catch (tokenRefreshError) {
      console.error("Token refresh failed:", tokenRefreshError);
      return Promise.reject(tokenRefreshError);
    }
  }
  return Promise.reject(err);
};

// axios의 intercepter 적용
jwtAxios.interceptors.response.use(responseFail);
export default jwtAxios;
