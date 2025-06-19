import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://authbridge.com/');

  // ✅ Correct usage of .hover()
  await page.locator("//a[normalize-space()='API Suite']").hover();

  // ✅ Clicking on "PAN Card Verification"
  await page.locator("//div[contains(text(),'PAN Card Verification')]").click();

  // Optional: Verify navigation
  await expect(page).toHaveURL('https://authbridge.com/checks/pan-card-verification/');
  await expect(page).toHaveTitle('PAN Card Verification API | PAN Card Verification - AuthBridge'); // Assumes the title contains 'PAN Card Verification'
    await expect(page.locator('h1')).toHaveText('PAN Card Verification API');
    //await expect(page.locator('p')).toContainText('PAN Card Verification API is a service that allows you to verify the authenticity of PAN cards in India. It helps businesses and individuals ensure that the PAN card details provided by users are valid and match the official records.');
    //await expect(page.locator('h2')).toHaveText('Key Features');
    await page.locator("//div[@class='elementor-element elementor-element-4ac33731 elementor-widget elementor-widget-heading']//h4[@class='elementor-heading-title elementor-size-default'][normalize-space()='Read more >>']").click()
    await expect(page).toHaveURL('https://authbridge.com/blog/voter-id-verification-for-user-onboarding/');
    await page.goBack();
    await expect(page).toHaveURL('https://authbridge.com/checks/pan-card-verification/');
    

}); 
