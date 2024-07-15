import axios from "axios";
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

  const arrInfo = {
    name: `${newInfo[0]}`,
    phone: `${newInfo[1]}`,
    email: `${newInfo[2]}`,
    zoneCode: `${newInfo[3]}`,
    addr: `${newInfo[4]}`,
  };

  try {
    const response = await axios.patch(
      "/api/teacher",
      arrInfo, // newInfo를 사용하여 요청 본문을 동적으로 설정합니다.
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log("정보 수정 완료");
    return response;
  } catch (error) {
    console.log("정보 수정 실패:", error);
  }
};
// export const patchTeacherInfo = async newInfo => {
//   const accessToken = getCookie("accessToken");

//   console.log(`수정 정보 : ${newInfo}`);
//   try {
//     const response = await axios.patch(
//       "/api/teacher",
//       {
//         name: `${newInfo[1]}`,
//         phone: `${newInfo[2]}`,
//         email: `${newInfo[3]}`,
//         zoneCode: "",
//         addr: `${newInfo[5]}`,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       },
//     );
//     console.log("정보 수정 완료");
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };
