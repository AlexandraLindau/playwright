import { expect } from '@playwright/test';
import { test } from './fixture';
import 'dotenv/config'
import IProduct from '../models/IProduct';

test.beforeEach(async ({ page, loginPage }) => {
  await page.goto('');
  await loginPage.logIn(process.env.USERNAME, process.env.PASSWORD);
});


test('Add product to cart', async ({ productsPage, cartPage }) => {
  await productsPage.inventoryItemComponent.addItemToCartByIndex(0);
  const actualNumberOfItemsInCart = await productsPage.headerComponent.getShoppingCartBadgeCounter();
  expect(actualNumberOfItemsInCart).toEqual('1');

  const productOnProductsPage = await productsPage.inventoryItemComponent.getProductByIndex(0);
  await productsPage.headerComponent.openCart();
  const productOnCartPage = await cartPage.cartItemComponent.getProductByIndex(0);

  expect(productOnCartPage).toEqual(productOnProductsPage);

  cartPage.cartItemComponent.removeProductByIndex(0);
  await expect(cartPage.headerComponenet.shoppingCartBadge).toBeHidden();
  await expect(cartPage.cartItemComponent.products).toBeHidden();
});

test('Add random products to cart', async ({ productsPage, cartPage }) => {
  const maxNumber = (await productsPage.inventoryItemComponent.getProductsList()).length;
  let numberOfProducts = Math.floor(Math.random() * maxNumber) + 1;
  let expectedProducts: IProduct[] = [];
  let actualProducts: IProduct[] = [];

  while (numberOfProducts > 0) {
    let itemIndex = Math.floor(Math.random() * 6);
    if (await productsPage.inventoryItemComponent.getProductButton(itemIndex).innerText() === 'Add to cart') {
      productsPage.inventoryItemComponent.addItemToCartByIndex(itemIndex);
      expectedProducts.push(await productsPage.inventoryItemComponent.getProductByIndex(itemIndex));
      numberOfProducts--;
    }
  }

  await productsPage.headerComponent.openCart();
  const numberOfProductsInCart = (await cartPage.cartItemComponent.getProductsList()).length;
  for (let i = 0; i < numberOfProductsInCart; i++) {
    actualProducts.push(await cartPage.cartItemComponent.getProductByIndex(i));
  }

  expect(actualProducts).toEqual(expectedProducts);

})