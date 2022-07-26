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

// GET PRODUCTS FROM LOCAL STORAGE
const cartProducts = JSON.parse(localStorage.getItem('shoppingCart'));
console.log(cartProducts);

// SHOW PRODUCTS RECAP
async function showCartProducts(id, color, qte) {
  try {
    const result = await fetch(`http://localhost:3000/api/products`);
    if (!result.ok) throw new Error('Problem with API');

    const data = await result.json();
    console.log(data);
    data.forEach(product => {
      if (product._id === id) {
        const html = `
            <article class="cart__item" data-id="${product._id}" data-color="${color}">
            <div class="cart__item__img">
              <img src="${product.imageUrl}" alt="${product.altText}">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>${color}</p>
                <p>${product.price} €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${qte}">
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
  } catch (error) {
    console.log(error);
  }
}

cartProducts.forEach(element => {
  showCartProducts(element.id, element.color, element.qte);
  console.log(element.id);
  console.log(element.color);
  console.log(element.qte);
});
