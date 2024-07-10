import axios from "axios";

export const parentSignup = async data => {
  try {
    console.log(data);
    const response = await axios.post(`/api/user/parents/sign-up`, data);
    // const response = await axios.post(`/api/user/parents/sign-up`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};
