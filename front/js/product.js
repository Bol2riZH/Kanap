'use strict';

// INIT QUERY SELECTOR
const itemImgContainer = document.querySelector('.item__img');
const titleContainer = document.querySelector('#title');
const priceContainer = document.querySelector('#price');
const descriptionContainer = document.querySelector('#description');
const colors = document.querySelector('#colors');
const quantity = document.querySelector('#quantity');
const btnShoppingCart = document.querySelector('#addToCart');

// GET THE ID OF PRODUCT
const url = new URLSearchParams(window.location);
const idProduct = url.get('search').slice(4);

// SHOW THE PRODUCT BY ID
async function showProduct(id) {
  try {
    const result = await fetch(`http://localhost:3000/api/products`);
    if (!result.ok) throw new Error('Problem with API');

    const data = await result.json();
    data.forEach(product => {
      if (product._id === id) {
        const itemImage = `<img src="${product.imageUrl}" alt="${product.altText}">`;
        itemImgContainer.insertAdjacentHTML('beforeend', itemImage);

        const title = `${product.name}`;
        titleContainer.insertAdjacentHTML('beforeend', title);

        const price = `${product.price}`;
        priceContainer.insertAdjacentHTML('beforeend', price);

        const description = `${product.description}`;
        descriptionContainer.insertAdjacentHTML('beforeend', description);

        let optionColor;
        product.colors.forEach(color => {
          optionColor = `<option value="${color}">${color}</option>`;
          colors.insertAdjacentHTML('beforeend', optionColor);
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}
showProduct(idProduct);

// ADD TO CART
class Cart {
  constructor(id, color, qte) {
    this.id = id;
    this.color = color;
    this.qte = qte;
  }
}

let shoppingCart;
// let carts = [];

btnShoppingCart.addEventListener('click', function (e) {
  e.preventDefault();
  shoppingCart = new Cart(idProduct, colors.value, quantity.value);
  carts.push(shoppingCart);
  console.log(carts);
  localStorage.setItem('shoppingCart', JSON.stringify(carts));
});
