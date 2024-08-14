import jwtAxios from "api/jwtUtil";
import axios from "axios";

export const parentSignup = async data => {
  try {
    // console.log(data);
    const response = await axios.post(`/api/user/parents/sign-up`, data);
    return response;
  } catch (error) {
    // console.log(error);
  }
};

export const duplicateParentId = async parentId => {
  try {
    const res = await axios.get(
      `/api/user/parents/check-duplication?uid=${parentId}`,
    );
    return res;
  } catch (error) {
    // console.log(error);
  }
};

export const getChildList = async data => {
  console.log(data.searchWord);
  try {
    const resp = await axios.get(
      `/api/student/list?searchWord=${data.searchWord}`,
    );
    return resp;
  } catch (error) {
    // console.log(error);
  }
};

/** 가입 후 - 학부모가 자녀 추가 */
export const putChild = async data => {
  console.log("데이터 : ", data.searchWord);

  let res = await jwtAxios
    .put(`/api/student/child?randCode=${data.searchWord}`)
    .then(res => {
      // 성공 처리
      console.log("성공 : ", res);
      // return res.data.userList;
    })
    .catch(error => {
      console.log("에러 : ", error);
      // return false;
      // return Promise.reject(error);
    });

  return res;
};
