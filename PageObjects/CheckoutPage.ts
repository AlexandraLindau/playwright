import BasePage from "./BasePage";
import HeaderComponent from "./Components/HeaderComponent";
import { Page } from 'playwright-core';
import { Locator } from '@playwright/test';

class CheckoutPage extends BasePage {

    headerComponenet: HeaderComponent;
    checkoutButton: Locator;
    continueButton: Locator;
    finishButton: Locator;
    firstNameField: Locator;
    lastNameField: Locator;
    zipCodeField: Locator;
    subtotal: Locator;
    resultHeader: Locator;
    resultMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.headerComponenet = new HeaderComponent(page);
        this.checkoutButton = page.locator('#checkout');
        this.continueButton = page.locator('#continue');
        this.finishButton = page.locator('#finish');
        this.firstNameField = page.locator('#first-name');
        this.lastNameField = page.locator('#last-name');
        this.zipCodeField = page.locator('#postal-code');
        this.subtotal = page.locator('.summary_subtotal_label');
        this.resultHeader = page.locator('.complete-header');
        this.resultMessage = page.locator('.complete-text');
    }

    async clickCheckout(): Promise <void> {
        await this.checkoutButton.click();
    }

    async clickFinish(): Promise <void> {
        await this.finishButton.click();
    }

    async clickContinue(): Promise <void> {
        await this.continueButton.click();
    }

    async fillInCheckoutInfo({ firstName, lastName, zipCode }: { firstName: string, lastName: string, zipCode: string}): Promise <void> {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.zipCodeField.fill(zipCode);
    }

    async getSubtotalAmout(): Promise <number> {
        const total = await this.subtotal.innerText();
        return Number(total.replace('Item total: $', ''));
    }

}

export default CheckoutPage;