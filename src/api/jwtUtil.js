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
  return Promise.reject(err);
};

// axios의 intercepter 적용
jwtAxios.interceptors.request.use(beforeReq, failReq);

export default jwtAxios;
