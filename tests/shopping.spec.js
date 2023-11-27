import { test, expect } from '@playwright/test';
import LoginPage from '../PageObjects/LoginPage';
import ProductsPage from '../PageObjects/ProductsPage';
import CartPage from '../PageObjects/CartPage';
import { standardUser } from './data-provider';

test.beforeEach(async ({ page }) => {
  await page.goto('');
  const loginPage = new LoginPage(page);
  await loginPage.logIn(standardUser.username, standardUser.password);
});


test('Add product to cart', async ({ page }) => {
  const productsPage = new ProductsPage(page);
  await productsPage.inventoryItemComponent.addItemToCartByIndex(1);
  const actualNumberOfItemsInCart = await productsPage.headerComponent.getShoppingCartBadgeCounter();
  await expect(actualNumberOfItemsInCart).toEqual('1');

  const productOnProductsPage = await productsPage.inventoryItemComponent.getProductByIndex(1);
  await productsPage.headerComponent.openCart();
  const cartPage = new CartPage(page);
  const productOnCartPage = await cartPage.cartItemComponent.getProductByIndex(1);

  await expect(productOnCartPage).toEqual(productOnProductsPage);

  cartPage.cartItemComponent.removeProductByIndex(1);
  await expect(cartPage.headerComponenet.shoppingCartBadge).toBeHidden();
  await expect(cartPage.cartItemComponent.products).toBeHidden();
})