// 핸드폰 번호 자동 하이픈('-') 넣어주는 함수
export const PhoneNumber = e => {
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
