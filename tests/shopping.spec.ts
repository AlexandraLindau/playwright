import { expect } from '@playwright/test';
import { test } from './fixture';
import 'dotenv/config'
import IProduct from '../models/IProduct';
import { confirmation } from '../strings';
import { user } from '../test-data';

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

  let actualProducts: IProduct[] = [];
  const expectedProducts = await productsPage.inventoryItemComponent.addRandomItemsToCart();

  await productsPage.headerComponent.openCart();
  const numberOfProductsInCart = (await cartPage.cartItemComponent.getProductsList()).length;
  for (let i = 0; i < numberOfProductsInCart; i++) {
    actualProducts.push(await cartPage.cartItemComponent.getProductByIndex(i));
  }

  expect(actualProducts).toEqual(expectedProducts);

});

test('Add random products to cart and checkout', async ({ productsPage, cartPage, checkoutPage }) => {

  const products = await productsPage.inventoryItemComponent.addRandomItemsToCart();
  let expectedTotal: number = 0;
  for (const element of products) {
    expectedTotal += Number(element.price.replace('$', ''));
  }

  await productsPage.headerComponent.openCart();
  await cartPage.clickCheckout();
  await checkoutPage.fillInCheckoutInfo(user);
  await checkoutPage.clickContinue();
  const actualTotal = await checkoutPage.getSubtotalAmout();
  expect(actualTotal).toEqual(expectedTotal);

  await checkoutPage.clickFinish();
  expect(await checkoutPage.resultHeader.innerText()).toEqual(confirmation.header);
  expect(await checkoutPage.resultMessage.innerText()).toEqual(confirmation.message);

})