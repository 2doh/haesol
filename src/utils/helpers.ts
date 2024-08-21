import React from "react";

// 핸드폰 번호 자동 하이픈('-') 넣어주는 함수
export const PhoneNumber = (e: React.ChangeEvent<HTMLInputElement>): string => {
  let formattedNumber = e.target.value.replace(/[^0-9]/g, "");
  if (formattedNumber.length > 3 && formattedNumber.length <= 7) {
    formattedNumber = formattedNumber.replace(/^(\d{3})(\d{1,4})/, "$1-$2");
  } else if (formattedNumber.length > 7) {
    formattedNumber = formattedNumber.replace(
      /^(\d{3})(\d{4})(\d{1,4})/,
      "$1-$2-$3",
    );
  }
  return formattedNumber;
};

// 비밀번호 유효성 검사
export const PassValidation = (
  e: React.ChangeEvent<HTMLInputElement>,
): string => {
  const regex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
  if (regex.test(e.target.value)) {
    return "";
  } else {
    return "비밀번호 형식에 맞지 않습니다";
  }
};
