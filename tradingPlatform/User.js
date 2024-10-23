import { Portfolio } from './Portfolio.js';
import { Asset } from './Asset.js';
import { Trade } from './Trade.js';

export class User {
    constructor(id, username, password, balance) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.balance = balance;
        this.portfolio = new Portfolio();
        this.transactionHistory = [];
    }

    buyAsset(asset, amount) {
        if (asset.price * amount <= this.balance) {
            const transactionId = this.transactionHistory.length + 1;
            const newTrade = new Trade(transactionId, "buy", asset, amount);
            this.transactionHistory.push(newTrade);
            this.portfolio.addStock(asset, amount);
            this.balance -= asset.price * amount;
        } else {
            throw new Error("Your balance is too low.");
        }
    }

    sellAsset(asset, amount) {
        const assets = this.portfolio.assets;
        if (!assets.has(asset) || amount > assets.get(asset)) {
            throw new Error("You do not have enough shares.");
        } else {
            const newAmount = this.portfolio.assets.get(asset) - amount;
            const value = asset.price * amount;
            this.balance += value;
            if (newAmount > 0) {
                this.portfolio.assets.set(asset, newAmount);
            } else {
                this.portfolio.assets.delete(asset);
            }

            const transactionId = this.transactionHistory.length + 1;
            const newTrade = new Trade(transactionId, "sell", asset, amount);
            this.transactionHistory.push(newTrade);
        }
    }
}