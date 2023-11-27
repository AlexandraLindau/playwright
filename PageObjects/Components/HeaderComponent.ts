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

    getShoppingCartBadgeCounter() {
        return this.shoppingCartBadge.innerText();
    }

    async openCart() {
        await this.shoppingCart.click();
    }
}

export default HeaderComponent;