import { Locator } from "@playwright/test";
import BasePage from "../BasePage";
import { Page } from 'playwright-core';

class HeaderComponent extends BasePage {
    title: Locator;
    shoppingCart: Locator;
    shoppingCartBadge: Locator;
    constructor(page: Page) {
        super(page);
        this.title = this.page.locator('.title');
        this.shoppingCart = this.page.locator('.shopping_cart_link');
        this.shoppingCartBadge = this.page.locator('.shopping_cart_badge');
    }

    getShoppingCartBadgeCounter(): Promise <string> {
        return this.shoppingCartBadge.innerText();
    }

    async openCart(): Promise <void> {
        await this.shoppingCart.click();
    }
}

export default HeaderComponent;