import BasePage from './BasePage.js';
import HeaderComponent from './Components/HeaderComponent.js';
import Product from '../models/Product.js'
import { Page } from 'playwright-core';

class CartPage extends BasePage {
    headerComponenet: HeaderComponent;
    products: string;
    product: { title: string; quantity: string; description: string; price: string; button: string; };
    constructor(page: Page) {
        super(page);
        this.endpoint = 'cart.html';
        this.headerComponenet = new HeaderComponent(page);
        this.products = '.cart_item';
        this.product = {
            title: '(//div[@class="cart_item"])[{INDEX}]//div[@class="inventory_item_name"]',
            quantity: '(//div[@class="cart_item"])[{INDEX}]//div[@class="cart_quantity"]',
            description: '(//div[@class="cart_item"])[{INDEX}]//div[@class="inventory_item_desc"]',
            price: '(//div[@class="cart_item"])[{INDEX}]//div[@class="inventory_item_price"]',
            button: '(//div[@class="cart_item"])[{INDEX}]//button'
        }
    }

    async getProductByIndex(index) {
        const titleLocator = this.product.title.replace('{INDEX}', index);
        const descriptionLocator = this.product.description.replace('{INDEX}', index);
        const priceLocator = this.product.price.replace('{INDEX}', index);
        const title = await this.page.locator(titleLocator).innerText();
        const description = await this.page.locator(descriptionLocator).innerText();
        const price = await this.page.locator(priceLocator).innerText();
        return new Product(title, description, price);
    }

    async removeProductByIndex(index) {
        const removeButtonLocator = this.product.button.replace('{INDEX}', index);
        await this.page.locator(removeButtonLocator).click();
    }

}

export default CartPage;