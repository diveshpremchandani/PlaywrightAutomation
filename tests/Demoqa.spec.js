import { test, expect } from '@playwright/test';
import { only } from 'node:test';

test('test', async ({ page }) => {
  await page.goto('https://demoqa.com/elements');
  await page.getByText('Upload and Download').click();

  const uploadButton = page.getByRole('button', { name: 'Select a file' });
  await expect(uploadButton).toBeVisible();

  await uploadButton.click();
  //await uploadButton.setInputFiles('C:\\Users\\ShivaliGaba\\OneDrive - IBM\\Desktop\\PlaywrightAutomation\\Code of conduct (3).pdf');

  //const fileInput = await page.locator('input[type="file"]');
  //const files = await fileInput.evaluate(node => node.files.length);
  expect(files).toBeGreaterThan(0);

  const downloadPromise = page.waitForEvent('download');
 await page.getByRole('link', { name: 'Download' }).click();
  
  const download = await downloadPromise;

  const path = await download.path();
  expect(path).not.toBeNull();

  const suggestedFilename = download.suggestedFilename();
  expect(suggestedFilename).toContain('sampleFile'); // Adjust as needed
});
