import { Item } from './Item.js';

export class Cart {
    constructor() {
        this.items = new Map();
    }

    addItem(item) {
       if (!(item instanceof Item)) {
        throw new Error("Invalid item");
       }

       if (!this.items.has(item.id)) {
        this.items.set(item.id, { item: item, quantity: 1});
       } else {
        const cartEntry = this.items.get(item.id);
        cartEntry.quantity += 1;
        this.items.set(item.id, cartEntry);
       }
    }

    removeItem(itemId) {
        if (this.items.has(itemId)) {
            this.items.delete(itemId);
        } else {
            console.error("Item not found in cart");
        }
    }

    updateQuantity(itemId, newQuantity) {
        if (this.items.has(itemId)) {
            if (newQuantity <= 0) {
                this.items.delete(itemId);
            } else {
                const cartEntry = this.items.get(itemId);
                cartEntry.quantity = newQuantity;
                this.items.set(itemId, cartEntry);
            }
        } else {
            console.error("Item not found in cart");
        }
    }

    calculateTotal() {
        let total = 0;
        this.items.forEach(cartEntry => {
            total += cartEntry.item.price * cartEntry.quantity;
        });
        return total;
    }

    getCartSummary() {
        const summary = [];
        this.items.forEach(cartEntry => {
            summary.push({
                ...cartEntry.item,
                quantity: cartEntry.quantity,
                total: cartEntry.item.price * cartEntry.quantity

            });
        });
        return summary;
    }
}