const { expect } = require('@playwright/test');

exports.loginPage = class loginPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getStartedLink = page.locator('a', { hasText: 'Get started' });
    this.gettingStartedHeader = page.locator('h1', { hasText: 'Installation' });
    this.pomLink = page.locator('li', { hasText: 'Guides' }).locator('a', { hasText: 'Page Object Model' });
    this.tocList = page.locator('article div.markdown ul > li > a');
  }

  async goto() {
    await this.page.goto('https://www.planarian.xyz/projects');
  }

  async clickAdvancedButton() {
    await page.click('button span:has-text("Advanced")');
  }

  async clickProjectByName() {
    await this.getStarted();
    await this.pomLink.click();
  }
}