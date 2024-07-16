import axios from "axios";

export const findTeacherId = async data => {
  try {
    const response = await axios.get(
      `/api/teacher/find_id?name=${data.name}&phone=${data.phone}`,
    );
    return response;
  } catch (error) {
    return "err";
  }
};

export const findTeacherPass = async data => {
  try {
    const res = await axios.get(
      `/api/teacher/find_pwd?id=${data.id}&phone=${data.phone}`,
    );
    return res;
  } catch (error) {
    return "err";
  }
};

export const putPwd = async data => {
  try {
    const resp = await axios.put(`/api/teacher/put_pwd`, data);
    return resp;
  } catch (error) {
    return error;
  }
};
