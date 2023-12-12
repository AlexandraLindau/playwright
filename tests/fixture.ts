import { test as base } from '@playwright/test';
import LoginPage from '../PageObjects/LoginPage';
import ProductsPage from '../PageObjects/ProductsPage';
import CartPage from '../PageObjects/CartPage';
import CheckoutPage from '../PageObjects/CheckoutPage';

type Fixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend <Fixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
});
