import { test, expect } from '@playwright/test';

test('eBay Restaurant Equipment Navigation Test', async ({ page }) => {
  await page.goto('https://www.ebay.com/');
  await expect(page).toHaveURL('https://www.ebay.com/');

  // Click 'Shop by category'
  const shopByCategory = page.getByRole('button', { name: 'Shop by category' });
  await expect(shopByCategory).toBeVisible();
  await shopByCategory.click();

  // Click 'Restaurant & Food Service'
  const restaurantLink = page.getByRole('link', { name: 'Restaurant & Food Service' });
  await expect(restaurantLink).toBeVisible();
  await restaurantLink.click();

  // Click on the item priced at $275.80
  const priceItem = page.getByText('$275.80', { exact: true });
  //await expect(priceItem).toBeVisible();
  await priceItem.click();

  // Click on the specific item link
  const productLink = page.getByRole('link', {
    name: 'Built-in Commercial Ice Maker Stainless Steel Bar Restaurant Ice Cube Machine',
    exact: true
  });
  await expect(productLink).toBeVisible();
  await productLink.click();

  // Click on description tab
  const descriptionToggle = page.getByTestId('x-item-description').getByTestId('ux-action');
  await expect(descriptionToggle).toBeVisible();
  await descriptionToggle.click();

  // Optionally, assert product title is on page
  //const productTitle = page.getByText('Built-in Commercial Ice Maker', { exact: false });
  //await expect(productTitle).toBeVisible();
});
