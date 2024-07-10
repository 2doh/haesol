import axios from "axios";
import { getCookie } from "utils/cookie";

// 학생 리스트 불러오는 api
export const getStudentList = async () => {
  const accessToken = getCookie("accessToken");
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
  const accessToken = getCookie("accessToken");
  try {
    const header = { headers: { "Content-Type": "multipart/form-data" } };
    const response = await axios.get(
      `/api/student/detail?pk=${stu_id}`,
      header,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
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
