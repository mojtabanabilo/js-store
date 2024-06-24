import { getCookie } from "./utils/cookies.js";
import { getData } from "./utils/httpRequest.js";

const loginButton = document.getElementById("login");
const dashboardButton = document.getElementById("dashboard");
const mainContent = document.getElementById("products");
const searchButton = document.querySelector("button");
const inputBox = document.querySelector("input");
const listItems = document.querySelectorAll("li");

let allProducts = null;
let search = "";
let category = "all";

const renderProducts = (products) => {
  mainContent.innerHTML = "";

  products.forEach((product) => {
    const jsx = `
            <div>
                <img src=${product.image} alt=${product.title}/>
                <h4>${product.title.split(" ").slice(0, 3).join(" ")}</h4>
                <div id="price">
                    <p>$ ${product.price}</p>
                    <button>
                        buy
                        <i class="fa-solid fa-cart-shopping"></i>
                    </button>
                </div>
                <div id="rate">
                    <i class="fa-solid fa-star"></i>
                    <span>${product.rating.rate}</span>
                </div>
                <div id="count">
                    <i class="fa-solid fa-user"></i>
                    <span>${product.rating.count}</span>
                </div>
            </div>
        `;

    mainContent.innerHTML += jsx;
  });
};

const init = async () => {
  const cookie = getCookie();

  if (cookie) {
    loginButton.style.display = "none";
  } else {
    dashboardButton.style.display = "none";
  }

  allProducts = await getData("products");
  renderProducts(allProducts);
};

const filterProduct = () => {
  const filteredProducts = allProducts.filter((product) => {
    if (category === "all") {
      return product.title.toLowerCase().includes(search);
    } else {
      return (
        product.title.toLowerCase().includes(search) &&
        product.category.toLowerCase() === category
      );
    }
  });
  renderProducts(filteredProducts);
};

const searchHandler = () => {
  search = inputBox.value.trim().toLowerCase();
  filterProduct();
};

const filterHandler = (event) => {
  category = event.target.innerText.toLowerCase();

  listItems.forEach((li) => {
    if (li.innerText.toLowerCase() === category) {
      li.className = "selected";
    } else {
      li.className = "";
    }
  });

  filterProduct();
};

document.addEventListener("DOMContentLoaded", init);
searchButton.addEventListener("click", searchHandler);
listItems.forEach((li) => li.addEventListener("click", filterHandler));
