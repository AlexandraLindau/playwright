import BasePage from './BasePage.js';
import HeaderComponent from './Components/HeaderComponent.js';
import { Page } from 'playwright-core';
import CartItemComponent from './Components/CartItemComponent.js';

class CartPage extends BasePage {
    headerComponenet: HeaderComponent;
    cartItemComponent: CartItemComponent;
    product: { title: string; quantity: string; description: string; price: string; button: string; };
    constructor(page: Page) {
        super(page);
        this.endpoint = 'cart.html';
        this.headerComponenet = new HeaderComponent(page);
        this.cartItemComponent = new CartItemComponent(page);
    }
}

export default CartPage;