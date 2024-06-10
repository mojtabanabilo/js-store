import { postData } from "./utils/httpRequest.js";

const inputs = document.querySelectorAll("input");
const loginButton = document.querySelector("button");

const submitHandler = async (event) => {
  event.preventDefault();
  const response = await postData("auth/login", {
    username: inputs[0].value,
    password: inputs[1].value,
  });
  document.cookie = `token=${response.token}; max-age=${24 * 60 * 60}`;
};

loginButton.addEventListener("click", submitHandler);
