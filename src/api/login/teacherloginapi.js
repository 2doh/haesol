import axios from "axios";
import { setCookie } from "utils/cookie";

export const postTeacherSignin = async data => {
  try {
    const res = await axios.post(`/api/teacher/sign-in`, data);
    console.log(res);
    setCookie("accessToken", res.data.accessToken);
    return res;
  } catch (error) {
    console.log(error);
  }
};
