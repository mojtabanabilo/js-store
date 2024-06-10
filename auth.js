import { postData } from "./utils/httpRequest.js";
import { setCookie } from "./utils/cookies.js";
import { authHandler } from "./utils/authorazition.js";

const inputs = document.querySelectorAll("input");
const loginButton = document.querySelector("button");

const submitHandler = async (event) => {
  event.preventDefault();
  const response = await postData("auth/login", {
    username: inputs[0].value,
    password: inputs[1].value,
  });
  setCookie("token", response.token);
  location.assign("index.html");
};

const init = () => {
  authHandler();
};

loginButton.addEventListener("click", submitHandler);
document.addEventListener("DOMContentLoaded", init);
