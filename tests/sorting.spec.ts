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
  let expectedPrices: string[];
  await test.step('Calculate expected sorting', async () => {
    const prices = await productsPage.inventoryItemComponent.getAllItemsPrice();
    expectedPrices = sortPricesAscending(prices);
  });

  await test.step('Sort products by price from low to high', async () => {
    await productsPage.selectSortingOption(SortingOption.priceAsc);
    const actualPrices = await productsPage.inventoryItemComponent.getAllItemsPrice();
    expect(expectedPrices).toEqual(actualPrices);
  });
});
