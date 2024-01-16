import { expect } from '@playwright/test';
import { test } from '../fixtures/fixture';
import 'dotenv/config';

test('Login as standard_user', async ({ loginPage, productsPage }) => {
  await loginPage.logIn(process.env.USERNAME as string, process.env.PASSWORD as string);
  await expect(productsPage.headerComponent.title).toHaveText('Products');
  await expect(productsPage.headerComponent.shoppingCart).toBeVisible();

  const productsList = await productsPage.inventoryItemComponent.getProductsList();
  expect(productsList.length).toBeGreaterThanOrEqual(2);
});
