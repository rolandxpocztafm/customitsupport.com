
// Cart management functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId, productName, price, quantity = 1) {
    let existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id: productId, name: productName, price: price, quantity: quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center';
    notification.innerHTML = `
        <i data-feather="check-circle" class="w-5 h-5 mr-2"></i>
        <span>${productName} added to cart</span>
    `;
    document.body.appendChild(notification);
    feather.replace();
    
    setTimeout(() => {
        notification.classList.add('opacity-0', 'transition-opacity', 'duration-300');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function removeFromCart(index) {
    const removedItem = cart[index].name;
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center';
    notification.innerHTML = `
        <i data-feather="trash-2" class="w-5 h-5 mr-2"></i>
        <span>${removedItem} removed from cart</span>
    `;
    document.body.appendChild(notification);
    feather.replace();
    
    setTimeout(() => {
        notification.classList.add('opacity-0', 'transition-opacity', 'duration-300');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function updateCartItemQuantity(index, newQuantity) {
    if (newQuantity < 1) newQuantity = 1;
    cart[index].quantity = newQuantity;
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

function getCartItemCount() {
    return cart.reduce((count, item) => count + item.quantity, 0);
}

function updateCartDisplay() {
    const cartItemsEl = document.getElementById('cart-items');
    const cartContentEl = document.getElementById('cart-content');
    const emptyCartEl = document.getElementById('empty-cart');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (cart.length === 0) {
        if (cartContentEl) cartContentEl.classList.add('hidden');
        if (emptyCartEl) emptyCartEl.classList.remove('hidden');
        if (checkoutBtn) checkoutBtn.classList.add('hidden');
        return;
    }
    
    if (cartContentEl) cartContentEl.classList.remove('hidden');
    if (emptyCartEl) emptyCartEl.classList.add('hidden');
    if (checkoutBtn) checkoutBtn.classList.remove('hidden');
    
    if (cartItemsEl) {
        cartItemsEl.innerHTML = '';
        
        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            const li = document.createElement('li');
            li.className = 'grid grid-cols-12 gap-4 items-center';
            li.innerHTML = `
                <div class="col-span-6 flex items-center">
                    <button onclick="removeFromCart(${index})" class="text-red-500 hover:text-red-400 mr-4">
                        <i data-feather="trash-2" class="w-4 h-4"></i>
                    </button>
                    <span>${item.name}</span>
                </div>
                <div class="col-span-2 text-center">€${item.price.toFixed(2)}</div>
                <div class="col-span-2 flex justify-center">
                    <input type="number" value="${item.quantity}" min="1" 
                        class="w-20 p-2 rounded-lg form-input text-center" 
                        onchange="updateCartItemQuantity(${index}, parseInt(this.value))">
                </div>
                <div class="col-span-2 text-right font-medium">€${itemTotal.toFixed(2)}</div>
            `;
            cartItemsEl.appendChild(li);
        });
    }
    
    const subtotal = getCartTotal();
    if (subtotalEl) subtotalEl.textContent = `€${subtotal.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `€${subtotal.toFixed(2)}`;
    
    if (window.feather) {
        feather.replace();
    }
}

// Initialize cart on page load
document.addEventListener('DOMContentLoaded', () => {
    // Ensure all cart items have quantity
    cart.forEach(item => {
        if (!item.quantity) {
            item.quantity = 1;
        }
    });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
});

// Expose functions to global scope
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateCartItemQuantity = updateCartItemQuantity;
