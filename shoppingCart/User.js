import { Cart } from './Cart.js';

export class User {
    constructor(id, username) {
        this.id = id;
        this.username = username;
        this.cart = new Cart();
    }

    addItemToCart(name, price, description) {
        this.cart.addItem(name, price, description)
    }

    removeItemFromCart(itemId) {
        this.cart.removeItem(itemId);
    }

    viewCart() {
        return this.cart.getCartSummary();
    }
}