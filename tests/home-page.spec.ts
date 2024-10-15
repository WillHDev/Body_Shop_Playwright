import { test, expect } from '@playwright/test';

test('Add product to cart', async ({ page }) => {
  await page.goto('https://weathershopper.pythonanywhere.com/');
  await page.getByText('Buy moisturizers').click();
  await page
  .locator(".text-center.col-4").nth(2)
  .locator('text=Add')
  .click(); 
  await page
  .locator(".text-center.col-4").nth(4)
  .locator('text=Add')
  .dblclick(); 
  await page.locator('text=Cart - ').click();          
  await page.getByRole('button', { name: 'Pay with Card' }).click();
 // await page.getByPlaceholder('Email').fill('johngalt@gmail.com');
 // await page.locator(`//button[@type='submit']//span[1]`).fill('johngalt@gmail.com');
 await page.frameLocator('iframe[name="stripe_checkout_app"]').getByPlaceholder('Email').fill('johngalt@gmail.com');
// await page.locator('input[type="email"]').fill('johngalt@gmail.com');
  await page.getByPlaceholder('Card number').fill('12345678987654');
  await page.getByPlaceholder('MM/YY').fill('08/28');
  await page.getByPlaceholder('CVC').fill('434');
  await page.getByRole('button', { name: /Pay INR/ }).click();
});
