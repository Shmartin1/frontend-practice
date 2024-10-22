import { Asset } from './Asset.js';

export class Trade {
    constructor(id, type, asset, quantity) {
        this.id = id;
        this.type = type;
        this.asset = asset;
        this.quantity = quantity;
    }
}