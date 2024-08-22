interface LoginResult {
  data: {
    parentsId: number;
  };
}

const useSocialLogin = (result: LoginResult): string | undefined => {
  if (result.data.parentsId === -1) {
    alert("자녀코드 및 회원가입 필수 정보를 입력하셔야 회원 등록됩니다.");
    return "/signup/social";
  }
  if (result.data.parentsId !== -1) {
    alert("로그인 되었습니다");
    return "/";
  }
  return;
};

export default useSocialLogin;
