import jwtAxios from "api/jwtUtil";
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
export const getStudentInfo = async studentPk => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await axios.get(`/api/student/detail?pk=${studentPk}`, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 학생 한 명 정보 수정
export const modifyStudentInfo = async data => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await axios.put("/api/student", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 학생 성적 조회 중간고사: 1
export const getStudentGrade1 = async studentPk => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await axios.get(
      `/api/Score/getScore?studentPk=${studentPk}&exam=1`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response;
  } catch (error) {
    console.log("에러입니다. 데모데이터입니다. ", error);
    return {
      statusCode: null,
      resultMsg: null,
      resultData: null,
      code: 1,
      msg: "성적조회성공",
      data: {
        list: [
          {
            name: "영어",
            exam: 1,
            mark: 81,
            scoreId: 13,
            subjectClassRank: 1,
            studentPk: 4,
            classAvg: 81,
            gradeAvg: 81,
            subjectGradeRank: 1,
            classStudentCount: 2,
            classRank: 2,
            gradeRank: 2,
            gradeStudentCount: 2,
          },
        ],
        studentPk: 4,
        latestGrade: 1,
        latestSemester: 2,
        latestYear: "2023",
        exam: 0,
      },
    };
  }
};
// 성적 조회 기말:2
export const getStudentGrade2 = async studentPk => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await axios.get(
      `/api/Score/getScore?studentPk=${studentPk}&exam=2`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 지정한 학기 성적 불러오기 중간
export const getStudentGradeSelect1 = async (studentPk, grade, semester) => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await axios.get(
      `/api/Score/getScoreDetail?studentPk=${studentPk}&grade=${grade}&semester=${semester}&exam=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
// 지정한 학기 성적 불러오기 기말
export const getStudentGradeSelect2 = async (studentPk, grade, semester) => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await axios.get(
      `/api/Score/getScoreDetail?studentPk=${studentPk}&grade=${grade}&semester=${semester}&exam=2`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
// 성적 입력하기
export const postStudentGradeScore = async ({
  studentPk,
  year,
  semester,
  name,
  exam,
  mark,
}) => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await jwtAxios.post(`/api/Score`, {
      studentPk,
      year,
      semester,
      name,
      exam,
      mark,
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 알림장 데이터 불러오기
export const getNoticeList = async state => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await axios.get(`/api/notice?state=${state}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 알림장 작성하기
export const createNotice = async data => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await jwtAxios.post("/api/notice", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 알림장 삭제하기
export const deleteNotice = async notice_id => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await axios.delete(`/api/notice?notice_id=${notice_id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getScore = async data => {
  const res = await jwtAxios.get(
    `/api/Score/getScore?studentPk=${data.studentPk}&exam=1`,
  );
  return res.data.data;
};
