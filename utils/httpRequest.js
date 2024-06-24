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
    alert("An error occured !");
  }
};

export const getData = async (path) => {
  try {
    const response = await fetch(`${BASE_URL}/${path}`);
    const json = await response.json();
    return json;
  } catch (error) {
    alert("An error occured !");
  }
};

export const getCarts = async (carts, users, products) => {
  const data = [];
  try {
    const usersCarts = await getData(carts);
    const usersList = await getData(users);
    const usersProducts = await getData(products);

    usersCarts.forEach((cart) => {
      const information = {
        person: usersList.find((user) => user.id === cart.userId),
        products: cart.products.map((cartProduct) => {
          const product = usersProducts.find(
            (p) => p.id === cartProduct.productId
          );
          return { ...product, quantity: cartProduct.quantity };
        }),
      };
      data.push(information);
    });

    const combinedData = {};

    data.forEach((item) => {
      const username = item.person.username;

      if (!combinedData[username]) {
        combinedData[username] = {
          person: item.person,
          products: {},
        };
      }

      item.products.forEach((product) => {
        const productId = product.id;
        if (combinedData[username].products[productId]) {
          combinedData[username].products[productId].quantity +=
            product.quantity;
        } else {
          combinedData[username].products[productId] = { ...product };
        }
      });
    });

    return Object.values(combinedData).map((user) => ({
      ...user,
      products: Object.values(user.products),
    }));

  } catch (error) {
    alert("An error occurred!");
  }
};