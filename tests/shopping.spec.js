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
  await productsPage.inventoryItemComponent.addItemToCartByIndex(1);
  const actualNumberOfItemsInCart = await productsPage.headerComponent.getShoppingCartBadgeCounter();
  expect(actualNumberOfItemsInCart).toEqual('1');
  await productsPage.headerComponent.openCart();

  const nth = async () => (await page.locator('.cart_item')).nth(1);
  // const all = page.locator('(//div[@class="cart_item"])').nth(1).locator('.inventory_item_name'); inventory_item_name
  const all2 = async () => (await nth()).locator('.inventory_item_name');


  // const allInnerText = await all.innerText();
  const all2InnerText = await (await all2()).textContent();

  const productOnProductsPage = await productsPage.inventoryItemComponent.getProductByIndex(1);
 
  const cartPage = new CartPage(page);
  const productOnCartPage = await cartPage.cartItemComponent.getProductByIndex(1);

  expect(productOnCartPage).toEqual(productOnProductsPage);

  cartPage.cartItemComponent.removeProductByIndex(1);
  await expect(cartPage.headerComponenet.shoppingCartBadge).toBeHidden();
  await expect(cartPage.cartItemComponent.products).toBeHidden();
})