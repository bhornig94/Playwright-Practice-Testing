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
  test('navagate sort dropdown', async ({ page }) => {
 
  const productLinks = page.locator('[data-test="product-name"]');
  const count = await productLinks.count();
  for (let i = 0; i < count; i++) {
  await expect(productLinks.nth(i)).toBeVisible();
}
});
test('Verify items are sorted by name ascending', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');

  // 1. Select the sort option
  await page.locator('[data-test="sort"]').selectOption('name,asc');
  
  // 2. Wait for network/UI to settle (important for dynamic lists)
  await page.waitForLoadState('networkidle');

  // 3. Map the product names into an array
  const productNames = await page.locator('[data-test="product-name"]').allTextContents();

  // 4. Create an expected sorted version of that array
  const expectedOrder = [...productNames].sort((a, b) => a.localeCompare(b));

  // 5. Assert they match
  expect(productNames).toEqual(expectedOrder);
});
test('Verify items are sorted by name descending', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');

  // 1. Select the sort option
  await page.locator('[data-test="sort"]').selectOption('name,desc');
  
  // 2. Wait for network/UI to settle (important for dynamic lists)
  await page.waitForLoadState('networkidle');

  // 3. Map the product names into an array
  const productNames = await page.locator('[data-test="product-name"]').allTextContents();

  // 4. Create an expected sorted version of that array
  const expectedOrder = [...productNames].sort((a, b) => a.localeCompare(b)).reverse();

  // 5. Assert they match
  expect(productNames).toEqual(expectedOrder);
});
test('Verify items are sorted by price descending', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.locator('[data-test="sort"]').selectOption('price,desc');

  // Get all price strings and convert to numbers
  const priceStrings = await page.locator('[data-test="product-price"]').allTextContents();
  const prices = priceStrings.map(p => parseFloat(p.replace('$', '')));

  const expectedOrder = [...prices].sort((a, b) => b - a); // Numerical Descending
  expect(prices).toEqual(expectedOrder);
});
test('Verify items are sorted by price ascending', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.locator('[data-test="sort"]').selectOption('price,asc'); 
  // Get all price strings and convert to numbers
  const priceStrings = await page.locator('[data-test="product-price"]').allTextContents();
  const prices = priceStrings.map(p => parseFloat(p.replace('$', '')));

  const expectedOrder = [...prices].sort((a, b) => a - b); // Numerical Ascending
  expect(prices).toEqual(expectedOrder);
});
test('Verify items are sorted by CO2 rating ascending', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.locator('[data-test="sort"]').selectOption('co2_rating,asc'); 
  // Get all CO2 rating strings and convert to numbers
  const co2Strings = await page.locator('[data-test="product-co2"]').allTextContents();
  const co2Ratings = co2Strings.map(c => parseFloat(c.replace('kg CO2', '')));  

  const expectedOrder = [...co2Ratings].sort((a, b) => a - b); // Numerical Ascending
  expect(co2Ratings).toEqual(expectedOrder);    
});
test('Verify items are sorted by CO2 rating descending', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/');
  await page.locator('[data-test="sort"]').selectOption('co2_rating,desc'); 
  // Get all CO2 rating strings and convert to numbers
  const co2Strings = await page.locator('[data-test="product-co2"]').allTextContents();
  const co2Ratings = co2Strings.map(c => parseFloat(c.replace('kg CO2', '')));    

  const expectedOrder = [...co2Ratings].sort((a, b) => b - a); // Numerical Descending
  expect(co2Ratings).toEqual(expectedOrder);
});
 });