'use strict';

// INIT QUERY SELECTOR
const productsContainer = document.querySelector('.items');

// GET DATA FROM THE API
async function getProductsData() {
  try {
    const result = await fetch(`http://localhost:3000/api/products`);
    if (!result.ok) throw new Error('Problem with API');
    const data = await result.json();
    data.forEach(element => showProducts(element));
  } catch (error) {
    console.log(error);
  }
}
getProductsData();

// INSERT THE PRODUCTS TO HTML
function showProducts(data) {
  const html = `
    <a href="./product.html?id=${data._id}">
    <article>
        <img src="${data.imageUrl}" alt="${data.altTxt}">
        <h3 class="productName">${data.name}</h3>
        <p class="${data.description}</p>
    </article>
    </a>
    `;
  productsContainer.insertAdjacentHTML('beforeend', html);
}
