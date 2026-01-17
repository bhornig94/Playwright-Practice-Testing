import { test, expect } from '@playwright/test';
import { RegistrationPage } from '@pages/RegistrationPage';
import { createUserRegistrationData } from '@data/userFactory';

test('should register a new customer with valid data', async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  const userData = createUserRegistrationData();

  await page.goto('https://practicesoftwaretesting.com/auth/register'); // Replace with your URL

  // Fill the form using the factory data
    await registrationPage.fillForm(userData);
  
    // Assert password strength (optional check based on UI)
    //await expect(page.getByText('Excellent')).toBeVisible();
  
    await registrationPage.registerButton.click();
  });