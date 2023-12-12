import { Page } from '@playwright/test';

class BasePage {
  baseURL: string;

  endpoint: string;

  page: Page;

  constructor(page: Page) {
    this.page = page;
    this.endpoint = '';
  }
}

export default BasePage;
