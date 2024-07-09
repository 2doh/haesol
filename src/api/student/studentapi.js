import axios from "axios";

// 학생 리스트 불러오는 api
export const getStudentList = async () => {
  try {
    const response = await axios.get("/api/student", {
      headers: {
        // 토큰값 강제로 넣기
        Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE3MjA1MTA4MjksImV4cCI6MTcyMDUxMTQyOSwic2lnbmVkVXNlciI6IntcInVzZXJJZFwiOjEsXCJyb2xlXCI6XCJST0xFX1RFQUhDRVJcIn0ifQ.V-8MZzYdAHqxkxdDZ1miMEzqMZ-JOFbMeRA1PMtJH1Qpc5CoBjVcHAgMqfPuyEttmsfWnCAWwkQriu9TUai5yw`,
      },
    });
    // console.log("response : ", response.data);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 학생 한 명 정보 불러오기
export const getStudentInfo = async stu_id => {
  try {
    const response = await axios.get(`/api/student/detail?pk=${stu_id}`);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
