// UIManager.js

import { User } from './User.js';
import { Item } from './Item.js';

export class UIManager {
  constructor() {
    this.user = new User(1, 'John Doe');

    // Reference UI elements
    this.productListContainer = document.querySelector("#product-list");
    this.cartListContainer = document.querySelector("#cart-list");
    this.totalItemsContainer = document.querySelector("#total-items");
    this.totalCostContainer = document.querySelector("#total-cost");

    if (!this.productListContainer || !this.cartListContainer || !this.totalItemsContainer || !this.totalCostContainer) {
      console.error("One or more required DOM elements are missing.");
      return;
    }

    // Sample Items
    this.items = [
      new Item(1, 'Wireless Mouse', 25.00, 'A high-precision wireless mouse'),
      new Item(2, 'Mechanical Keyboard', 75.00, 'A clicky mechanical keyboard'),
      new Item(3, 'USB-C Hub', 45.00, 'A multi-port USB-C adapter')
    ];

    // Render product list
    this.renderProductList();

    // Bind events
    this.bindEventHandlers();
  }

  bindEventHandlers() {
    // Handle adding items to the cart from product list
    this.productListContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("add-to-cart")) {
        const itemId = parseInt(e.target.dataset.id);
        const item = this.items.find(i => i.id === itemId);
        if (item) {
          this.user.addItemToCart(item);
          this.renderCart();
        }
      }
    });

    // Handle updating cart items or removing items
    this.cartListContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-item")) {
        const itemId = parseInt(e.target.dataset.id);
        this.user.removeItemFromCart(itemId);
        this.renderCart();
      }

      if (e.target.classList.contains("update-quantity")) {
        const itemId = parseInt(e.target.dataset.id);
        const quantityInput = this.cartListContainer.querySelector(`.quantity-input[data-id="${itemId}"]`);
        const newQuantity = parseInt(quantityInput.value);
        if (!isNaN(newQuantity) && newQuantity > 0) {
          this.user.cart.updateQuantity(itemId, newQuantity);
          this.renderCart();
        }
      }
    });
  }

  renderProductList() {
    this.productListContainer.innerHTML = "";
    this.items.forEach(item => {
      const productItem = document.createElement("div");
      productItem.className = "product-catalog__item";
      productItem.innerHTML = `
        <span>${item.name} - $${item.price.toFixed(2)}</span>
        <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
      `;
      this.productListContainer.appendChild(productItem);
    });
  }

  renderCart() {
    this.cartListContainer.innerHTML = "";
    const cartSummary = this.user.cart.getCartSummary();
    
    cartSummary.forEach(cartEntry => {
      const cartItem = document.createElement("div");
      cartItem.className = "shopping-cart__item";
      cartItem.innerHTML = `
        <span>${cartEntry.name} - $${cartEntry.price.toFixed(2)} x 
          <input type="number" class="quantity-input" data-id="${cartEntry.id}" value="${cartEntry.quantity}" min="1" />
          = $${(cartEntry.price * cartEntry.quantity).toFixed(2)}
        </span>
        <button class="update-quantity" data-id="${cartEntry.id}">Update Quantity</button>
        <button class="remove-item" data-id="${cartEntry.id}">Remove</button>
      `;
      this.cartListContainer.appendChild(cartItem);
    });

    // Update total items and cost
    this.totalItemsContainer.textContent = cartSummary.length;
    this.totalCostContainer.textContent = this.user.cart.calculateTotal().toFixed(2);
  }
}
