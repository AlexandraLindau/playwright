
import { Page } from 'playwright-core';
import ProductDetails from "./ProductDetails";

class CartItemComponent extends ProductDetails {
    constructor(page: Page) {
        super(page, '(//div[@class="cart_item"])');
    }

    getProductQuantity(index: number) {
        return this.products.nth(index).locator('.cart_quantity');
    }

    async removeProductByIndex(index: number) {
        await this.getProductButton(index).click();
    }
}

export default CartItemComponent;