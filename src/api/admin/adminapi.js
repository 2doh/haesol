import axios from "axios";
import { getCookie } from "utils/cookie";

/** 회원가입 신청 리스트 : 학부모.ver */
export const getAwaitAcceptList = async userListType => {
  const accessToken = getCookie("accessToken");
  console.log("유저 타입 : ", userListType);
  try {
    const response = await axios.get(`/api/admin/${userListType}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // console.log("api 결과 : ", response.data);
    return response.data.userList;
  } catch (error) {
    console.log(error);
  }
};

// export const getAwaitAcceptList = async () => {
//   //   const accessToken = getCookie("accessToken");
//   try {
//     const response = await axios.get("/api/admin/1", {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });
//     // console.log("선생님 정보 확인 : ", response);
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };
