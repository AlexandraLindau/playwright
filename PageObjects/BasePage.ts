import { Page } from 'playwright-core';

class BasePage {
    baseURL: string;
    endpoint: string;
    page: Page;
    constructor(page: Page) {
        this.page = page;
        this.baseURL = 'https://www.saucedemo.com/';
        this.endpoint = '';
    }
}

export default BasePage;