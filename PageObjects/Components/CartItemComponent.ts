import { Locator } from "@playwright/test";
import { Page } from 'playwright-core';
import ProductDetails from "./ProductDetails";
import IProduct from "../../models/IProduct";

class CartItemComponent extends ProductDetails {
    constructor(page: Page) {
        super(page, '(//div[@class="cart_item"])');
    }

    getProductQuantity(index: number): Locator {
        return this.products.nth(index).locator('.cart_quantity');
    }

    async removeProductByIndex(index: number): Promise<void> {
        await this.getProductButton(index).click();
    }

    async getProductsFromCart(): Promise<IProduct[]> {
        let products: IProduct[] = [];
        const numberOfProductsInCart = (await this.getProductsList()).length;
        for (let i = 0; i < numberOfProductsInCart; i++) {
            products.push(await this.getProductDataByIndex(i));
        }
        return products;
    }
}

export default CartItemComponent;