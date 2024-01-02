import { expect } from '@playwright/test';
import { test } from '../fixtures/fixture';
import 'dotenv/config';
import { _android as android } from 'playwright';

test.beforeAll(async ({ baseURL, browser }, testInfo) => {
  let context;

  if (testInfo.project.name === 'Mobile Chrome') {
    const [device] = await android.devices();
    await device.shell('am force-stop com.android.chrome');
    context = await device.launchBrowser();
  } else {
    context = await browser.newContext();
  }

  const page = await context.newPage();
  await page.goto(baseURL);

  testInfo.context = context;
  testInfo.page = page;
});

test('Login as standard_user', async ({ loginPage, productsPage }) => {
  await loginPage.logIn(process.env.USERNAME as string, process.env.PASSWORD as string);
  await expect(productsPage.headerComponent.title).toHaveText('Products');
  await expect(productsPage.headerComponent.shoppingCart).toBeVisible();

  const productsList = await productsPage.inventoryItemComponent.getProductsList();
  expect(productsList.length).toBeGreaterThanOrEqual(2);
});
