// GET THE ID OF PRODUCTwindow.location.href
const url = new URLSearchParams(window.location);
const idProduct = url.get('search').slice(4)
console.log(idProduct);

