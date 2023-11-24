import { test, expect } from '@playwright/test';
import LoginPage from '../PageObjects/LoginPage';
import ProductsPage from '../PageObjects/ProductsPage';
import { standardUser } from './data-provider';

test.beforeEach(async ({ page }) => {
    await page.goto('');
});


test('Login as standard_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.logIn(standardUser.username, standardUser.password);
    const productsPage = new ProductsPage(page);
    await expect(await productsPage.headerComponent.getTitle()).toHaveText('Products');
    await expect(await productsPage.headerComponent.getShoppingCart()).toBeVisible();

    const productsList = await productsPage.getProductsList();
    await expect(productsList.length).toBeGreaterThanOrEqual(2);
})