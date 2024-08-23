import axios, { AxiosResponse } from "axios";

interface SignupSocialCodeData {
  id: string;
  providerType: number;
  useremail?: string;
  name?: string;
}

interface SignupSocialCodeResponse {
  status: number;
}

export const signupSocialCode = async (
  data: SignupSocialCodeData,
): Promise<AxiosResponse<SignupSocialCodeResponse> | string> => {
  console.log(data);

  try {
    const response: AxiosResponse<SignupSocialCodeResponse> = await axios.post(
      `/api/user/parents/sign-up/social/first`,
      data,
    );
    console.log(response);
    return response;
  } catch (error) {
    // Ensure the error handling also considers unknown type
    if (axios.isAxiosError(error)) {
      alert("회원가입에 실패하셨습니다 다시 시도해주세요.");
    } else {
      console.error("An unexpected error occurred:", error);
    }
    return "fail";
  }
};
