import { postData } from "./utils/httpRequest.js";
import { setCookie } from "./utils/cookies.js";
import { authHandler } from "./utils/authorazition.js";
import { formValidation } from "./utils/validation.js";

const inputs = document.querySelectorAll("input");
const loginButton = document.querySelector("button");

const submitHandler = async (event) => {
  event.preventDefault();

  const validation = formValidation(inputs[0].value, inputs[1].value);
  if (!validation) return;

  const response = await postData("auth/login", {
    username: inputs[0].value,
    password: inputs[1].value,
  });

  setCookie("token", response.token);
  location.assign("./index.html");
};

const init = () => {
  authHandler();
};

loginButton.addEventListener("click", submitHandler);
document.addEventListener("DOMContentLoaded", init);
