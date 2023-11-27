import { Locator } from "@playwright/test";
import BasePage from "../BasePage";
import { Page } from 'playwright-core';

class HeaderComponent extends BasePage {
    title: Locator;
    shoppingCart: Locator;
    shoppingCartBadge: Locator;
    constructor(page: Page) {
        super(page);
        this.title = this.page.locator('.title').first();
        this.shoppingCart = this.page.locator('.shopping_cart_link').first();
        this.shoppingCartBadge = this.page.locator('.shopping_cart_badge').first();
    }

    // async getTitle() {
    //     return await this.page.locator(this.title).first();
    // }

    // async getShoppingCart() {
    //     return await this.page.locator(this.shoppingCart).first();
    // }

    getShoppingCartBadgeCounter() {
        // const element = await this.page.locator(this.shoppingCartBadge).first();
        // return await element.innerText();
        return this.shoppingCartBadge.innerText();
    }

    async openCart() {
        // await this.page.locator(this.shoppingCart).click();
        await this.shoppingCart.click();
    }
}

export default HeaderComponent;