// Product Class
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

// ShoppingCartItem Class
class ShoppingCartItem {
    constructor(product, quantity) {
        this.product = product;
        this.quantity = quantity;
    }

    getTotalPrice() {
        return this.product.price * this.quantity;
    }
}

// ShoppingCart Class
class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(product, quantity) {
        const cartItem = new ShoppingCartItem(product, quantity);
        this.items.push(cartItem);
        this.displayCartItems();
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.displayCartItems();
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0).toFixed(2);
    }

    displayCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';

        this.items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.product.name} - $${item.product.price} x ${item.quantity} = $${item.getTotalPrice().toFixed(2)}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.onclick = () => this.removeItem(item.product.id);
            li.appendChild(removeButton);
            cartItemsContainer.appendChild(li);
        });

        document.getElementById('cart-total').textContent = this.getTotal();
    }
}

// Test products
const products = [
    new Product(1, 'Product 1', 10.00),
    new Product(2, 'Product 2', 20.00)
];

// Create a shopping cart
const shoppingCart = new ShoppingCart();

// Function to add product to cart
function addProductToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        shoppingCart.addItem(product, 1);
    }
}

// Initial display
shoppingCart.displayCartItems();