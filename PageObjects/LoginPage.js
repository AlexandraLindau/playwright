import BasePage from './BasePage.js';

class LoginPage extends BasePage {
    constructor(page) {
        super();
        this.page = page;
        this.endpoint = '';
        this.usernameField = 'Username';
        this.passwordField = 'Password';
        this.loginButton = '[data-test="login-button"]';
    }

    async logIn(username, password) {
        await this.page.getByPlaceholder(this.usernameField).fill(username);
        await this.page.getByPlaceholder(this.passwordField).fill(password);
        await this.page.locator(this.loginButton).click();
    }
}

export default LoginPage;