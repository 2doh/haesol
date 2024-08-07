import axios from "axios";

export const naverLogin = async data => {
  console.log(data);
  try {
    const res = await axios.post(
      `/api/user/parents/sign-in/social-login`,
      data,
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
