
import { Page } from 'playwright-core';
import ProductDetails from "./ProductDetails";

class CartItemComponent extends ProductDetails {
    constructor(page: Page) {
        super(page, '(//div[@class="cart_item"])');
    }

    getProductTitle(index: number) {
        // return this.products.nth(index).locator('.inventory_item_name');
        return this.page.locator(`${super.baseProductSelector}[${index}]//div[@class="${super.productTitleSelector}"]`);
    }

    getProductQuantity(index: number) {
        // return this.products.nth(index).locator('.cart_quantity');
        return this.page.locator(`${super.baseProductSelector}[${index}]//div[@class="cart_quantity"]`);
    }

    getProductDescription(index: number) {
        // return this.products.nth(index).locator('.inventory_item_desc');
        return this.page.locator(`${super.baseProductSelector}[${index}]//div[@class="${super.productDescriptionSelector}"]`);
    }

    getProductPrice(index: number) {
        // return this.products.nth(index).locator('.inventory_item_price');
        return this.page.locator(`${super.baseProductSelector}[${index}]//div[@class="${super.productPriceSelector}"]`);
    }

    getProductButton(index: number) {
        // return this.products.nth(index).locator('button');
        return this.page.locator(`${super.baseProductSelector}[${index}]//${super.productButtonSelector}`);
    }

    async removeProductByIndex(index: number) {
        await this.getProductButton(index).click();
    }
}

export default CartItemComponent;