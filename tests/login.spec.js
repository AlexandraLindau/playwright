import { test, expect } from '@playwright/test';
import LoginPage from '../PageObjects/LoginPage';
import ProductsPage from '../PageObjects/ProductsPage';
import 'dotenv/config';

test.beforeEach(async ({ page }) => {
    await page.goto('');
});


test('Login as standard_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.logIn(process.env.USERNAME, process.env.PASSWORD);
    const productsPage = new ProductsPage(page);
    await expect(productsPage.headerComponent.title).toHaveText('Products');
    await expect(productsPage.headerComponent.shoppingCart).toBeVisible();

    const productsList = await productsPage.inventoryItemComponent.getProductsList();
    await expect(productsList.length).toBeGreaterThanOrEqual(2);
})