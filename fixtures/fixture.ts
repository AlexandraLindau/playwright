import { test as base } from '@playwright/test';
import { _android as android } from 'playwright';
import LoginPage from '../PageObjects/LoginPage';
import ProductsPage from '../PageObjects/ProductsPage';
import CartPage from '../PageObjects/CartPage';
// eslint-disable-next-line import/no-cycle
import { CheckoutPage } from '../PageObjects/CheckoutPage';
import 'dotenv/config';

type Fixtures = {
  loginPage: LoginPage;
  productsPage: ProductsPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend <Fixtures>({
  page: async ({ baseURL, page }, use, testInfo) => {
    if (testInfo.project.name === 'Mobile Chrome') {
      const [device] = await android.devices();
      await device.shell('am force-stop com.android.chrome');
      const context = await device.launchBrowser();
      // eslint-disable-next-line no-param-reassign
      page = await context.newPage();
    }
    await page.goto(baseURL);
    await use(page);
  },

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
