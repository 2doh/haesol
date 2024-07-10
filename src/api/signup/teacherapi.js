import axios from "axios";

export const teacherSignup = async data => {
  try {
    const response = await axios.post(`/api/teacher/sign-up`, data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const duplicateId = async teacherId => {
  try {
    const res = await axios.get(`/api/teacher/duplicate?id=${teacherId}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
