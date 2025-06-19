import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoqa.com/browser-windows');
  const page1Promise = page.waitForEvent('popup');
  //await page.waitForEvent('popup');
  await page.getByRole('button', { name: 'New Tab' }).click();
  const page1 = await page1Promise;
  const page2Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'New Window', exact: true }).click();
  const page2 = await page2Promise;
  await expect(page1).toHaveURL('https://demoqa.com/sample');
  //await expect(page1).toHaveTitle('demoqa.com/sample');
  const page3Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'New Window Message' }).click();
  const page3 = await page3Promise;
});