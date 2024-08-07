import axios from "axios";

// 구글 소셜로그인
export const googleSignin = async data => {
  // console.log(data.id);
  try {
    const res = await axios.post(
      `/api/user/parents/sign-in/social-login`,
      data,
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};

// 토큰 뜯기
export const googleToken = async token => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${token}`,
    );
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      return data.sub; // 사용자 정보
    } else {
      throw new Error(`Error: ${data.error}`);
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    throw error;
  }
};
