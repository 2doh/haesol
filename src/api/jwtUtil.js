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

jwtAxios.interceptors.request.use(beforeReq, failReq);

// // Reponse
// const refereshJWT = async (accessToken, reFreshToken) => {
//   const header = { headers: { Authorization: `Bearer ${accessToken}` } };
//   const res = await axios.get(`/api/user/parents/access-token`, header);
//   return res.accessToken;
// };

// // Response Intercepter
// const beforeRes = async res => {
//   const data = res.data;
//   if (data) {
//     const accessToken = getCookie("accessToken");
//     const reFreshToken = getCookie("refresh-token");
//     console.log("Refresh Token 을 이용해서 새로운 토큰을 요청", reFreshToken);

//     console.log("7. 새로운 access Token 생성 요청. ");
//     // 새로운 토큰을 요청하는 함수 실행
//     const result = await refereshJWT(accessToken, reFreshToken);
//   }

//   return res;
// };
// const responseFail = err => {
//   console.log("요청 Response 에러일 때", err);
//   return Promise.reject(err);
// };

// // axios의 intercepter 적용
// jwtAxios.interceptors.response.use(beforeRes, responseFail);

export default jwtAxios;
