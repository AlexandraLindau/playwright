import BasePage from "../BasePage";
import { Page } from 'playwright-core';
import { Locator } from '@playwright/test';

class CartItemComponent extends BasePage {
    products: Locator;
    constructor(page: Page) {
        super(page);
        this.products = this.page.locator('.cart_item');
    }

    getProductTitle(index: number) {
        // return this.products.nth(index).locator('.inventory_item_name');
        return this.page.locator(`(//div[@class="cart_item"])[${index}]//div[@class="inventory_item_name"]`);
    }

    getProductQuantity(index: number) {
        // return this.products.nth(index).locator('.cart_quantity');
        return this.page.locator(`(//div[@class="cart_item"])[${index}]//div[@class="cart_quantity"]`);
    }

    getProductDescription(index: number) {
        // return this.products.nth(index).locator('.inventory_item_desc');
        return this.page.locator(`(//div[@class="cart_item"])[${index}]//div[@class="inventory_item_desc"]`);
    }

    getProductPrice(index: number) {
        // return this.products.nth(index).locator('.inventory_item_price');
        return this.page.locator(`(//div[@class="cart_item"])[${index}]//div[@class="inventory_item_price"]`);
    }

    getProductButton(index: number) {
        // return this.products.nth(index).locator('button');
        return this.page.locator(`(//div[@class="cart_item"])[${index}]//button`);
    }

    async getProductByIndex(index: number) {
        const title = await this.getProductTitle(index).innerText();
        const description = await this.getProductDescription(index).innerText();
        const price = await this.getProductPrice(index).innerText();
        return { title, description, price };
    }

    async removeProductByIndex(index: number) {
        await this.getProductButton(index).click();
    }
}

export default CartItemComponent;