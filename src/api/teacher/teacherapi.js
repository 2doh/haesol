import axios from "axios";
import { getCookie } from "utils/cookie";

export const accessToken = getCookie("accessToken");

/** 선생님 정보 불러오기 */
export const getTeacherInfo = async () => {
  //   console.log("accessToken : ", accessToken);
  try {
    const response = await axios.get("/api/teacher", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log("선생님 정보 확인 : ", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 학생 한 명 정보 불러오기
export const getStudentInfo2 = async stu_id => {
  try {
    const response = await axios.get(`/api/student/detail?pk=${stu_id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("response : ", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
