import { test, expect } from '@playwright/test';

test('demoqa interaction test with assertions', async ({ page }) => {
  await page.goto('https://demoqa.com/droppable');

  // Go to Accept tab and drag Acceptable into the drop zone
  await page.getByRole('tab', { name: 'Accept' }).click();
  const acceptable = page.locator('#acceptable');
  const dropzone = page.locator('#droppable');

  // Perform drag and drop
  //await acceptable.dragTo(dropzone);

  // Assert the drop result
  //await expect(dropzone).toHaveText('Dropped!');

  // Switch to Prevent Propogation tab
  await page.getByRole('tab', { name: 'Prevent Propogation' }).click();
  await expect(page.locator('#notGreedyDropBox')).toBeVisible();

  // Switch to Revert Draggable tab and perform drag
  await page.getByRole('tab', { name: 'Revert Draggable' }).click();
  const willRevert = page.locator('#revertable');
  const revertDropZone = page.locator('#droppable');

  //await willRevert.dragTo(revertDropZone);
  //await expect(revertDropZone).toHaveText('Dropped!');

  // Alerts
  //await page.getByText('Alerts, Frame & Windows').click();
  //await page.getByText  ('AlertsAlerts, Frame & Windows').click();
  //await page.getByRole('listitem').filter({ hasText: 'Alerts' }).click();

  //page.once('dialog', dialog => {
    //expect(dialog.message()).toBe('You clicked a button');
    //dialog.dismiss();
  //});
  await page.locator('#alertButton').click();

  page.once('dialog', dialog => {
    expect(dialog.message()).toBe('Do you confirm action?');
    dialog.dismiss();
  });
  await page.locator('#confirmButton').click();

  // New Tab and Windows
  await page.getByRole('listitem').filter({ hasText: 'Browser Windows' }).click();

  const newTabPromise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'New Tab' }).click();
  const newTab = await newTabPromise;
  await expect(newTab).toHaveURL(/sample/);

  // Date Picker
  await page.getByText('Widgets').click();
  await page.getByText('Date Picker').click();
  await page.locator('#datePickerMonthYearInput').click();
  await page.getByRole('option', { name: /Choose .* June 11th/ }).click();
  await expect(page.locator('#datePickerMonthYearInput')).toHaveValue(/06\/11\/\d{4}/);

  // Date and Time Picker
  await page.locator('#dateAndTimePickerInput').click();
  await page.getByRole('option', { name: /Choose .* June 18th/ }).click();
  await page.getByText('20:00').click();
  //await expect(page.locator('#dateAndTimePickerInput')).toContainText('20:00');

  // Progress Bar
  await page.getByText('Progress Bar').click();
  await page.getByRole('button', { name: 'Start' }).click();
  await page.waitForTimeout(3000); // wait for progress bar to fill a bit
  await page.getByRole('button', { name: 'Stop' }).click();

  const progressValue = await page.locator('.progress-bar').getAttribute('aria-valuenow');
  expect(parseInt(progressValue || '0')).toBeGreaterThan(0);

  // Tool Tips
  await page.getByRole('listitem').filter({ hasText: 'Tool Tips' }).click();
  const tooltipTarget = page.getByRole('button', { name: 'Hover me to see' });
  await tooltipTarget.hover();
  await expect(page.locator('.tooltip-inner')).toBeVisible();
});
