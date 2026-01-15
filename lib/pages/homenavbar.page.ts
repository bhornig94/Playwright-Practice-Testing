import { type Locator, type Page, expect } from "@playwright/test";

/**
 * Page Object Model for the Header Navigation Bar.
 * Handles interactions for main menu links and the category dropdown system.
 */
export class NavigationPage {
  readonly page: Page;
  readonly navLinks: Locator;
  readonly categoriesDropdown: Locator;
  readonly dropLinks: Locator;
  readonly homeLink: Locator;

  /**
   * @param page - The Playwright Page instance passed from the test context.
   */
  constructor(page: Page) {
    this.page = page;
    // General locator for all top-level navigation links
    this.navLinks = page.locator('a.nav-link');
    // Targeted locator for the Categories dropdown trigger using custom data attributes
    this.categoriesDropdown = page.locator('[data-test="nav-categories"]');
    // General locator for items nested within a dropdown menu
    this.dropLinks = page.locator('a.dropdown-item');
    // Specific reference to the first nav-link, typically used to reset the view
    this.homeLink = page.locator('a.nav-link').nth(0);
  }

  /**
   * Opens the Categories dropdown menu to reveal sub-items.
   */
  async openCategories() {
    await this.categoriesDropdown.click();
  }

  /**
   * Dynamically locates and clicks a main navigation link based on its text content.
   * @param name - The visible text of the link (e.g., "Contact", "Sign in").
   */
  async clickNavLink(name: string) {
    await this.page.locator('a.nav-link', { hasText: name }).click();
  } 

  /**
   * Dynamically locates and clicks a category item within an open dropdown.
   * @param name - The visible text of the category (e.g., "Hand Tools").
   */
  async clickCategory(name: string) {
    await this.page.locator('a.dropdown-item', { hasText: name }).click();
  }

  /**
   * Simple helper to navigate back to the home view via the navbar.
   */
  async goHome() {
    await this.homeLink.click();
  }

  /**
   * Assertion helper to verify a specific category is present and visible.
   * @param name - The visible text to check.
   */
  async visibleCategory(name: string) {
    await expect(this.page.locator('a.dropdown-item', { hasText: name })).toBeVisible();
  }

  /**
   * Assertion helper to verify a main navigation link is present and visible.
   * @param name - The visible text to check.
   */
  async visibleNavLink(name: string) {
    await expect(this.page.locator('a.nav-link', { hasText: name })).toBeVisible();
  }
}