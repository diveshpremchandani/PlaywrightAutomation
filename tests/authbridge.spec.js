import { test, expect } from '@playwright/test';

test('test navigation and link clicks', async ({ page }) => {
  // Navigate to home page
  await page.goto('https://authbridge.com/');
  await expect(page).toHaveURL('https://authbridge.com/');
  await expect(page).toHaveTitle(/AuthBridge/i); // Assumes the title contains 'AuthBridge'

  // Click on 'white caller verification' link
  const whiteCallerLink = page.getByRole('link', { name: 'White-collar Verification' });
  await expect(whiteCallerLink).toBeVisible();
  await whiteCallerLink.click();

  // Optionally assert URL or page content if it navigates
  //await expect(page).not.toHaveURL('https://authbridge.com/'); // Ensures navigation happened

  // Click on the logo to go back to the homepage
  const logoLink = page.getByRole('link', { name: 'AuthBridge-logo' });
  await expect(logoLink).toBeVisible();
  await logoLink.click();
  await expect(page).toHaveURL('https://authbridge.com/');

  // Click on 'blue collar verification Blue'
  const blueCollarLink = page.getByRole('link', { name: 'Blue-collar Verification' });
  await expect(blueCollarLink).toBeVisible();
  await blueCollarLink.click();

  // Optionally check that the URL/content changed again
  await expect(page).not.toHaveURL('https://authbridge.com/');

  // Finally, go back to the homepage
  await page.goto('https://authbridge.com/');
  await expect(page).toHaveURL('https://authbridge.com/');
});
