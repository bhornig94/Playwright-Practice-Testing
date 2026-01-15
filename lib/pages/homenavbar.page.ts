import { type Locator, type Page, expect } from "@playwright/test";

export class NavigationPage {
  readonly page: Page;
  readonly navLinks: Locator;
  readonly categoriesDropdown: Locator;
  readonly dropLinks: Locator;
  readonly homeLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navLinks = page.locator('a.nav-link');
    this.categoriesDropdown = page.locator('[data-test="nav-categories"]');
    this.dropLinks = page.locator('a.dropdown-item');
    this.homeLink = page.locator('a.nav-link').nth(0);
  }

  async openCategories() {
    await this.categoriesDropdown.click();
  }

  async clickNavLink(name: string) {
    await this.page.locator('a.nav-link', { hasText: name }).click();
  } 

  async clickCategory(name: string) {
    await this.page.locator('a.dropdown-item', { hasText: name }).click();
  }

  async goHome() {
    await this.homeLink.click();
  }

  async visibleCategory(name: string) {
    await expect(this.page.locator('a.dropdown-item', { hasText: name })).toBeVisible();
  }

  async visibleNavLink(name: string) {
    await expect(this.page.locator('a.nav-link', { hasText: name })).toBeVisible();
  }
}