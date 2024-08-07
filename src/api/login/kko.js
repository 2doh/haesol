import axios from "axios";

export const kkoLogin = async data => {
  console.log(data.id);
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
