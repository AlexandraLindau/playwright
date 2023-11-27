import { Page } from 'playwright-core';
import ProductDetails from "./ProductDetails";

class InventoryItemComponent extends ProductDetails {
    constructor(page: Page) {
        super(page, '.inventory_item');
    }

    getProductTitle(index: number) {
        return this.page.locator(`${super.baseProductSelector}:nth-of-type(${index}) .${super.productTitleSelector}`);
    }

    getProductDescription(index: number) {
        return this.page.locator(`${super.baseProductSelector}:nth-of-type(${index}) .${super.productDescriptionSelector}`);
    }

    getProductPrice(index: number) {
        return this.page.locator(`${super.baseProductSelector}:nth-of-type(${index}) .${super.productPriceSelector}`);
    }

    getProductButton(index: number) {
        return this.page.locator(`${super.baseProductSelector}:nth-of-type(${index}) ${super.productButtonSelector}`);
    }

    async addItemToCartByIndex(index: number) {
        await this.getProductButton(index).click();
    }
}

export default InventoryItemComponent;