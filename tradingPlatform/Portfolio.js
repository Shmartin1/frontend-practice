import { Asset } from './Asset.js';

export class Portfolio {
    constructor() {
        this.assets = new Map();
    }

    addStock(asset, amount) {
        if (this.assets.has(asset)) {
            const currentAmount = this.assets.get(asset);
            this.assets.set(asset, amount + currentAmount);
        } else {
            this.assets.set(asset, amount);
        }

        return this.assets;
    }
}