import { Page } from 'playwright-core';
import ProductDetails from "./ProductDetails";

class InventoryItemComponent extends ProductDetails {
    constructor(page: Page) {
        super(page, '.inventory_item');
    }

    async addItemToCartByIndex(index: number) {
        await this.getProductButton(index).click();
    }
}

export default InventoryItemComponent;