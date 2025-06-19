import { test, expect } from '@playwright/test';

test('test pan card verification page', async ({ page }) => {
  // Navigate to home page
  await page.goto('https://authbridge.com/checks/pan-card-verification/');
  expect(page).toHaveURL('https://authbridge.com/checks/pan-card-verification/');
  //expect(await page.screenshot()).toMatchSnapshot('screenshot.png4');

  page.getByLabel('business').click;
  await page.getByPlaceholder('Full Name').fill('diveshpremchandani');
  await page.screenshot({ path: 'screenshot1.png' });
  await page.getByPlaceholder('Contact Number').fill('8678976890');
  await page.getByPlaceholder('Contact Number').screenshot({ path: 'screenshot2.png' });
  await page.locator('#form-field-how_can_help').selectOption('KYC');
 // await page.getByLabel("I consent to receive Authbridge's marketing communications").click();
  await page.locator("#campaign_email").click();
  //await page.getByRole('button', { name: 'Submit' }).click();
  await page.locator("#talk_button").click();
});

// Separate test block for privacy page verification
test('privacy page verification ', async ({ page }) => {
  //await page.getByRole("link", { name: "privacy policy" }).click();
  await page.goto('https://authbridge.com/checks/pan-card-verification/');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'privacy policy', exact: true }).click();
  const page1 = await page1Promise;
  //await page.pause();
  
  //await page1.waitForURL('https://authbridge.com/privacy-policy/');
  await expect(page1).toHaveURL('https://authbridge.com/privacy-policy/');
  await page.bringToFront();
  //await page.locator("//a[normalize-space()='privacy policy']").click();  

  await expect(page).toHaveURL('https://authbridge.com/checks/pan-card-verification/');
  await page.locator(".nav-item.language.dropdown").hover();
  await page.locator("a[href='https://authbridge.us']").click();
  await expect(page).toHaveURL('https://authbridge.us/');
  await expect(page).toHaveTitle('Home - Authbridge US');
});