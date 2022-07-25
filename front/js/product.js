'use strict';

// INIT QUERY SELECTOR
const itemImgContainer = document.querySelector('.item__img');
const titleContainer = document.querySelector('#title');
const priceContainer = document.querySelector('#price');
const descriptionContainer = document.querySelector('#description');
const colorContainer = document.querySelector('#colors');

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

        let insertColor;
        product.colors.forEach(color => {
          insertColor = `<option value="${color}">${color}</option>`;
          colorContainer.insertAdjacentHTML('beforeend', insertColor);
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
}
showProduct(idProduct);
