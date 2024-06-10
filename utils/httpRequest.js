const BASE_URL = "https://fakestoreapi.com";

export const postData = async (path, data) => {
  try {
    const response = await fetch(`${BASE_URL}/${path}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-type": "application/json" },
    });
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    alert(error);
  }
};