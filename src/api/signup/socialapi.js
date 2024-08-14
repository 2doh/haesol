import axios from "axios";

export const signupSocialCode = async data => {
  const reqData = {
    randCode: data.randCode,
  };
  try {
    const response = await axios.post(
      `/api/user/parents/sign-up/social-login/random-code`,
      reqData,
    );
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const signupSocialInfo = async data => {
  const reqData = {
    phoneNumber: data.phoneNumber,
    connect: data.connect,
    id: data.id,
  };
  console.log(reqData);
  try {
    const res = await axios.post(
      `/api/user/parents/sign-up/social-login/phone`,
      reqData,
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
