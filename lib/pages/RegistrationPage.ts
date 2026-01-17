import { Page, Locator } from '@playwright/test';
import { createUserRegistrationData } from '@data/userFactory';
import { da } from '@faker-js/faker/.';
export class RegistrationPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly dobInput: Locator;
  readonly streetInput: Locator;
  readonly postalCodeInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly countryDropdown: Locator;
  readonly phoneInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First name *');
    this.lastNameInput = page.getByPlaceholder('Your last name *');
    this.dobInput = page.getByPlaceholder('YYYY-MM-DD');
    this.streetInput = page.getByPlaceholder('Your Street *');
    this.postalCodeInput = page.getByPlaceholder('Your Postcode *');
    this.cityInput = page.getByPlaceholder('Your City *');
    this.stateInput = page.getByPlaceholder('Your State *');
    this.countryDropdown = page.locator('select, [role="combobox"]'); // Adjust based on actual HTML
    this.phoneInput = page.getByPlaceholder('Your phone *');
    this.emailInput = page.getByPlaceholder('Your email *');
    this.passwordInput = page.getByPlaceholder('Your password');
    this.registerButton = page.getByRole('button', { name: 'Register' });
  }

  async fillForm(data: ReturnType<typeof createUserRegistrationData>) {
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.dobInput.fill(data.dob);
    await this.streetInput.fill(data.street);
    await this.postalCodeInput.fill(data.postalCode);
    await this.cityInput.fill(data.city);
    await this.stateInput.fill(data.state);
    await this.phoneInput.fill(data.phone);
    await this.emailInput.fill(data.email);
    await this.passwordInput.fill(data.password);
  }
}