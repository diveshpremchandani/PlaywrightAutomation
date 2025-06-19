import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.ebay.com/');
  await expect(page).toHaveTitle(/Electronics, Cars, Fashion/); // Assert homepage loaded

  const searchBox = page.getByRole('combobox', { name: 'Search for anything' });
  await expect(searchBox).toBeVisible();
  await searchBox.click();
  await searchBox.fill('books');

  const searchButton = page.getByRole('button', { name: 'Search', exact: true });
  await expect(searchButton).toBeEnabled();
  await searchButton.click();

  const auctionFilter = page.getByRole('link', { name: 'Auction', exact: true });
  await expect(auctionFilter).toBeVisible();
  await auctionFilter.click();

  //const page1Promise = page.waitForEvent('popup');
  //const bookLink = page.getByRole('link', { name: /HISTORY OF FRANCE.*Opens in a new window or tab/ });
  //await expect(bookLink).toBeVisible();
  //await bookLink.click();
  //const page1 = await page2Promise;
  //await expect(page1).toHaveURL(/itm/); // New item page

  const chapbookLink = page.getByRole('link', { name: /Chapbook\/Pamphlet/ });
  //await expect(chapbookLink).toBeVisible();
  await chapbookLink.click();

  await page.goto('https://www.ebay.com/sch/i.html?_nkw=books&_sacat=0&_from=R40&LH_Auction=1&rt=nc&Format=Box%2520Set%7CBath%2520Book&_dcat=261186');
  await expect(page).toHaveURL(/Bath%2520Book/); // Assert filtered URL

  const listingItem = page.getByRole('listitem').filter({ hasText: 'New Listing Exclusively.Four' });
 // await expect(listingItem).toHaveCount(1);
  await listingItem.click();

  const page2Promise = page.waitForEvent('popup');
  const shakespeareLink = page.getByRole('link', { name: /Shakespeare - The Complete Works.*Opens in a new window or tab/, exact: true });
  await expect(shakespeareLink).toBeVisible();
  await shakespeareLink.click();
  const page2 = await page2Promise;
  await expect(page2).toHaveURL(/itm/);

  const locationInfo = page.locator('#item2df66acf1e .s-item__location');
  if (await locationInfo.isVisible()) {
    await locationInfo.click();
  }

  const priceText = page.getByText('$14.95');
  await expect(priceText).toBeVisible();
  await priceText.click();

  //const page3Promise = page.waitForEvent('popup');
  //const chroniclesLink = page.getByRole('link', { name: 'New Listing The Chronicles of' });
  //await expect(chroniclesLink).toBeVisible();
  //await chroniclesLink.click();
  const page3 = await page3Promise;

  const page4Promise = page3.waitForEvent('popup');
  const sellerItemsLink = page3.getByTestId('x-sellercard-atf').getByRole('link', { name: "Seller's other items" });
  await expect(sellerItemsLink).toBeVisible();
  await sellerItemsLink.click();
  const page4 = await page4Promise;

  const visitProfileLink = page4.getByRole('link', { name: 'Visit profile' });
  await expect(visitProfileLink).toBeVisible();
  await visitProfileLink.click();

  // hCaptcha checkbox interaction (will likely fail in CI)
  try {
    const captchaFrame = page4.frameLocator('iframe[title="Widget containing checkbox for hCaptcha security challenge"]');
    const captchaCheckbox = captchaFrame.getByRole('checkbox');
    await expect(captchaCheckbox).toBeVisible();
    await captchaCheckbox.click();
  } catch (e) {
    console.warn('Skipping CAPTCHA due to iframe or visibility issues.');
  }

  const vintageButton = page.getByRole('button', { name: 'Vintage' });
  await expect(vintageButton).toBeVisible();
  await vintageButton.click();

  const vintageYesCheckbox = page.getByLabel('Yes');
  await expect(vintageYesCheckbox).toBeVisible();
  await vintageYesCheckbox.check();

  await page.goto('https://www.ebay.com/sch/i.html?_nkw=books&_sacat=0&_from=R40&LH_Auction=1&Format=Box%2520Set%7CBath%2520Book&rt=nc&Vintage=Yes&_dcat=261186');
  await expect(page).toHaveURL(/Vintage=Yes/);

  const categoryDropdown = page.getByLabel('Select a category for search');
  await expect(categoryDropdown).toBeVisible();
  await categoryDropdown.selectOption('12576');

  const finalSearchButton = page.getByRole('button', { name: 'Search', exact: true });
  await expect(finalSearchButton).toBeEnabled();
  await finalSearchButton.click();
});
