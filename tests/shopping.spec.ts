import { expect } from '@playwright/test';
import { test } from '../fixtures/fixture';
import 'dotenv/config';
import IProduct from '../models/IProduct';
import { confirmation } from '../strings';
import { user } from '../test-data';

test.beforeEach(async ({ loginPage }) => {
  await loginPage.logIn(process.env.USERNAME as string, process.env.PASSWORD as string);
});

test('Add product to cart', async ({ productsPage, cartPage }) => {
  productsPage.inventoryItemComponent.addItemToCartByIndex(0);
  const actualNumberOfItemsInCart = await productsPage.headerComponent.getShoppingCartBadgeCounter();
  expect(actualNumberOfItemsInCart).toEqual('1');
  const productOnProductsPage: IProduct = await productsPage.inventoryItemComponent.getProductDataByIndex(0);

  productsPage.headerComponent.openCart();
  const productOnCartPage: IProduct = await cartPage.cartItemComponent.getProductDataByIndex(0);
  expect(productOnCartPage).toEqual(productOnProductsPage);

  await cartPage.cartItemComponent.removeProductByIndex(0);
  await expect(cartPage.headerComponenet.shoppingCartBadge).toBeHidden();
  await expect(cartPage.cartItemComponent.products).toBeHidden();
});

test('Add random products to cart', async ({ productsPage, cartPage }) => {
  const expectedProducts: IProduct[] = await productsPage.inventoryItemComponent.addRandomItemsToCart();
  await productsPage.headerComponent.openCart();
  const actualProducts: IProduct[] = await cartPage.cartItemComponent.getProductsFromCart();
  expect(actualProducts).toEqual(expectedProducts);
});

test('Add random products to cart and checkout', async ({ productsPage, cartPage, checkoutPage }) => {
  const products: IProduct[] = await productsPage.inventoryItemComponent.addRandomItemsToCart();
  const expectedTotal: number = products.map((element) => Number(element.price.replace('$', '')))
    .reduce((total, price) => total + price);

  productsPage.headerComponent.openCart();
  await cartPage.clickCheckout();
  const actualTotal = await checkoutPage.checkout(user);
  expect(actualTotal).toEqual(expectedTotal);
  expect(await checkoutPage.resultHeader.innerText()).toEqual(confirmation.header);
  expect(await checkoutPage.resultMessage.innerText()).toEqual(confirmation.message);
});
