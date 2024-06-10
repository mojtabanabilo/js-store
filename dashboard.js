import { authHandler } from "./utils/authorazition.js";

const init = () => {
  authHandler();
};

document.addEventListener("DOMContentLoaded", init);
