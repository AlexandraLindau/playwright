import BasePage from './BasePage.js';
import HeaderComponent from './Components/HeaderComponent.js';
import { Page } from 'playwright-core';
import InventoryItemComponent from './Components/InventoryItemComponent.js';
import { Locator } from '@playwright/test';

class ProductsPage extends BasePage {
    headerComponent: HeaderComponent;
    inventoryItemComponent: InventoryItemComponent;
    products: string;
    product: { title: string; description: string; price: string; button: string; };
    sortingMenu: Locator;
    sortByPriceAcsSelector: string;
    sortByPriceDecsSelector: string;
    sortByNameAcsSelector: string;
    sortByNameDecsSelector: string;
    constructor(page: Page) {
        super(page);
        this.page = page;
        this.endpoint = 'inventory.html';
        this.headerComponent = new HeaderComponent(page);
        this.inventoryItemComponent = new InventoryItemComponent(page);
        this.sortingMenu = this.page.getByRole('combobox');
        this.sortByPriceAcsSelector = 'lohi';
        this.sortByPriceDecsSelector = 'hilo';
        this.sortByNameAcsSelector = 'az';
        this.sortByNameDecsSelector = 'za';
    }

    async openSortingMenu() {
        await this.sortingMenu.selectOption(this.sortByPriceAcsSelector);
    }
}

export default ProductsPage;