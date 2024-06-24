import { authHandler } from "./utils/authorazition.js";
import { getData, getCarts } from "./utils/httpRequest.js";

const mainContent1 = document.getElementById("container_1");
const logoutButton = document.querySelector("button");
const mainContent2 = document.getElementById("container_2");

const renderUsers = (users) => {
  mainContent1.innerHTML = "";

  users.forEach((user) => {
    const jsx = `
      <div id="card">
        <h3>${user.id}</h3>
        <div>
          <p><i class="fa-solid fa-user"></i>Name:</p>
          <span>${user.name.firstname} ${user.name.lastname}</span>
        </div>
        <div>
          <p><i class="fa-solid fa-paperclip"></i>Username:</p>
          <span>${user.username}</span>
        </div>
        <div>
          <p><i class="fa-solid fa-envelope"></i>Email:</p>
          <span>${user.email}</span>
        </div>
        <div>
          <p><i class="fa-solid fa-phone"></i>Phone:</p>
          <span>${user.phone}</span>
        </div>
        <div>
          <p><i class="fa-solid fa-location-dot"></i>Address:</p>
          <span>${user.address.city} - ${user.address.street} - ${user.address.zipcode}</span>
        </div>
      </div>
    `;

    mainContent1.innerHTML += jsx;
  });
};

const renderUserCarts = (carts) => {
  mainContent2.innerHTML = "";
  console.log(carts);

  carts.forEach((cart, index) => {
    const { person, products } = cart;
    const jsx = `
    <div class="container">
      <h3>${index + 1}</h3>
      <div class="user-info">
        <span>Full Name: ${person.name.firstname} ${person.name.lastname}</span>
        <span>Email: ${person.email}</span>
        <span>Username: ${person.username}</span>
      </div>
      <details>
        <summary>products</summary>
        <article>
          <ul class="product-list" style="list-style-type: none;">
            <li>${products.map(i => `<span style="font-weight: 900;">TITLE</span>: ${i.title} / <span style="font-weight: 900;">PRICE</span>: ${i.price}$  __`)}</li>
          </ul>    
        </article>
      </details>
    </div>
    `;

    mainContent2.innerHTML += jsx;
  });
};

const init = async () => {
  authHandler();
  const users = await getData("users");
  const userCarts = await getCarts("carts", "users", "products");

  renderUsers(users);
  renderUserCarts(userCarts);
};

const logoutHandler = () => {
  document.cookie = "token=; max-age=0";
  location.assign("./auth.html");
};

document.addEventListener("DOMContentLoaded", init);
logoutButton.addEventListener("click", logoutHandler);
