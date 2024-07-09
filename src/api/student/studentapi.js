import axios from "axios";
import { getCookie } from "utils/cookie";

export const accessToken = getCookie("accessToken");

// 학생 리스트 불러오는 api
export const getStudentList = async () => {
  try {
    const response = await axios.get("/api/student", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};
// 학생 한 명 정보 불러오기
export const getStudentInfo = async stu_id => {
  // console.log("stu_id :", stu_id);
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

// export const getStudentInfo2 = async stu_id => {
//   try {
//     const response = await axios.get(`/api/student/detail?pk=${stu_id}`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     console.log("response : ", response);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };
