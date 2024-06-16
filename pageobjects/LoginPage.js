class LoginPage {

    constructor(page) {
        this.page = page;
        this.submitButton = page.locator("[value='Login']");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }

    async validLogin(username,password) {
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.submitButton.click();
        await this.page.waitForLoadState('networkidle');
    }
    async goUrl(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

}
module.exports = {LoginPage};