import axios from "axios";

export const signupSocialCode = async data => {
  try {
    const response = await axios.post(
      `/api/user/parents/sign-up/social/first`,
      data,
    );
    console.log(response);
    return response;
  } catch (error) {
    alert("회원가입에 실패하셨습니다 다시 시도해주세요.");
    window.location.replace("/");
  }
};
