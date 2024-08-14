import axios from "axios";

export const signupSocialCode = async data => {
  try {
    const response = await axios.post(
      `/api/user/parents/sign-up/social/first`,
      data,
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
