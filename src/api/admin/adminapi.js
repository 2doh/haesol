import jwtAxios from "api/jwtUtil";
import axios from "axios";
import { getCookie } from "utils/cookie";

/** 회원가입 신청 리스트 */
export const getAwaitAcceptList = async (userListType, searchKeyword) => {
  // const accessToken = getCookie("accessToken");
  // console.log("유저 타입 : ", userListType);
  // console.log("검색 키워드 : ", searchKeyword);

  const res = await jwtAxios.get(
    `/api/admin?p=${userListType}&searchWord=${searchKeyword}`,
  );
  console.log(res.data);
  return res.data.userList;

  // try {
  //   const response = await axios.get(`/api/admin?p=${userListType}`, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });
  //   // console.log("api 결과 : ", response.data);
  //   return response.data.userList;
  // } catch (error) {
  //   return console.log(error);
  // }
};

/** 가입된 유저 리스트 */
export const getAwaitUserList = async (userListType, check, searchKeyword) => {
  // const accessToken = getCookie("accessToken");
  // console.log("유저 타입 : ", userListType);
  // console.log("체크 : ", check);
  // try {
  //   const response = await axios.get(`/api/admin/${userListType}`, {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });
  //   // console.log("api 결과 : ", response.data);
  //   return response.data.userList;
  // } catch (error) {
  //   // console.log(error);
  // }

  const res = await jwtAxios.get(
    `/api/admin/list?p=${userListType}&check=${check}&searchWord=${searchKeyword}`,
  );
  // console.log(res.data);
  return res.data;
};

/** 회원가입 신청 승인 */
export const singupAccept = async (selectUserPk, userListType) => {
  const accessToken = getCookie("accessToken");
  // console.log(
  //   `선택한 유저 PK : ${selectUserPk}, 선택한 유저 타입 : ${userListType}`,
  // );
  try {
    const res = await axios.put(
      `/api/admin?p=${userListType}&pk=${selectUserPk}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return true;
    // return true;
  } catch (error) {
    // console.error("에러 발생:", error);
  }
};

// 아래 참고
// import axios from 'axios';
// const url = 'https://example.com/api/resource';
// const data = {
//   key1: 'value1',
//   key2: 'value2'
// };
// // 헤더 설정
// const config = {
//   headers: {
//     'Content-Type': 'application/json',
//     'Authorization': 'Bearer YOUR_TOKEN_HERE',
//     'Custom-Header': 'CustomValue'
//   }
// };
// axios.put(url, data, config)
//   .then(response => {
//     console.log('응답 데이터:', response.data);
//   })
//   .catch(error => {
//     console.error('에러 발생:', error);
//   });

/** 회원가입 신청 반려 */
export const delectAwaitAccept = async (selectUserPk, userListType) => {
  const accessToken = getCookie("accessToken");
  // console.log(

  //   `선택한 유저 PK : ${selectUserPk}, 선택한 유저 타입 : ${userListType}`,
  // );
  try {
    const response = await axios.delete(
      `/api/admin?p=${userListType}&pk=${selectUserPk}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return true;
  } catch (error) {
    // console.log(error);
  }
};

/** 회원가입 신청 반려 */
// export const singupAccept = async (selectUserPk, userListType) => {
//   const accessToken = getCookie("accessToken");
//   console.log(
//     `선택한 유저 PK : ${selectUserPk}, 선택한 유저 타입 : ${userListType}`,
//   );
//   //   console.log(typeof selectUserPk);
//   try {
//     const response = await axios.put(
//       `/api/admin?p=${userListType}&pk=${selectUserPk}`,
//       {
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       },
//     );
//     console.log("반려 처리 완료");
//   } catch (error) {
//     console.log(error);
//   }
// };
