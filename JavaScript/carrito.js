// Referencias al DOM
const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartTotalLabel = document.getElementById('cart-total-amount');

// Datos de ejemplo basados en tu captura
let productosEnCarrito = [
    { id: 101, name: "Smartwatch Elite", cat: "Electrónicos", price: 399, qty: 1, img: "https://via.placeholder.com/100" },
    { id: 102, name: "Auriculares Wireless", cat: "Electrónicos", price: 249, qty: 3, img: "https://via.placeholder.com/100" },
    { id: 103, name: "Collar de Diamantes", cat: "Joyas", price: 1599, qty: 1, img: "https://via.placeholder.com/100" }
];

// Función para abrir el carrito (puedes llamarla desde tus botones de compra)
function openCart() {
    renderCart();
    cartOverlay.style.display = 'flex';
}

// Cerrar
closeCartBtn.onclick = () => cartOverlay.style.display = 'none';

// Renderizar contenido
function renderCart() {
    cartItemsContainer.innerHTML = "";
    let totalAcumulado = 0;

    productosEnCarrito.forEach(item => {
        totalAcumulado += (item.price * item.qty);
        cartItemsContainer.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <span class="item-category">${item.cat}</span>
                    <span class="item-price">$${item.price} x ${item.qty}</span>
                </div>
                <button class="btn-remove" onclick="removeItem(${item.id})">&times;</button>
            </div>
        `;
    });

    cartTotalLabel.innerText = `$${totalAcumulado.toFixed(2)}`;
}

// Eliminar item
function removeItem(id) {
    productosEnCarrito = productosEnCarrito.filter(p => p.id !== id);
    renderCart();
}

// Ejemplo: Si quieres probarlo de inmediato, descomenta la siguiente línea:
// openCart();