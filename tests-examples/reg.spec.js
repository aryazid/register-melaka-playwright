import { test, expect } from '@playwright/test';

test('Unchecked agreement checkbox', async ({ page }) => {
    await page.goto('https://dashboard.melaka.app/register')
    await expect(page.getByTestId('register__button__sign-up')).toBeDisabled()
    await page.getByTestId("register__checkbox__tnc").check()
    await expect(page.getByTestId('register__button__sign-up')).toBeEnabled()
});