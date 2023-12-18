import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage.js';
import HeaderComponent from './Components/HeaderComponent.js';
import InventoryItemComponent from './Components/InventoryItemComponent.js';

class ProductsPage extends BasePage {
  headerComponent: HeaderComponent;

  inventoryItemComponent: InventoryItemComponent;

  products: string;

  product: { title: string; description: string; price: string; button: string; };

  sortingMenu: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.endpoint = 'inventory.html';
    this.headerComponent = new HeaderComponent(page);
    this.inventoryItemComponent = new InventoryItemComponent(page);
    this.sortingMenu = this.page.getByRole('combobox');
  }

  async selectSortingOption(sorting: SortingOption): Promise <void> {
    await this.sortingMenu.selectOption(sorting);
  }
}

export enum SortingOption {
  priceAsc = 'lohi',
  priceDesc = 'hilo',
  nameAsc = 'az',
  nameDesc = 'za',
}

export default ProductsPage;
