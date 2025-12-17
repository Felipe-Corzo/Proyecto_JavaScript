const productosContainer = document.getElementById('products');

let products = [];
let currentQty = 1;
let currentPrice = 0;
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
                        <button class='details-button' type='button' onclick='openModal(${product.id})'>Ver Detalles</button>
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

function addToCar(productId, quantity = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    addProductToCart(product, quantity);
    showToCartNotification(product.title);

    if (document.getElementById('modal-overlay').style.display === 'flex') {
        closeModal();
}
}
updateCarstCount();


// FUNCION PARA MOSTRAR Y CERRAR EL POPPUP DE DETALLES DEL PRODUCTO
// Suponiendo que 'products' es el array donde guardaste los datos de la API
async function openModal(id) {
    const modalBody = document.getElementById('modal-body');
    const product = products.find(p => p.id === id);
    if (!product) return;
    currentQty = 1; // Reseteamos cantidad al abrir
    currentPrice = product.price; // Guardamos el precio

    modalBody.innerHTML = `
        <div class="modal-img-container">
            <img src="${product.image}" alt="${product.title}">
        </div>
        <div class="modal-info">
            <span class="category-tag">${product.category}</span>
            <h2>${product.title}</h2>
            <p class="modal-price">$${product.price}</p>
            
            <p class="description-title">Description:</p>
            <p class="modal-description">${product.description}</p>
            
            <div class="info-extra">
                <div><span>ID:</span> #${product.id}</div>
                <div><span>Disponibilidad:</span> En Stock</div>
                <div><span>Envío:</span> Gratis</div>
                <div><span>Garantía:</span> 12 meses</div>
            </div>

            <div class="quantity-section">
                <p class="section-title">Cantidad</p>
                <div class="quantity-controls">
                    <button class="btn-qty" onclick="changeQuantity(-1)">-</button>
                    <span id="product-qty">1</span>
                    <button class="btn-qty" onclick="changeQuantity(1)">+</button>
                </div>
            </div>

            <div class="subtotal-row">
                <span>Subtotal:</span>
                <span id="product-subtotal">$${product.price}</span>
            </div>

            <button class="btn-add-big" id="main-add-btn" onclick="addToCar(${product.id}, currentQty)">
                 Add ${currentQty} product to cart 🛒
            </button>
        </div>
    `;

    document.getElementById('modal-overlay').style.display = 'flex';

}

function closeModal() {
    document.getElementById('modal-overlay').style.display = 'none';
}

// Cerrar si hacen clic fuera del cuadro
window.onclick = function(event) {
    const overlay = document.getElementById('modal-overlay');
    if (event.target == overlay) closeModal();
}

function changeQuantity(delta) {
    const qtyDisplay = document.getElementById('product-qty');
    const subtotalDisplay = document.getElementById('product-subtotal');
    const mainBtn = document.getElementById('main-add-btn');

    // Evitar que la cantidad sea menor a 1
    if (currentQty + delta < 1) return;

    currentQty += delta;
    
    // Actualizar la interfaz
    qtyDisplay.innerText = currentQty;
    
    // Calcular subtotal (precio * cantidad)
    const subtotal = (currentPrice * currentQty).toFixed(2);
    subtotalDisplay.innerText = `$${subtotal}`;
    
    // Actualizar el texto del botón
    const textoProducto = currentQty === 1 ? 'producto' : 'productos';
    mainBtn.innerHTML = `🛒 Agregar ${currentQty} ${textoProducto} al Carrito`;
}   

