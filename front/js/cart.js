'use strict'
const data = JSON.parse(localStorage.getItem('shoppingCart'))
console.log(data);

data.forEach(element => {
    console.log(element.id);
    console.log(element.color);
    console.log(element.qte);
});