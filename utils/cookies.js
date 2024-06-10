export const setCookie = (name, data) => {
  document.cookie = `${name}=${data}; max-age=${24 * 60 * 60};`;
};

export const getCookie = () => {
  if (document.cookie) {
    const cookieArray = document.cookie.split("=");
    return {
      [cookieArray[0]]: cookieArray[1],
    };
  } else {
    return false;
  }
};
