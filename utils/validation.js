const form = document.querySelector("form");

const usernameValidation = (data) => {
  const usernameRegex = /^[a-zA-Z\d_]{4,16}$/;
  return usernameRegex.test(data);
};

const passwordvalidation = (data) => {
  const passwordRegex = /^.{4,20}$/;
  return passwordRegex.test(data);
};

const formValidation = (username, password) => {
  const usernameResult = usernameValidation(username);
  const passwordResult = passwordvalidation(password);
  if (usernameResult && passwordResult) {
    return true;
  } else if (!usernameResult) {
    alert("Username is not valid !");
  } else if (!passwordResult) {
    alert("Password must be between 4 and 20 characters !");
  }
};

export { formValidation };
