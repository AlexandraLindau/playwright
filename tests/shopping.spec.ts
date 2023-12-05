import { expect } from '@playwright/test';
import { test } from './fixture';
import 'dotenv/config'

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
})