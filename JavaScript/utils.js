const loadingElement = document.getElementById('loading');
const cartCountElement = document.getElementById('carrito');


function showLoading() {
    if (loadingElement) {
        loadingElement.classList.add('active');
    }
}

function hideLoading() {
    if (loadingElement) {
        loadingElement.classList.remove('active');
    }
}

function showToCartNotification(productTitle) {
    alert(`Product "${productTitle}" has been added to the cart.`);
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

function saveCartToLocalStorage(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCarstCount();
}

// ================================================================================================================NUEVO (PAGINACION)

// Variable global para controlar la página actual
let currentPage = 1;
const productsPerPage = 10;

/**
 * Calcula y devuelve solo los productos que deben verse en la página actual
 */
function getPaginatedItems(items, page, perPage) {
    const start = (page - 1) * perPage;
    const end = start + perPage;
    return items.slice(start, end);
}

/**
 * Genera los botones de paginación en el DOM
 */
function renderPaginationButtons(totalItems, callback) {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;

    paginationContainer.innerHTML = '';
    const pageCount = Math.ceil(totalItems / productsPerPage);

    for (let i = 1; i <= pageCount; i++) {
        const btn = document.createElement('button');
        btn.innerText = i;
        btn.classList.add('btn-page');
        if (i === currentPage) btn.classList.add('active');

        btn.onclick = () => {
            currentPage = i;
            callback(); // Aquí ejecutaremos el renderizado de nuevo
            window.scrollTo({ top: 0, behavior: 'smooth' });
        };
        paginationContainer.appendChild(btn);
    }
}

