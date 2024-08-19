export const setSession = (name, value, options) => {
  return window.sessionStorage.setItem(name, value, { ...options });
};

export const getSession = name => {
  return window.sessionStorage.getItem(name);
};

export const removeSession = name => {
  return window.sessionStorage.removeItem(name);
};
