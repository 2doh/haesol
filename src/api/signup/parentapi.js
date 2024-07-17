import axios from "axios";

export const parentSignup = async data => {
  try {
    console.log(data);
    const response = await axios.post(`/api/user/parents/sign-up`, data);
    return response;
  } catch (error) {
    console.log(error);
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

export const getChildList = async () => {
  try {
    const resp = await axios.get(`/api/student/list`);
    return resp;
  } catch (error) {
    console.log(error);
  }
};
