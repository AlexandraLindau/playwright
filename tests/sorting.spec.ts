import { expect } from '@playwright/test';
import { test } from './fixture';
import 'dotenv/config';
import { SortingOption } from '../PageObjects/ProductsPage';

function sortPricesAscending(prices: string[]) {
  return prices.map((element) => Number(element.replace('$', ''))).sort((a, b) => a - b).map((element) => `$${element}`);
}

test.beforeEach(async ({ page, loginPage }) => {
  await page.goto('');
  await loginPage.logIn(process.env.USERNAME as string, process.env.PASSWORD as string);
});

test('Sort items by price from low to high', async ({ productsPage }) => {
  const prices = await productsPage.inventoryItemComponent.getAllItemsPrice();
  const expectedPrices = sortPricesAscending(prices);
  await productsPage.selectSortingOption(SortingOption.priceAsc);
  const actualPrices = await productsPage.inventoryItemComponent.getAllItemsPrice();
  expect(expectedPrices).toEqual(actualPrices);
});
