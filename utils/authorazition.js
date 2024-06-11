import { getCookie } from "./cookies.js";

export const authHandler = () => {
  const userState = getCookie();
  if (
    (userState && location.href.includes("auth")) ||
    (!userState && location.href.includes("dashboard"))
  ) {
    location.assign("./index.html");
    return false;
  }
};
