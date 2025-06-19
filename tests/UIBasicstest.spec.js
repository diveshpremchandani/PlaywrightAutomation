import { test, expect } from '@playwright/test';

test('First test', async ({ page }) =>
    
{
    //const context = await browser.newContext();
    //const page = await context.newPage();
    await page.goto('https://www.ebay.com/');
    await page.locator(".gh-flyout__target[tabindex=\"3\"]").click();
    await page.locator('a:has-text("Restaurant & Food Service")').click();
    //const expurl = page.url();
    await expect(page).toHaveURL(/.*Restaurant-Food-Service.*/);
    await expect(page).toHaveTitle("Restaurant & Food Service | eBay");
    
    //write playwright code inside this function

});
