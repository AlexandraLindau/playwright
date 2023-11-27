import { Page } from 'playwright-core';
import ProductDetails from "./ProductDetails";

class InventoryItemComponent extends ProductDetails {
    constructor(page: Page) {
        super(page, '.inventory_item');
    }

    getProductTitle(index: number) {
        return this.page.locator(`${this.baseProductSelector}:nth-of-type(${index}) .${this.productTitleSelector}`);
    }

    getProductDescription(index: number) {
        return this.page.locator(`${this.baseProductSelector}:nth-of-type(${index}) .${this.productDescriptionSelector}`);
    }

    getProductPrice(index: number) {
        return this.page.locator(`${this.baseProductSelector}:nth-of-type(${index}) .${this.productPriceSelector}`);
    }

    getProductButton(index: number) {
        return this.page.locator(`${this.baseProductSelector}:nth-of-type(${index}) ${this.productButtonSelector}`);
    }

    async addItemToCartByIndex(index: number) {
        await this.getProductButton(index).click();
    }
}

export default InventoryItemComponent;