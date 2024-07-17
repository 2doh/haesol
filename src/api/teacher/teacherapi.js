import axios from "axios";
import { useState } from "react";
import { getCookie } from "utils/cookie";

/** 선생님 정보 불러오기 */
export const getTeacherInfo = async () => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await axios.get("/api/teacher", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("선생님 정보 확인 : ", response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

/** 선생님 비밀번호 변경 */
export const putTeacherPwChange = async (newPw, userId) => {
  const accessToken = getCookie("accessToken");

  console.log(`New PW : ${newPw}, 선생님 ID : ${userId}`);
  try {
    const response = await axios.put(
      "/api/teacher/put_pwd",
      {
        teacherId: `${userId}`,
        passWord: `${newPw}`,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log("비밀번호 수정 완료");
    return response;
  } catch (error) {
    console.log(error);
  }
};

/** 선생님 정보 수정 */
export const patchTeacherInfo = async newInfo => {
  const accessToken = getCookie("accessToken");

  try {
    const response = await axios.patch("/api/teacher", newInfo, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("정보 수정 완료");
    return true;
  } catch (error) {
    console.log("정보 수정 실패:", error);
  }
};

/** 최신 알림장 정보 불러오기 */
export const getRecentNoticeInfo = async noticeState => {
  const accessToken = getCookie("accessToken");

  try {
    const response = await axios.get(`/api/notice/main?state=${noticeState}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("알림장 불러오기 : ", response.data.result);
    return response.data.result;
  } catch (error) {
    console.log("알림장 불러오기 : ", response.data.result);

    console.log(error);
  }
};

/** 교직원 정보 수정 - 이메일 중복 체크 */
export const duplicateEmail = async teacherEmail => {
  console.log(teacherEmail);
  try {
    const res = await axios.get(`/api/teacher/duplicate?email=${teacherEmail}`);
    console.log("이메일이 중복되지 않습니다.");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

/** 메인 - 최신 알림장 데이터 불러오기 */
// export const getNoticeList = async state => {
//   const accessToken = getCookie("accessToken");
//   try {
//     const response = await axios.get(`/api/notice?state=${state}`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };
