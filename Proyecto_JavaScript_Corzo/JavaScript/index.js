const productosContainer = document.getElementById('products');

let products = [];
// Función para obtener los productos desde la API
async function getAllProducts() {
    showLoading();
    try {

        const response = await fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => products = data);

        response.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('product');
            productElement.innerHTML = `
                 <div class='card'>
                    <p class='product-price'>US$ ${product.price}</p>                    
                    <img class='product-image' src='${product.image}' alt='${product.title}'>
                    <p class='product-category' >${product.category}</p>
                    <h1 class='product-title' >${product.title}</h1>                    
                    
                    <div class='card-footer'>
                        <button class='details-button' type='button' onclick='showDetails(${product.id})'>Ver Detalles</button>
                        <button class='product-add' type='button' onclick='addToCar(${product.id})'>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                        </button>
                    </div>
                 </div>
                `;
            productosContainer.appendChild(productElement);

    });
    hideLoading();
    } catch (error) {
        console.error('Error:', error);
    }
}

getAllProducts();

function addToCar(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    addProductToCart(product, 1);
    showToCartNotification(product.title);
}

function showDetails(productId) {
    window.location.href = `details.html?id=${productId}`;

}

updateCarstCount();