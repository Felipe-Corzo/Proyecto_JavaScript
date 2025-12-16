const productosContainer = document.getElementById('products');

let products = [];
// Función para obtener los productos desde la API
async function getAllProducts() {
    showLoading();
    const response = await fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => products = data);

    response.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
             <div class='product'>
                <a href='details.html?id=${product.id}'>
                    <img class='product-image' src='${product.image}' alt='${product.title}'>
                    <h1 class='{product-title' >${product.title}</h1>
                </a>
                <p class='product-price'>$${product.price}</p>
                <button class='product-add' type='button' onclick='addToCar(${product.id})'>Añadir al carrito</button>
             </div>
            `;
        productosContainer.appendChild(productElement);

    });
    hideLoading();
}

getAllProducts();

function addToCar(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    addProductToCart(product, 1);
    showToCartNotification(product.title);
}

updateCarstCount();