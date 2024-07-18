export const getCookie = name => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

export const removeCookie = name => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

export const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/`;
};

// 로컬스토리지에 데이터 저장하는 함수
export const setLocalValue = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// 로컬스토리지에서 데이터 가져오는 함수
export const getLocalValue = key => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

// 로컬스토리지에서 데이터 삭제하는 함수
export const removeLocalValue = key => {
  if (localStorage.getItem(key)) {
    localStorage.removeItem(key);
  }
};
