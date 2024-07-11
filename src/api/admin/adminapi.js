import axios from "axios";
import { getCookie } from "utils/cookie";

/** 회원가입 신청 */
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

/** 회원가입 신청 승인 */
export const singupAccept = async (selectUserPk, userListType) => {
  const accessToken = getCookie("accessToken");
  console.log("토큰 : ", accessToken);
  try {
    const response = await axios.put(
      `/api/admin?p=${userListType}&pk=${selectUserPk}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log("승인 처리 완료");
  } catch (error) {
    console.log(error);
  }
};

/** 회원가입 신청 반려 */
export const delectAwaitAccept = async (selectUserPk, userListType) => {
  const accessToken = getCookie("accessToken");
  //   console.log(
  //     `선택한 유저 PK : ${selectUserPk}, 선택한 유저 PK : ${userListType}`,
  //   );
  //   console.log(typeof selectUserPk);
  try {
    const response = await axios.delete(
      `/api/admin?p=${userListType}&pk=${selectUserPk}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    console.log("반려 처리 완료");
  } catch (error) {
    console.log(error);
  }
};
