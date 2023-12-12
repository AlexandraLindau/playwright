import BasePage from './BasePage.js';
import HeaderComponent from './Components/HeaderComponent.js';
import { Page } from 'playwright-core';
import CartItemComponent from './Components/CartItemComponent.js';
import IProduct from '../models/IProduct.js';
import { Locator } from '@playwright/test';

class CartPage extends BasePage {
    headerComponenet: HeaderComponent;
    cartItemComponent: CartItemComponent;
    product: IProduct;
    checkoutButton: Locator;
    constructor(page: Page) {
        super(page);
        this.endpoint = 'cart.html';
        this.headerComponenet = new HeaderComponent(page);
        this.cartItemComponent = new CartItemComponent(page);
        this.checkoutButton = page.locator('#checkout');
    }

    async clickCheckout(): Promise <void> {
        await this.checkoutButton.click();
    }
}

export default CartPage;