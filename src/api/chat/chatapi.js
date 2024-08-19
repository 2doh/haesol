import jwtAxios from "api/jwtUtil";
import { getCookie } from "utils/cookie";

// 로그인한 학부모 전체 채팅 리스트 조회
export const getChatParentsList = async () => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await jwtAxios.get("/api/chat/parents/chats", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 로그인한 선생님 전체 채팅 리스트 조회
export const getChatTeacherList = async () => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await jwtAxios.get("/api/chat/teacher/chats", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 특정 채팅방 내용 get
export const getChatRoom = async roomId => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await jwtAxios.get(`/api/chat/chat/detail/${roomId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 채팅방 만들기
export const postCreateChatRoom = async () => {
  const accessToken = getCookie("accessToken");
  try {
    const response = await jwtAxios.post(`/api/chat/create`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// 채팅 보내기
export const postCreateChat = async chatData => {
  const accessToken = getCookie("accessToken");
  console.log("chatData : ", chatData);
  try {
    const response = await jwtAxios.post(`/api/chat/chat/sender`, chatData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
