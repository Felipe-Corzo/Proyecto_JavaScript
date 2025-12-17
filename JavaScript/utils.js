const loadingElement = document.getElementById('loading');
const cartCountElement = document.getElementById('carrito');


function showLoading() {
    if (loadingElement) {
        loadingElement.style.display = 'block';
    }
}

function hideLoading() {
    if (loadingElement) {
        loadingElement.style.display = 'none';
    }
}

function showToCartNotification(productTitle) {
    alert(`El producto "${productTitle}" ha sido añadido al carrito.`);
}

function updateCarstCount() {
    if (cartCountElement) {
        cartCountElement.textContent = getTotalItems();
    }
}

function getTotalItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return cart.reduce((total, item) => total + item.quantity, 0);
}


function addProductToCart(product, quantity = 1) {
    const cart = getCart();
    const productInCart = cart.find(item => item.id === product.id);
    if (productInCart) {
        productInCart.quantity += quantity;
    } else {
        cart.push({ ...product, quantity });
    }
    saveCartToLocalStorage(cart);
    return cart;
}

function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// funcion para guardar un producto en local storage
function saveCartToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCarstCount();
}