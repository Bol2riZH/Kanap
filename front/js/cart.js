'use strict';

// INIT QUERY SELECTOR PRODUCTS
const itemsCartContainer = document.querySelector('#cart__items');
const itemImg = document.querySelector('.cart__item__img');
const itemDescription = document.querySelector(
  '.cart__item__content__description'
);
const itemQuantity = document.querySelector(
  '.cart__item__content__settings__quantity'
);
const totalItemsQuantity = document.querySelector('#totalQuantity');
const totalItemsPrice = document.querySelector('#totalPrice');
// INIT QUERY SELECTOR FORM
const firstName = document.querySelector('#firstName');
const lastName = document.querySelector('#lastName');
const address = document.querySelector('#address');
const city = document.querySelector('#city');
const email = document.querySelector('#email');
const order = document.querySelector('#order');

// INIT ARRAY FOR TOTAL PRICE
let prices = [];

// GET PRODUCTS FROM LOCAL STORAGE
let cartProducts = JSON.parse(localStorage.getItem('shoppingCart'));

////////////////////////////////////////////////
// USE ASYNC FUNCTION TO
// 1) Show and get price of product
// 2) Show total price of products
(async function () {
  try {
    await showCartProducts(cartProducts);
  } catch (error) {
    console.log(error);
  }
  showCartPrice(prices);
})();
///////////////////////////////////////////////

// SHOW PRODUCTS RECAP
async function showCartProducts(cartProducts) {
  try {
    const result = await fetch(`http://localhost:3000/api/products`);
    if (!result.ok) throw new Error('Problem with API');
    const allProduct = await result.json();

    // products in cart
    cartProducts.forEach(element => {
      // look over the API to match products and products in cart
      element = allProduct.forEach(product => {
        if (product._id === element.id) {
          const productPriceNumber = Math.floor(product.price);

          // array of products price
          prices.push(productPriceNumber * element.qte);

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

// REMOVE PRODUCT FROM CART
function removeProduct(deleteSelector) {
  deleteSelector.forEach(item =>
    item.addEventListener('click', function (e) {
      e.preventDefault();

      // Get data-id and color-id from product
      const dataId = item.closest('.cart__item').getAttribute('data-id');
      const dataColor = item.closest('.cart__item').getAttribute('data-color');

      // Filter by id and color to remove product
      const removeProduct = cartProducts.filter(
        element => element.id !== dataId && element.color !== dataColor
      );
      localStorage.setItem('shoppingCart', JSON.stringify(removeProduct));
      location.reload();
    })
  );
}

// MODIFY QUANTITY OF PRODUCT IN THE CART
function modifyQuantity(quantitySelector) {
  quantitySelector.forEach(item => {
    item.addEventListener('change', function (e) {
      e.preventDefault();

      // Get data-id and qte from product
      const dataId = item.closest('.cart__item').getAttribute('data-id');
      const qte = item.closest('.itemQuantity').value;

      // Filter by id to modify quantity
      cartProducts.forEach(element => {
        if (element.id === dataId) {
          element.qte = qte;
        }
      });
      localStorage.setItem('shoppingCart', JSON.stringify(cartProducts));
      location.reload();
    });
  });
}

// WAIT FOR THE DOM TO LOAD FROM THE API
window.addEventListener('load', () => {
  const deleteItem = document.querySelectorAll('.deleteItem');
  const itemQuantity = document.querySelectorAll('.itemQuantity');

  removeProduct(deleteItem);
  modifyQuantity(itemQuantity);
});

// VALIDATION FORM
let errorForm = 1;
function validationForm() {
  firstName.addEventListener('change', function (e) {
    e.preventDefault();
    const regexFirstName = /^[a-z '-]{2,}$/gi;
    if (firstName.value.match(regexFirstName)) {
      errorForm = 0;
    } else {
      alert('veuillez entrer un prénom');
      errorForm = 1;
    }
  });
  lastName.addEventListener('change', function (e) {
    e.preventDefault();
    const regexLastName = /^[a-z '-]{2,}$/gi;
    if (lastName.value.match(regexLastName)) {
      errorForm = 0;
    } else {
      alert('veuillez entrer un nom');
      errorForm = 1;
    }
  });
  address.addEventListener('change', function (e) {
    e.preventDefault();
    const regexAdress = /^[a-zA-Z0-9\s\,\''\-]*$/gi;
    if (address.value.match(regexAdress)) {
      errorForm = 0;
    } else {
      alert('veuillez entrer une adresse');
      errorForm = 1;
    }
  });
  city.addEventListener('change', function (e) {
    e.preventDefault();
    const regexCity =
      /^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/gi;
    if (city.value.match(regexCity)) {
      errorForm = 0;
    } else {
      alert('veuillez entrer une ville');
      errorForm = 1;
    }
  });
  email.addEventListener('change', function (e) {
    e.preventDefault();
    const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/gi;
    if (email.value.match(regexEmail)) {
      errorForm = 0;
    } else {
      alert('veuillez entrer une adresse email valide');
      errorForm = 1;
    }
  });
}
validationForm();

// ORDER
order.addEventListener('click', function (e) {
  e.preventDefault();
  if(errorForm === 0) {
    window.location.href = 'http://127.0.0.1:8080/front/html/confirmation.html';

  } else {
    alert('formulaire incorrect');
  }
});
