import BasePage from "../BasePage";
import { Page } from 'playwright-core';

class HeaderComponent extends BasePage {
    title: string;
    shoppingCart: string;
    shoppingCartBadge: string;
    constructor(page: Page) {
        super(page);
        this.title = '.title';
        this.shoppingCart = '.shopping_cart_link';
        this.shoppingCartBadge = '.shopping_cart_badge';
    }

    async getTitle() {
        return await this.page.locator(this.title).first();
    }

    async getShoppingCart() {
        return await this.page.locator(this.shoppingCart).first();
    }

    async getShoppingCartBadgeCounter() {
        const element = await this.page.locator(this.shoppingCartBadge).first();
        return await element.innerText();
    }

    async openCart() {
        await this.page.locator(this.shoppingCart).click();
    }
}

export default HeaderComponent;