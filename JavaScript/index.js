const productosContainer = document.getElementById('products');

let products = [];
let currentQty = 1;
let currentPrice = 0;

async function getAllProducts() {
    showLoading();
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        products = data;

        renderProducts(products); 
        hideLoading();
    } catch (error) {
        console.error('Error:', error);
        hideLoading();
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


// FUNCION PARA MOSTRAR Y CERRAR EL POPPUP DE DETALLES DEL PRODUCTO===================================================================================0

async function openModal(id) {
    const modalBody = document.getElementById('modal-body');
    const product = products.find(p => p.id === id);
    if (!product) return;
    currentQty = 1;
    currentPrice = product.price;

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
                <div><span>Availability:</span> In Stock</div>
                <div><span>Shipping:</span> Free</div>
                <div><span>Warranty:</span> 12 months</div>
            </div>

            <div class="quantity-section">
                <p class="section-title">Quantity</p>
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


window.onclick = function(event) {
    const overlay = document.getElementById('modal-overlay');
    if (event.target == overlay) closeModal();
}

function changeQuantity(delta) {
    const qtyDisplay = document.getElementById('product-qty');
    const subtotalDisplay = document.getElementById('product-subtotal');
    const mainBtn = document.getElementById('main-add-btn');

   
    if (currentQty + delta < 1) return;

    currentQty += delta;
  
    qtyDisplay.innerText = currentQty;
    
    const subtotal = (currentPrice * currentQty).toFixed(2);
    subtotalDisplay.innerText = `$${subtotal}`;
 
    const textoProducto = currentQty === 1 ? 'product' : 'products';
    mainBtn.innerHTML = `🛒 Add ${currentQty} ${textoProducto} to Cart`;
}   


// FUNCIONES PARA EL FILTROOOOOOOOO============================================================================


const searchInput = document.getElementById('product-search');
const categoryButtons = document.querySelectorAll('.btn-category');
const priceSlider = document.querySelector('.price-slider');
const priceText = document.getElementById('price-range');


let activeCategory = 'all';

searchInput.addEventListener('change', () => {
    applyFilters();
});


categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
       
        categoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        let rawText = btn.innerText.split('\n')[0].trim().toLowerCase();

        if (rawText.includes("all")) activeCategory = 'all';
        else if (rawText.includes("eletronics")) activeCategory = 'electronics';
        else if (rawText.includes("jowelry")) activeCategory = 'jewelery';
        else activeCategory = rawText;

        applyFilters();
    });
});

priceSlider.addEventListener('change', (e) => {
    priceText.innerText = `$0 - $${e.target.value}`;
    applyFilters();
});


// LoGICA DE FILTRADO==========================================================================0

function applyFilters() {
    const maxPrice = parseFloat(priceSlider.value);
    const searchTerm = searchInput.value.toLowerCase().trim();

    const filtered = products.filter(p => {

        const matchName = p.title.toLowerCase().includes(searchTerm);
        
        const matchCategory = activeCategory === 'all' || p.category === activeCategory;
        
        const matchPrice = p.price <= maxPrice;
        return matchName && matchCategory && matchPrice;
    });

    renderProducts(filtered);
}

// RENDERIZADO EN EL HTML =========================================================================000

function renderProducts(productsList) {

    productosContainer.innerHTML = '';

    if (productsList.length === 0) {
        productosContainer.innerHTML = `<p class="no-results">No products found matching the filters.</p>`;
        return;
    }

    productsList.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        
        productElement.innerHTML = `
            <div class='card'>
                <p class='product-price'>US$ ${product.price}</p>
                <img class='product-image' src='${product.image}' alt='${product.title}'>
                <p class='product-category'>${product.category}</p>
                <h1 class='product-title'>${product.title}</h1>
                <div class='card-footer'>
                    <button class='details-button' onclick='openModal(${product.id})'>View Details</button>
                    <button class='product-add' onclick='addToCar(${product.id})'>
                         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                         </svg>
                    </button>
                </div>
            </div>`;
        
        productosContainer.appendChild(productElement);
    });
}

// poppup carrito==============================================================00

document.getElementById('carr').addEventListener('click', () => {
    renderCartItems(); 
    document.getElementById('cart-overlay').style.display = 'flex';
});


function closeCart() {
    document.getElementById('cart-overlay').style.display = 'none';
}

window.addEventListener('click', (event) => {
    const cartOverlay = document.getElementById('cart-overlay');
    if (event.target == cartOverlay) closeCart();
});


function renderCartItems() {
    const cart = getCart();
    const cartBody = document.querySelector('.cart-body');
    const totalElement = document.getElementById('cart-total');
    
    cartBody.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        cartBody.innerHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="item-details">
                    <span class="item-category">${item.category}</span>
                    <h4>${item.title}</h4>
                    <span class="item-price">${item.quantity} x $${item.price.toFixed(2)}</span>
                </div>
                <button class="btn-remove" onclick="removeFromCart(${item.id})">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                </button>
            </div>
        `;
    });

    totalElement.innerText = `$${total.toFixed(2)}`;
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    saveCartToLocalStorage(cart);
    renderCartItems(); 
}