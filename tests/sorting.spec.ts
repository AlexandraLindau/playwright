import { expect } from '@playwright/test';
import { test } from './fixture';
import 'dotenv/config'

test.beforeEach(async ({ page, loginPage }) => {
  await page.goto('');
  await loginPage.logIn(process.env.USERNAME as string, process.env.PASSWORD as string);
});


test('Sort items by price from low to high', async ({ productsPage }) => {
    const prices = await productsPage.inventoryItemComponent.getAllItemsPrice();
    const expectedPrices = sortPricesAscending(prices);
    await productsPage.selectSortingOption(productsPage.sortingOption.priceAsc);
    const actualPrices = await productsPage.inventoryItemComponent.getAllItemsPrice();
    expect(expectedPrices).toEqual(actualPrices);
});


function sortPricesAscending(prices: string[]) {
    const sortedPricesAscending: string[] = [];
    for (const element of prices) {
        sortedPricesAscending.push(element.replace('$', ''));
    }
    sortedPricesAscending.sort((a, b) => Number(a) - Number(b));
    for (let i = 0; i < sortedPricesAscending.length; i++) {
        sortedPricesAscending[i] = `$${sortedPricesAscending[i]}`;
    }
    return sortedPricesAscending;
}
