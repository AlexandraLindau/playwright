import BasePage from './BasePage.js';
import HeaderComponent from './Components/HeaderComponent.js';
import Product from '../models/Product.js'

class ProductsPage extends BasePage {
    constructor(page) {
        super();
        this.page = page;
        this.endpoint = 'inventory.html';
        this.headerComponent = new HeaderComponent(page);
        this.products = '.inventory_item';
        this.product = {
            title: '.inventory_item:nth-of-type({INDEX}) .inventory_item_name',
            description: '.inventory_item:nth-of-type({INDEX}) .inventory_item_desc',
            price: '.inventory_item:nth-of-type({INDEX}) .inventory_item_price',
            button: '.inventory_item:nth-of-type({INDEX}) .btn.btn_primary.btn_small.btn_inventory'
        }
    }

    async getProductsList() {
        return await this.page.locator(this.products).all();
    }

    async addItemToCartByIndex(index) {
        const locator = this.product.button.replace('{INDEX}', index);
        await this.page.locator(locator).click();
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
}

export default ProductsPage;