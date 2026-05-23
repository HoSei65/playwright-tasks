import { test, expect } from '@playwright/test';

test('fill form and make order', async ({ page }) => {
  await page.goto('https://osstep.github.io/locators/actions');
  await page.getByLabel('Name').fill('Aleksey Lysyuk');
  await page.getByLabel('Email').fill('test@mail.ru');
  await page.getByLabel('Country').selectOption('US');
  await page.getByLabel('I accept the terms').check();
  await page.getByLabel('Express delivery').check();

  // загрузка файла
  await page
    .getByLabel('Invoice file')
    .setInputFiles('tests/files/ai-generated-boat-picture_23-2150647897.avif');

  const product = page.getByRole('article', { name: /Product 1/ });
  await product.hover();
  //await product.getByRole('button', { name: 'Add to cart' }).click();
  await product.dragTo(page.getByText('Drop product here'));

  await expect(page.getByTestId('order-total')).toHaveText('$199.99');
});
