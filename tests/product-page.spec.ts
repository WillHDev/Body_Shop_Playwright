import { test, expect } from '@playwright/test';

test.describe('Cart', () => {
  test('Add product to cart and checkout', async ({ page }) => {
    await page.goto('https://weathershopper.pythonanywhere.com/');
    await page.getByText('Buy moisturizers').click();
    await page.locator(".text-center.col-4").nth(2)
                .locator('text=Add')
                  .click(); 
    await page.locator(".text-center.col-4").nth(4)
                  .locator('text=Add')
                    .dblclick(); 
    await page.locator('text=Cart - ').click();          
    await page.getByRole('button', { name: 'Pay with Card' }).click();
    const iframe = await page.frameLocator('iframe[name="stripe_checkout_app"]')
    await iframe.getByPlaceholder('Email').fill('johngalt@gmail.com');;
    await iframe.getByPlaceholder('Card number').fill('4242424242424242');
    await iframe.getByPlaceholder('MM / YY').fill('08/28');
    await iframe.getByPlaceholder('CVC').fill('434');
    await iframe.getByRole('button', { name: /Pay/ }).click();
    await expect(page.getByRole( 'heading', { name: "PAYMENT SUCCESS"})).toBeVisible();
  });
});
