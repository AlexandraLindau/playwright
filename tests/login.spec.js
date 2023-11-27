import { test, expect } from '@playwright/test';
import LoginPage from '../PageObjects/LoginPage';
import ProductsPage from '../PageObjects/ProductsPage';
import { standardUser } from './data-provider';
import 'dotenv/config'

test.beforeEach(async ({ page }) => {
    await page.goto('');
});


test('Login as standard_user', async ({ page }) => {
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;
    const loginPage = new LoginPage(page);
    await loginPage.logIn(username, password);
    const productsPage = new ProductsPage(page);
    await expect(productsPage.headerComponent.title).toHaveText('Products');
    await expect(productsPage.headerComponent.shoppingCart).toBeVisible();

    const productsList = await productsPage.inventoryItemComponent.getProductsList();
    await expect(productsList.length).toBeGreaterThanOrEqual(2);
})