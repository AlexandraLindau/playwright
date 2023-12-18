import { Locator, Page } from '@playwright/test';
import ProductDetails from './ProductDetails';
import IProduct from '../../models/IProduct';

export class CartItemComponent extends ProductDetails {
  constructor(page: Page) {
    super(page, '(//div[@class="cart_item"])');
  }

  getProductQuantity(index: number): Locator {
    return this.products.nth(index).locator('.cart_quantity');
  }

  async removeProductByIndex(index: number): Promise<void> {
    await this.getProductButton(index).click();
  }

  async getProductsFromCart(): Promise<IProduct[]> {
    const products: IProduct[] = [];
    const numberOfProductsInCart = (await this.getProductsList()).length;
    for (let i = 0; i < numberOfProductsInCart; i++) {
      products.push(await this.getProductDataByIndex(i));
    }
    return products;
  }
}
