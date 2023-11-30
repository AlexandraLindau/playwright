import BasePage from './BasePage.js';
import HeaderComponent from './Components/HeaderComponent.js';
import { Page } from 'playwright-core';
import InventoryItemComponent from './Components/InventoryItemComponent.js';

class ProductsPage extends BasePage {
    headerComponent: HeaderComponent;
    inventoryItemComponent: InventoryItemComponent;
    products: string;
    product: { title: string; description: string; price: string; button: string; };
    constructor(page: Page) {
        super(page);
        this.page = page;
        this.endpoint = 'inventory.html';
        this.headerComponent = new HeaderComponent(page);
        this.inventoryItemComponent = new InventoryItemComponent(page);
    }
}

export default ProductsPage;