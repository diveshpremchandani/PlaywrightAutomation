import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.locator('path').first().click();
  await page.getByText('Text Box').click();

  await page.getByRole('textbox', { name: 'Full Name' }).fill('nathu godsay');
  await page.getByRole('textbox', { name: 'name@example.com' }).fill('nathu.godasy@ret.com');
  await page.getByRole('textbox', { name: 'Current Address' }).fill('aha avenue, extensio');
  await page.locator('#permanentAddress').fill('aha avenuw, extenion ');
  await page.getByRole('button', { name: 'Submit' }).click();
  
  // Assertions
  const nameOutput = await page.locator('#output #name');
  const emailOutput = await page.locator('#output #email');
  const currentAddressOutput = await page.locator('#output #currentAddress');
  const permanentAddressOutput = await page.locator('#output #permanentAddress');

  await expect(nameOutput).toHaveText('Name:nathu godsay');
  await expect(emailOutput).toHaveText('Email:nathu.godasy@ret.com');
  await expect(currentAddressOutput).toHaveText('Current Address :aha avenue, extensio');
  await expect(permanentAddressOutput).toHaveText('Permananet Address :aha avenuw, extenion');
});
