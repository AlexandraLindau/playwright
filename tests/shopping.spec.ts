import { expect } from '@playwright/test';
import { test } from './fixture';
import 'dotenv/config';
import IProduct from '../models/IProduct';
import { confirmation } from '../strings';
import { user } from '../test-data';

test.beforeEach(async ({ page, loginPage }) => {
  await page.goto('');
  await loginPage.logIn(process.env.USERNAME as string, process.env.PASSWORD as string);
});

test('Add product to cart', async ({ productsPage, cartPage }) => {
  let productOnProductsPage: IProduct;
  let productOnCartPage: IProduct;

  await test.step('Add first item to cart', async () => {
    productsPage.inventoryItemComponent.addItemToCartByIndex(0);
    const actualNumberOfItemsInCart = await productsPage.headerComponent.getShoppingCartBadgeCounter();
    expect(actualNumberOfItemsInCart).toEqual('1');
    productOnProductsPage = await productsPage.inventoryItemComponent.getProductDataByIndex(0);
  });

  await test.step('Open cart', async () => {
    productsPage.headerComponent.openCart();
    productOnCartPage = await cartPage.cartItemComponent.getProductDataByIndex(0);
    expect(productOnCartPage).toEqual(productOnProductsPage);
  });

  await test.step('Remove product from cart', async () => {
    await cartPage.cartItemComponent.removeProductByIndex(0);
    await expect(cartPage.headerComponenet.shoppingCartBadge).toBeHidden();
    await expect(cartPage.cartItemComponent.products).toBeHidden();
  });
});

test('Add random products to cart', async ({ productsPage, cartPage }) => {
  let expectedProducts: IProduct[];
  await test.step('Add random products to cart', async () => {
    expectedProducts = await productsPage.inventoryItemComponent.addRandomItemsToCart();
  });

  await test.step('Open cart and get products from in there', async () => {
    await productsPage.headerComponent.openCart();
    const actualProducts: IProduct[] = await cartPage.cartItemComponent.getProductsFromCart();
    expect(actualProducts).toEqual(expectedProducts);
  });
});

test('Add random products to cart and checkout', async ({ productsPage, cartPage, checkoutPage }) => {
  let products: IProduct[];
  let expectedTotal: number;

  await test.step('Add random products to cart and calculate expected total amount', async () => {
    products = await productsPage.inventoryItemComponent.addRandomItemsToCart();
    expectedTotal = products.map((element) => Number(element.price.replace('$', '')))
      .reduce((total, price) => total + price);
  });

  await test.step('Open cart', async () => {
    productsPage.headerComponent.openCart();
  });
  await test.step('Checkout goods', async () => {
    await cartPage.clickCheckout();
    await checkoutPage.fillInCheckoutInfo(user);
    await checkoutPage.clickContinue();
    const actualTotal = await checkoutPage.getSubtotalAmout();
    expect(actualTotal).toEqual(expectedTotal);
    await checkoutPage.clickFinish();
    expect(await checkoutPage.resultHeader.innerText()).toEqual(confirmation.header);
    expect(await checkoutPage.resultMessage.innerText()).toEqual(confirmation.message);
  });
});
