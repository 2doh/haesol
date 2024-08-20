import jwtAxios from "api/jwtUtil";
import axios from "axios";
import { getCookie } from "utils/cookie";

/** (3차) 학부모 계정 로그인 : 정보 GET */
// export const getParentsInfo = async () => {
//   const accessToken = getCookie("accessToken");
//   // console.log("유저 타입 : ", userListType);

//   try {
//     const response = await axios.get(`/api/user/parents/sign-in`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     if (response.data.length === 0) {
//       // console.log("자녀 정보가 없습니다.");
//       return false;
//     } else {
//       // console.log("자녀 정보가 있습니다.");
//       return response.data;
//     }
//   } catch (error) {
//     // console.log(error);
//   }
// };

/** (2차) 학부모 계정 : 자녀 정보 GET */
export const getMyChildInfo = async () => {
  const accessToken = getCookie("accessToken");
  // console.log("유저 타입 : ", userListType);
  try {
    const response = await axios.get(`/api/user/parents/get-student-parent`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.data.length === 0) {
      // console.log("자녀 정보가 없습니다.");
      return false;
    } else {
      // console.log("자녀 정보가 있습니다.");
      return response.data;
      // return false;
    }
  } catch (error) {
    // console.log(error);
  }
};

/** 학부모 계정 : 비밀번호 변경 */
export const putParentsPwChange = async (nowPw, newPw, userId) => {
  const data = {
    uid: `${userId}`,
    upw: `${nowPw}`,
    newUpw: `${newPw}`,
  };

  let res = await jwtAxios
    .put(`/api/user/parents/password-update`, data)
    .then(res => {
      // 성공 처리
      console.log("성공 : ", res);
      return res;
    })
    .catch(error => {
      console.log("에러 : ", error);
      // return error.response.data.statusCode;
      return error;
      // return Promise.reject(error);
    });

  return res;
};

/** 학부모 계정 : 정보 수정 */
export const putChildInfo = async newInfo => {
  const accessToken = getCookie("accessToken");

  try {
    const response = await axios.put("/api/user/parents/info-update", newInfo, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log("자녀 정보 수정 완료");
    return true;
  } catch (error) {
    // console.log("정보 수정 실패:", error);
  }
};

/** 학부모 : 최신 알림장 정보 불러오기 */
export const getChildRecentNoticeInfo = async () => {
  const accessToken = getCookie("accessToken");
  const studentPk = getCookie("studentPk");

  try {
    const response = await axios.get(
      `/api/notice/main?studentPk=${studentPk}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    // console.log("알림장 불러오기 : ", response);
    return response.data.result;
  } catch (error) {
    // console.log("알림장 불러오기 : ", response);
    console.log(error);
  }
};
