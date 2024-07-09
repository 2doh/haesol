import axios from "axios";

export const teacherSignup = async () => {
  try {
    const response = await axios.post(`/api/teacher/sign-up`);
    console.log(response);
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
