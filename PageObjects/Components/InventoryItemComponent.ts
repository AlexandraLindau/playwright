import { Page } from 'playwright-core';
import ProductDetails from "./ProductDetails";
import IProduct from '../../models/IProduct';

class InventoryItemComponent extends ProductDetails {
    constructor(page: Page) {
        super(page, '.inventory_item');
    }

    async addItemToCartByIndex(index: number) {
        await this.getProductButton(index).click();
    }

    async addRandomItemsToCart() {
        const maxNumber = (await super.getProductsList()).length;
        let numberOfProducts = Math.floor(Math.random() * maxNumber) + 1;
        let products: IProduct[] = [];

        while (numberOfProducts > 0) {
            let itemIndex = Math.floor(Math.random() * 6);
            if (await super.getProductButton(itemIndex).innerText() === 'Add to cart') {
                await this.addItemToCartByIndex(itemIndex);
                products.push(await super.getProductByIndex(itemIndex));
                numberOfProducts--;
            }
        }
        return products;
    }
}

export default InventoryItemComponent;