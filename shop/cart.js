// Cart management functions
function addToCart(productId, productName, price, quantity = 1) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id: productId, name: productName, price: price, quantity: quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
    alert(`${productName} added to cart!`); // Optional feedback
}

function updateCartDisplay() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartElement = document.getElementById('cart-items');
    let totalElement = document.getElementById('cart-total');
    if (cartElement && totalElement) {
        cartElement.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            let li = document.createElement('li');
            li.className = 'flex justify-between mb-2';
            li.innerHTML = `<span>${item.name} x ${item.quantity}</span><span>€${(item.price * item.quantity).toFixed(2)}</span>`;
            cartElement.appendChild(li);
            total += item.price * item.quantity;
        });
        totalElement.textContent = `Total: €${total.toFixed(2)}`;
    }
}

// Load cart on page ready
document.addEventListener('DOMContentLoaded', updateCartDisplay);
