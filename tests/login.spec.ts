import { expect } from '@playwright/test';
import { test } from './fixture';
import 'dotenv/config';

test.beforeEach(async ({ page }) => {
  await page.goto('');
});

test('Login as standard_user', async ({ loginPage, productsPage }) => {
  await test.step('Log in', async () => {
    await loginPage.logIn(process.env.USERNAME as string, process.env.PASSWORD as string);
    await expect(productsPage.headerComponent.title).toHaveText('Products');
    await expect(productsPage.headerComponent.shoppingCart).toBeVisible();
  });

  await test.step('Assert Products page has at least 2 items', async () => {
    const productsList = await productsPage.inventoryItemComponent.getProductsList();
    expect(productsList.length).toBeGreaterThanOrEqual(2);
  });
});
