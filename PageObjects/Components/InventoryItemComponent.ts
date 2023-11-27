import BasePage from "../BasePage";
import { Page } from 'playwright-core';
import { Locator } from '@playwright/test';

class InventoryItemComponent extends BasePage {
    products: Locator;
    constructor(page: Page) {
        super(page);
        this.products = this.page.locator('.inventory_item');
    }

    getProductTitle(index: number) {
        return this.page.locator(`.inventory_item:nth-of-type(${index}) .inventory_item_name`);
    }

    getProductDescription(index: number) {
        return this.page.locator(`.inventory_item:nth-of-type(${index}) .inventory_item_desc`);
    }

    getProductPrice(index: number) {
        return this.page.locator(`.inventory_item:nth-of-type(${index}) .inventory_item_price`);
    }

    getProductButton(index: number) {
        return this.page.locator(`.inventory_item:nth-of-type(${index}) .btn.btn_primary.btn_small.btn_inventory`);
    }

    async getProductByIndex(index: number): Promise <IProduct> {
        const title = await this.getProductTitle(index).innerText();
        const description = await this.getProductDescription(index).innerText();
        const price = await this.getProductPrice(index).innerText();
        return { title, description, price };
    }

    async getProductsList() {
        return await this.products.all();
    }

    async addItemToCartByIndex(index: number) {
        await this.getProductButton(index).click();
    }
}

export default InventoryItemComponent;