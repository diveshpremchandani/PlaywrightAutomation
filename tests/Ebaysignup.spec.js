import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.ebay.com/');
  await page.locator("a[_sp='m570.l2621']").click()
  //await page.locator('#businessName').fill('diveshpremchandani');
  //await page.locator('#businessEmail').fill('diveshpremchandani@gmail.com');
  await page.locator('#bizPassword').fill('Welcome@123');
  await page.locator('#businessCountry').selectOption('Canada');
  await page.locator('#bizOnlyToBuy').click();
});
