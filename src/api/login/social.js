import axios from "axios";

export const socialLogin = async data => {
  console.log(data);
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
    console.error(error);
    throw error;
  }
};

// 토큰 정보 불러오기
export const fetchUserInfo = async token => {
  try {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const userInfo = await response.json();
    // console.log("User Info:", userInfo);
    return userInfo;
  } catch (error) {
    console.error(error);
  }
};

export const socialRandomCode = async data => {
  try {
    const response = await axios.post(
      `/api/user/parents/sign-up/social-login/random-code`,
      data,
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
