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
export const modifyStudentInfo = async () => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await axios.put("/api/student", {
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

// 학생 성적 조회 중간
export const getStudentGrade1 = async studentPk => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await axios.get(
      `/api/Score/getScore?studentPk=${studentPk}&exam=1`,
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
// 성적 조회 기말
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
    // console.log("response : ", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 알림장 삭제하기
export const deleteNotice = async notice_id => {
  const accessToken = getCookie("accessToken");
  console.log("notice_id 확인중 : ", notice_id);
  try {
    const response = await jwtAxios.delete(
      `/api/notice?notice_id=${notice_id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log("response :", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};
