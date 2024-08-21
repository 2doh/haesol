interface LoginResult {
  data: {
    parentsId: number;
  };
}

const useSocialLogin = (result: LoginResult): string | undefined => {
  if (result.data.parentsId === -1) {
    alert("자식코드,번호 보내야함");
    return "/signup/social";
  }
  if (result.data.parentsId !== -1) {
    alert("로그인 되었습니다");
    return "/";
  }
  return;
};

export default useSocialLogin;
