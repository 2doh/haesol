import jwtAxios from "api/jwtUtil";
import { getCookie } from "utils/cookie";

// 알림장 데이터 불러오기 (선생님용)
export const getNoticeListTea = async () => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await jwtAxios.get(`/api/notice`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

// 알림장 데이터 불러오기 (학부모용)
export const getNoticeList = async studentPk => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await jwtAxios.get(`/api/notice?studentPk=${studentPk}`, {
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
    const response = await jwtAxios.delete(
      `/api/notice?notice_id=${notice_id}`,
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

// 알림장 문자 메세지 발송
export const sendSmsPost = async data => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await jwtAxios.post(
      "/api/sms/send",
      JSON.stringify(data),
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
