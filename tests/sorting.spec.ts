import { expect } from '@playwright/test';
import { test } from './fixture';
import 'dotenv/config';
import { SortingOption } from '../PageObjects/ProductsPage';
import { calculateExpectedSorting } from '../Helpers/sorting-helper';

test.beforeEach(async ({ page, loginPage }) => {
  await page.goto('');
  await loginPage.logIn(process.env.USERNAME as string, process.env.PASSWORD as string);
});

const sortings: SortingOption[] = [SortingOption.priceAsc, SortingOption.priceDesc, SortingOption.nameAsc,
  SortingOption.nameDesc];

sortings.forEach((sorting) => {
  test(`Sort items ${sorting}`, async ({ productsPage }) => {
    let expectedValues: string[];
    await test.step('Calculate expected sorting', async () => {
      const values: string[] = await productsPage.inventoryItemComponent.getValues(sorting);
      expectedValues = calculateExpectedSorting(values, sorting);
    });

    await test.step('Sort products by price from low to high', async () => {
      await productsPage.selectSortingOption(sorting);
      const actualValues: string[] = await productsPage.inventoryItemComponent.getValues(sorting);
      expect(expectedValues).toEqual(actualValues);
    });
  });
});
