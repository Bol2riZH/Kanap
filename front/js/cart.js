'use strict';

// INIT QUERY SELECTOR
const itemsCartContainer = document.querySelector('#cart__items');
const itemImg = document.querySelector('.cart__item__img');
const itemDescription = document.querySelector(
  '.cart__item__content__description'
);
const itemQuantity = document.querySelector(
  '.cart__item__content__settings__quantity'
);
const itemDelete = document.querySelector('.deleteItem');
const totalItemsQuantity = document.querySelector('#totalQuantity');
const totalItemsPrice = document.querySelector('#totalPrice');

// INIT ARRAY FOR TOTAL PRICE
let prices = [];

// GET PRODUCTS FROM LOCAL STORAGE
const cartProducts = JSON.parse(localStorage.getItem('shoppingCart'));
console.log(cartProducts);
console.log(prices);

////////////////////////////////////////////////
// USE ASYNC FUNCTION TO
// 1) Show and get price of product
// 2) Show total price of products
(async function () {
  try {
    await showCartProducts(cartProducts);
  } catch (error) {}
  showCartPrice(prices);
})();
///////////////////////////////////////////////

// SHOW PRODUCTS RECAP
async function showCartProducts(list) {
  try {
    const result = await fetch(`http://localhost:3000/api/products`);
    if (!result.ok) throw new Error('Problem with API');
    const data = await result.json();

    // products in cart
    list.forEach(element => {
      // look over the API to match products and products in cart
      element = data.forEach(product => {
        if (product._id === element.id) {
          const productPriceNumber = Math.floor(product.price);

          // array of products price
          prices.push(productPriceNumber);

          const html = `
          <article class="cart__item" data-id="${element.id}" data-color="${element.color}">
          <div class="cart__item__img">
            <img src="${product.imageUrl}" alt="${product.altText}">
          </div>
          <div class="cart__item__content">
            <div class="cart__item__content__description">
              <h2>${product.name}</h2>
              <p>${element.color}</p>
              <p>${product.price} €</p>
            </div>
            <div class="cart__item__content__settings">
              <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${element.qte}">
              </div>
              <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
              </div>
            </div>
          </div>
        </article>
          `;
          itemsCartContainer.insertAdjacentHTML('beforeend', html);
        }
      });
    });
  } catch (error) {
    console.log(error);
  }
}

// SHOW TOTAL PRICE
function showCartPrice(prices) {
  const totalPrice = prices.reduce((a, b) => a + b);
  totalItemsPrice.insertAdjacentHTML('beforeend', totalPrice);
}

// REMOVE A PRODUCT
if (itemDelete) {
  itemDelete.addEventListener('click', function (e) {
    e.preventDefault();
    localStorage.removeItem('shoppingCart');
    console.log('whoww');
  });
}
