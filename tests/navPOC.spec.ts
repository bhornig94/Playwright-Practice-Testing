import { test, expect } from '@playwright/test';
import { NavigationPage } from '@pages/homenavbar.page';

test.describe("Home page navigation", () => {
  let nav;

  test.beforeEach(async ({ page , baseURL}) => {
    nav = new NavigationPage(page);
    await page.goto(baseURL);
  });

  const catTitles = [
  { name: "Hand Tools", slug: "hand-tools" },
  { name: "Power Tools", slug: "power-tools" },
  { name: "Other", slug: "other" },
  { name: "Special Tools", slug: "special-tools" },
  { name: "Rentals", slug: "rentals" }
];

// Loop OUTSIDE the test call
for (const title of catTitles) {
  test(`Navigation check for Category: ${title.name}`, async ({ page,baseURL }) => {
   
    

    await nav.openCategories();
    await nav.visibleCategory(title.name);
    await nav.clickCategory(title.name);

    const expectedPath = title.slug === "rentals" 
      ? `/${title.slug}` 
      : `/category/${title.slug}`;

    await expect(page).toHaveURL(`${baseURL}${expectedPath}`);
  });
}

const navLinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/" }, // Categories is a dropdown, URL stays the same
    { name: "Contact", path: "/contact" },
    { name: "Sign in", path: "/auth/login" }
  ];
for (const link of navLinks) {  
  test(`should navigate through all nav titles: ${link.name}`, async ({ page,baseURL }) => {
   

    await nav.visibleNavLink(link.name);
    await nav.clickNavLink(link.name);

    await expect(page).toHaveURL(`${baseURL}${link.path}`);
  });
}
});