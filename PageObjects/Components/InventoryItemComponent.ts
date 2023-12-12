import { Page } from '@playwright/test';
import ProductDetails from './ProductDetails';
import IProduct from '../../models/IProduct';

class InventoryItemComponent extends ProductDetails {
  constructor(page: Page) {
    super(page, '.inventory_item');
  }

  async addItemToCartByIndex(index: number): Promise <void> {
    await this.getProductButton(index).click();
  }

  async addRandomItemsToCart(): Promise <IProduct[]> {
    const maxNumber = (await super.getProductsList()).length;
    let numberOfProducts = Math.floor(Math.random() * maxNumber) + 1;
    const products: IProduct[] = [];

    while (numberOfProducts > 0) {
      const itemIndex = Math.floor(Math.random() * 6);
      if (await super.getProductButton(itemIndex).innerText() === 'Add to cart') {
        await this.addItemToCartByIndex(itemIndex);
        products.push(await super.getProductDataByIndex(itemIndex));
        numberOfProducts--;
      }
    }
    return products;
  }
}

export default InventoryItemComponent;
