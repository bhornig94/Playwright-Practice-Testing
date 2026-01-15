import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
  readonly page: Page;
  readonly sortDropdown: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly productCO2: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortDropdown = page.locator('[data-test="sort"]');
    this.productNames = page.locator('[data-test="product-name"]');
    this.productPrices = page.locator('[data-test="product-price"]');
    this.productCO2 = page.locator('[data-test="product-co2_rating"]');
  }

  async sortBy(option: string) {
    await this.sortDropdown.selectOption(option);
    // Wait for the UI to update - networkidle is a safe bet for this specific site
    await this.page.waitForLoadState('networkidle');
  }

  async validateSort(locator: Locator, order: 'asc' | 'desc', type: 'string' | 'number') {
    const rawValues = await locator.allTextContents();
    
    // Clean data (remove $ or units)
    let uiValues = type === 'number' 
      ? rawValues.map(v => parseFloat(v.replace(/[^0-9.]/g, '')))
      : rawValues;

    // Create expected copy
    const expectedValues = [...uiValues].sort((a, b) => {
      if (type === 'string') {
        return order === 'asc' 
          ? (a as string).localeCompare(b as string) 
          : (b as string).localeCompare(a as string);
      }
      return order === 'asc' ? (a as number) - (b as number) : (b as number) - (a as number);
    });

    expect(uiValues).toEqual(expectedValues);
  }
}