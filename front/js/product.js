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
// const url = new URLSearchParams(window.location);
// const idProduct = url.get('search').slice(4);
const idProduct = new URL(window.location).searchParams.get("id");

// SHOW THE PRODUCT BY ID
async function showProduct(id) {
  try {
    const result = await fetch(`https://kanap-back.vercel.app/api/products/${id}`);
    if (!result.ok) throw new Error('Problem with API');
    const data = await result.json();
    const itemImage = `<img src="${data.imageUrl}" alt="${data.altText}">`;
    itemImgContainer.insertAdjacentHTML('beforeend', itemImage);

    const title = `${data.name}`;
    titleContainer.insertAdjacentHTML('beforeend', title);

    const price = `${data.price}`;
    priceContainer.insertAdjacentHTML('beforeend', price);

    const description = `${data.description}`;
    descriptionContainer.insertAdjacentHTML('beforeend', description);

    let optionColor;
    data.colors.forEach(color => {
      optionColor = `<option value="${color}">${color}</option>`;
      colors.insertAdjacentHTML('beforeend', optionColor);
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

// INIT VARIABLES FOR LOCAL STORAGE
let shoppingCart;
let carts = [];

// ADD PRODUCT IN CART
btnShoppingCart.addEventListener('click', function (e) {
  e.preventDefault();
  // convert string into number
  const quantityNumber = Math.floor(quantity.value);
  if (colors.value && quantityNumber !== 0) {
    shoppingCart = new Cart(idProduct, colors.value, quantityNumber);

    // carts is empty when come back to product page > put back the local storage in
    if (carts == 0) {
      carts = JSON.parse(localStorage.getItem('shoppingCart'));
      if (carts == null) {
        carts = [];
      }
    }
    // look for same id and color to sort the recap
    if (carts != 0 && carts != null) {
      for (let i = 0; i < carts.length; i++) {
        if (
          shoppingCart.id === carts[i].id &&
          shoppingCart.color === carts[i].color
        ) {
          shoppingCart.qte += carts[i].qte;
          carts.splice(i, 1);
        }
      }
    }
    carts.push(shoppingCart);
    localStorage.setItem('shoppingCart', JSON.stringify(carts));
    alert('Article ajouté au panier');
  } else {
    alert(
      'Veuillez sélectionner un nombre et une couleur pour ajouter un produit au panier'
    );
  }
});
