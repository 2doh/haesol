import axios from "axios";

export const parentSignup = async data => {
  try {
    const response = await axios.post(`/api/user/parents/sign-up`, data);
    return response;
  } catch (error) {
    const err = "err";
    return err;
  }
};

export const duplicateParentId = async parentId => {
  try {
    const res = await axios.get(
      `/api/user/parents/check-duplication?uid=${parentId}`,
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
