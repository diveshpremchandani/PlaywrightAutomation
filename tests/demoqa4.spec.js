    import { test, expect } from '@playwright/test';

    test('test', async ({ page }) => {
    await page.goto('https://demoqa.com/select-menu');
    await page.locator("//div[@id='withOptGroup']//div[contains(@class,'css-tlfecz-indicatorContainer')]").click();
    await page.locator("#react-select-2-option-0-1").click();
    await page.locator("#oldSelectMenu").selectOption('White');
    //await expect(page.locator("#oldSelectMenu")).toHaveText('White');
    await expect(page.locator('#oldSelectMenu >> option:checked')).toHaveText('White');

    });