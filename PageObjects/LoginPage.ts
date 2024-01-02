import { Locator, Page } from '@playwright/test';
import BasePage from './BasePage.js';
import { step } from './Decorators/step-decorator.js';

class LoginPage extends BasePage {
  usernameField: Locator;

  passwordField: Locator;

  loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.endpoint = '';
    this.usernameField = this.page.getByPlaceholder('Username');
    this.passwordField = this.page.getByPlaceholder('Password');
    this.loginButton = this.page.locator('[data-test="login-button"]');
  }

  @step
  async logIn(username: string, password: string): Promise <void> {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }
}

export default LoginPage;
