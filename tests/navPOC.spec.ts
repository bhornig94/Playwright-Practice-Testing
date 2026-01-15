import { test, expect } from '@playwright/test';
import { NavigationPage } from '@pages/homenavbar.page';
import { ProductPage } from '@pages/ProductPage'; 

/**
 * Suite: Home page navigation
 * This suite covers category filtering, navbar links, and product list sorting logic.
 */
test.describe("Home page navigation", () => {
  // Page Object declarations for modularity and reuse
  let nav: NavigationPage;
  let productPage: ProductPage;

  // Initialize Page Objects and navigate to the base URL before each test case
  test.beforeEach(async ({ page, baseURL }) => {
    productPage = new ProductPage(page);
    nav = new NavigationPage(page);
    // baseURL is retrieved from the playwright.config.ts file
    await page.goto(baseURL as string);
  });

  /**
   * DATA-DRIVEN CATEGORY TESTS
   * Iterates through category metadata to verify sidebar/menu navigation.
   */
  const catTitles = [
    { name: "Hand Tools", slug: "hand-tools" },
    { name: "Power Tools", slug: "power-tools" },
    { name: "Other", slug: "other" },
    { name: "Special Tools", slug: "special-tools" },
    { name: "Rentals", slug: "rentals" }
  ];

  for (const title of catTitles) {
    test(`Navigation check for Category: ${title.name}`, async ({ page, baseURL }) => {
      // Interactions via NavigationPage Object
      await nav.openCategories();
      await nav.visibleCategory(title.name);
      await nav.clickCategory(title.name);

      // Logical check: Rentals has a top-level path, others are nested under /category/
      const expectedPath = title.slug === "rentals" 
        ? `/${title.slug}` 
        : `/category/${title.slug}`;

      // Final URL validation
      await expect(page).toHaveURL(`${baseURL}${expectedPath}`);
    });
  }

  /**
   * DATA-DRIVEN NAVBAR TESTS
   * Verifies visibility and clickability of the main header navigation links.
   */
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/" }, // Dropdown doesn't change path until an item is picked
    { name: "Contact", path: "/contact" },
    { name: "Sign in", path: "/auth/login" }
  ];

  for (const link of navLinks) {  
    test(`should navigate through all nav titles: ${link.name}`, async ({ page, baseURL }) => {
      await nav.visibleNavLink(link.name);
      await nav.clickNavLink(link.name);

      await expect(page).toHaveURL(`${baseURL}${link.path}`);
    });
  }

  /**
   * PRODUCT SORTING TESTS
   * These tests utilize the ProductPage Object to select a sort option
   * and validate the order of displayed items (Strings vs. Numbers).
   */

  test('should sort products by name ascending', async () => {
    await productPage.sortBy('name,asc');
    // validateSort handles array mapping and order comparison
    await productPage.validateSort(productPage.productNames, 'asc', 'string');
  });

  test('should sort products by name descending', async () => {
    await productPage.sortBy('name,desc');
    await productPage.validateSort(productPage.productNames, 'desc', 'string');
  });

  test('should sort products by price ascending', async () => {
    await productPage.sortBy('price,asc');
    // 'number' type ensures data is cleaned (removing currency symbols) before sorting
    await productPage.validateSort(productPage.productPrices, 'asc', 'number');
  });

  test('should sort products by price descending', async () => {
    await productPage.sortBy('price,desc');
    await productPage.validateSort(productPage.productPrices, 'desc', 'number');
  });   

  test('should sort products by CO2 rating ascending', async () => {
    await productPage.sortBy('co2_rating,asc');
    // productCO2 targets the specific data-test for carbon footprint
    await productPage.validateSort(productPage.productCO2, 'asc', 'number');
  });

  test('should sort products by CO2 rating descending', async () => {
    await productPage.sortBy('co2_rating,desc');
    await productPage.validateSort(productPage.productCO2, 'desc', 'number');
  });
});