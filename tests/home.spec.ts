 import { test, expect } from '@playwright/test';

 test.describe("Home page ", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });
  test('should have the correct title', async ({ page }) => {
    await expect(page).toHaveTitle("Practice Software Testing - Toolshop - v5.0");
  });
  test("image banner", async ({ page }) => {
    const banner = page.locator('img.img-fluid');
    await expect(banner).toBeVisible();
  });
  test("header linkSync", async ({ page }) => {
    const catTitles= ["Hand Tools","Power Tools","Other","Special Tools","Rentals"];
    const dropLinks = page.locator('a.dropdown-item');
    const navLinks= page.locator('a.nav-link');
    const navTitles= ["Home","Categories","Contact","Sign in"];
    for (let i = 0; i < navTitles.length; i++){
      await expect(navLinks.nth(i)).toHaveText(navTitles[i]);
      await expect(navLinks.nth(i)).toBeVisible();
      if (navTitles[i] !=="Categories") {
        await navLinks.nth(i).click();
        await page.locator('a.nav-link').nth(0).click();
      }
    }
    await page.locator('[data-test="nav-categories"]').click();
    for (let i = 0; i < catTitles.length; i++){
      await expect(dropLinks.nth(i)).toHaveText(catTitles[i]);
      await expect(dropLinks.nth(i)).toBeVisible();
       await dropLinks.nth(i).click();
      await page.locator('a.nav-link').nth(0).click()
      await page.locator('[data-test="nav-categories"]').click();
    }
  });
 });