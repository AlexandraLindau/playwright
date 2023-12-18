import { Locator, Page } from '@playwright/test';
import IProduct from '../../models/IProduct';
import BasePage from '../BasePage';
import { SortingOption } from '../ProductsPage';

abstract class ProductDetails extends BasePage {
  products: Locator;

  baseProductSelector: string;

  productTitleSelector: string;

  productDescriptionSelector: string;

  productPriceSelector: string;

  productButtonSelector: string;

  constructor(page: Page, baseProductSelector: string) {
    super(page);
    this.products = this.page.locator(baseProductSelector);
    this.baseProductSelector = baseProductSelector;
    this.productTitleSelector = '.inventory_item_name';
    this.productDescriptionSelector = '.inventory_item_desc';
    this.productPriceSelector = '.inventory_item_price';
    this.productButtonSelector = 'button';
  }

  getProductTitle(index: number): Locator {
    return this.products.nth(index).locator(this.productTitleSelector);
  }

  getProductDescription(index: number): Locator {
    return this.products.nth(index).locator(this.productDescriptionSelector);
  }

  getProductPrice(index: number): Locator {
    return this.products.nth(index).locator(this.productPriceSelector);
  }

  getProductButton(index: number): Locator {
    return this.products.nth(index).locator(this.productButtonSelector);
  }

  async getProductDataByIndex(index: number): Promise<IProduct> {
    const title = await this.getProductTitle(index).innerText();
    const description = await this.getProductDescription(index).innerText();
    const price = await this.getProductPrice(index).innerText();
    return { title, description, price };
  }

  async getProductsList(): Promise <Locator[]> {
    return this.products.all();
  }

  async getAllItemsPrice(): Promise <string[]> {
    const prices: string[] = [];
    const allProduct = await this.getProductsList();
    for (let i = 0; i < allProduct.length; i++) {
      prices.push(await this.getProductPrice(i).innerText());
    }
    return prices;
  }

  async getAllItemsName(): Promise<string[]> {
    const names: string[] = [];
    const allProduct = await this.getProductsList();
    for (let i = 0; i < allProduct.length; i++) {
      names.push(await this.getProductTitle(i).innerText());
    }
    return names;
  }

  async getValues(sorting: SortingOption): Promise<string[]> {
    if (sorting === 'lohi' || sorting === 'hilo') {
      await this.getAllItemsPrice();
    } if (sorting === 'az' || sorting === 'za') {
      await this.getAllItemsName();
    }
    return [];
  }
}

export default ProductDetails;
