import { test, expect } from '@playwright/test';
import LoginPage from '../PageObjects/LoginPage';
import ProductsPage from '../PageObjects/ProductsPage';
import CartPage from '../PageObjects/CartPage';
import 'dotenv/config'

test.beforeEach(async ({ page }) => {
  await page.goto('');
  const loginPage = new LoginPage(page);
  await loginPage.logIn(process.env.USERNAME, process.env.PASSWORD);
});


test('Add product to cart', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.inventoryItemComponent.addItemToCartByIndex(0);
  const actualNumberOfItemsInCart = await productsPage.headerComponent.getShoppingCartBadgeCounter();
  expect(actualNumberOfItemsInCart).toEqual('1');

  const productOnProductsPage = await productsPage.inventoryItemComponent.getProductByIndex(0);
  await productsPage.headerComponent.openCart();
  const cartPage = new CartPage(page);
  const productOnCartPage = await cartPage.cartItemComponent.getProductByIndex(0);

  expect(productOnCartPage).toEqual(productOnProductsPage);

  cartPage.cartItemComponent.removeProductByIndex(0);
  await expect(cartPage.headerComponenet.shoppingCartBadge).toBeHidden();
  await expect(cartPage.cartItemComponent.products).toBeHidden();
})