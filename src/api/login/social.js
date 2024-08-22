import axios from "axios";
import { setCookie } from "utils/cookie";
import base64 from "base-64";
import useLoginTimerStart from "hooks/common/useLoginTimerStart";

export const socialLogin = async data => {
  console.log(data);
  try {
    const res = await axios.post(
      `/api/user/parents/sign-in/social-login`,
      data,
    );
    if (res.data.accessToken) {
      setCookie("accessToken", res.data.accessToken);
      let acTken = res.data.accessToken;
      const payload = JSON.parse(
        base64.decode(acTken.split(".")[1]),
      ).signedUser;
      const signedUser = JSON.parse(payload);
      setCookie("userIdPk", signedUser.userId);
      setCookie("userRole", signedUser.role);
      setCookie("selectChildNum", 0);
    }
    useLoginTimerStart();
    console.log(res);
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

// 토큰 정보 불러오기 구글
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

// 토큰 정보 불러오기 네이버
export const getNaverUserInfo = async data => {
  console.log(data);
  try {
    const tokenResponse = await fetch(
      `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${data.id}&client_secret=${data.secret}&code=${data.token}&state=${data.state}`,
      {
        method: "POST",
      },
    );
    if (!tokenResponse.ok) {
      throw new Error("토큰 요청 중 오류 발생");
    }

    const tokenData = await tokenResponse.json();
    console.log("토큰 데이터:", tokenData);
    return tokenData;
  } catch (error) {
    console.log(error);
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
