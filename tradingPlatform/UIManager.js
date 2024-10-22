import { User } from './User.js';
import { Asset } from './Asset.js';

export class UIManager {
    constructor() {
        // Initialize data
        this.user = this.initializeUser();
        this.assets = this.initializeAssets();

        // Initialize UI components
        this.assetListContainer = document.querySelector('#asset-list');
        this.portfolioListContainer = document.querySelector('#portfolio-list');
        this.transactionListContainer = document.querySelector('#transaction-list');
        this.userBalanceContainer = document.querySelector('#user-balance');
        this.buyModal = document.querySelector('#buy-modal');
        this.buyAssetForm = document.querySelector('#buy-asset-form');
        this.assetQuantityInput = document.querySelector('#asset-quantity');
        this.closeModalButton = document.querySelector('#close-modal');

        // Render initial data
        this.renderAssetList();
        this.renderUserBalance();
        this.renderPortfolio();
        this.renderTransactionHistory();

        // Bind handlers
        this.bindEventHandlers();
    }

    initializeUser() {
        // Create a new user with default data
        return new User(1, "John Doe", "password", 1000);
    }

    initializeAssets() {
        // Create a fixed list of assets
        return [
            new Asset(1, "Apple", "AAPL", 150.00),
            new Asset(2, "Tesla", "TSLA", 700.00),
            new Asset(3, "Bitcoin", "BTC", 45000.00)
        ];
    }

    bindEventHandlers() {
        // Buy button click handler in asset list
        this.assetListContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('buy-asset')) {
                const assetId = parseInt(e.target.dataset.id);
                this.openBuyModal(assetId);
            }
        });

        // Close modal handler
        this.closeModalButton.addEventListener('click', () => {
            this.closeBuyModal();
        });

        // Buy asset form submission handler
        this.buyAssetForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const quantity = parseInt(this.assetQuantityInput.value);
            if (this.selectedAsset && !isNaN(quantity) && quantity > 0) {
                this.user.buyAsset(this.selectedAsset, quantity);
                this.renderUserBalance();
                this.renderPortfolio();
                this.renderTransactionHistory();
                this.closeBuyModal();
            } else {
                alert('Invalid quantity. Please enter a valid number.');
            }
        });
    }

    renderAssetList() {
        this.assetListContainer.innerHTML = '';
        this.assets.forEach(asset => {
            const assetElement = document.createElement('div');
            assetElement.className = 'asset-item';
            assetElement.innerHTML = `
                <span>${asset.name} (${asset.ticker}) - $${asset.price.toFixed(2)}</span>
                <button class="buy-asset" data-id="${asset.id}">Buy</button>
            `;
            this.assetListContainer.appendChild(assetElement);
        });
    }

    renderUserBalance() {
        this.userBalanceContainer.textContent = this.user.balance.toFixed(2);
    }

    renderPortfolio() {
        this.portfolioListContainer.innerHTML = '';
        this.user.portfolio.assets.forEach((quantity, asset) => {
            const portfolioElement = document.createElement('div');
            portfolioElement.className = 'portfolio-item';
            portfolioElement.innerHTML = `
                <span>${asset.name} (${asset.ticker}) - Quantity: ${quantity}</span>
            `;
            this.portfolioListContainer.appendChild(portfolioElement);
        });
    }

    renderTransactionHistory() {
        this.transactionListContainer.innerHTML = '';
        this.user.transactionHistory.forEach(trade => {
            const transactionElement = document.createElement('div');
            transactionElement.className = 'transaction-item';
            transactionElement.innerHTML = `
                <span>${trade.type.toUpperCase()} - ${trade.asset.name} (${trade.asset.ticker}) - Quantity: ${trade.quantity} at $${trade.asset.price.toFixed(2)}</span>
            `;
            this.transactionListContainer.appendChild(transactionElement);
        });
    }

    openBuyModal(assetId) {
        this.selectedAsset = this.assets.find(asset => asset.id === assetId);
        if (this.selectedAsset) {
            this.buyModal.classList.remove('hidden');
        }
    }

    closeBuyModal() {
        this.selectedAsset = null;
        this.assetQuantityInput.value = '';
        this.buyModal.classList.add('hidden');
    }
}
