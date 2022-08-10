'use strict';
// INIT QUERY SELECTOR
const orderIdContainer = document.querySelector('#orderId');

// GET ORDER ID FROM URL
const url = new URLSearchParams(window.location);
const orderId = url.get('search').slice(1);

// SHOW ORDER ID
orderIdContainer.insertAdjacentHTML('beforeend', orderId);

// CLEAR THE LOCAL STORAGE
localStorage.clear();
