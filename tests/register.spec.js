import { test, expect } from '@playwright/test';

test('Valid Registration', async ({ page }) => {
    await page.goto('https://dashboard.melaka.app/register');
    await page.getByTestId("register__checkbox__tnc").check();
    await page.goto('https://dashboard.melaka.app/register');
    await page.getByTestId("register__checkbox__tnc").check();
    await page.getByTestId('register__text-field__name').fill('Aryazid');
    await page.getByTestId('register__text-field__phone-number').fill('81278163812');
    await page.getByTestId('register__text-field__business-name').fill('Aryazid Zhop');
    await page.getByTestId('register__radio-button__brand').check();
    await page.getByTestId('register__text-field__email').fill('y343arygid@gmail.com');
    await page.getByTestId('register__text-field__password').fill('4ry4z1dd');
    await page.getByTestId('register__text-field__confirm-password').fill('4ry4z1dd');
    await page.getByTestId('register__button__sign-up').click()
    await page.waitForURL('https://dashboard.melaka.app/account-activation')
    expect(page.url()).toBe('https://dashboard.melaka.app/account-activation');
});

test('Unchecked agreement checkbox', async ({ page }) => {
    await page.goto('https://dashboard.melaka.app/register')
    await expect(page.getByTestId('register__button__sign-up')).toBeDisabled()
    await page.getByTestId("register__checkbox__tnc").check()
    await expect(page.getByTestId('register__button__sign-up')).toBeEnabled()
});

test('Registration Form Validation on Leaving Fields Empty', async ({ page }) => {
    await page.goto('https://dashboard.melaka.app/register');
    await page.getByTestId("register__checkbox__tnc").check();
    await page.getByTestId('register__button__sign-up').click()
    await expect(page.getByTestId('register__text-field__name__error')).toHaveText('Wajib diisi.');
    await expect(page.getByTestId('register__text-field__phone-number__error')).toHaveText('Wajib diisi. Nomor telepon tidak boleh kurang dari 10 atau lebih dari 12 karakter.');
    await expect(page.getByTestId('register__text-field__business-name__error')).toHaveText('Wajib diisi.');
    await expect(page.getByTestId('register__text-field__email__error')).toHaveText('Wajib diisi.');
    await expect(page.getByTestId('register__text-field__password__error')).toHaveText('Wajib diisi.');
    await expect(page.getByTestId('register__text-field__confirm-password__error')).toHaveText('Wajib diisi.');
});

test('Verify Registration with One-Letter Input for Required Fields', async ({ page }) => {
    await page.goto('https://dashboard.melaka.app/register');
    await page.getByTestId("register__checkbox__tnc").check();
    await page.getByTestId('register__text-field__name').fill('A');
    await page.getByTestId('register__text-field__phone-number').fill('8');
    await page.getByTestId('register__text-field__business-name').fill('A');
    await page.getByTestId('register__radio-button__brand').check();
    await page.getByTestId('register__text-field__email').fill('a');
    await page.getByTestId('register__text-field__password').fill('a');
    await page.getByTestId('register__button__sign-up').click()
    await expect(page.getByTestId('register__text-field__name__error')).toHaveText('Wajib diisi, min. 5 karakter.');
    await expect(page.getByTestId('register__text-field__phone-number__error')).toHaveText('Wajib diisi. Nomor telepon tidak boleh kurang dari 10 atau lebih dari 12 karakter.');
    await expect(page.getByTestId('register__text-field__business-name__error')).toHaveText('Wajib diisi, nama bisnis tidak boleh kurang dari 5 karakter.');
    await expect(page.getByTestId('register__text-field__email__error')).toHaveText('Harap isi dengan format yang benar.');
    await expect(page.getByTestId('register__text-field__password__error')).toHaveText('Min. 8 karakter, harus kombinasi dari huruf dan angka.');
});

test('Phone Number Already Registered', async ({ page }) => {
    await page.goto('https://dashboard.melaka.app/register')
    await page.getByTestId("register__checkbox__tnc").check();
    await page.getByTestId('register__text-field__name').fill('Aryazid');
    await page.getByTestId('register__text-field__phone-number').fill('81281050031');
    await page.getByTestId('register__text-field__business-name').fill('Aryazid');
    await page.getByTestId('register__radio-button__brand').check();
    await page.getByTestId('register__text-field__email').fill('arya34t3g@gmail.com');
    await page.getByTestId('register__text-field__password').fill('4ry4zid123');
    await page.getByTestId('register__text-field__confirm-password').fill('4ry4zid123');
    await page.getByTestId('register__button__sign-up').click()
    await expect(page.getByTestId('register__text-field__phone-number__error')).toHaveText('Maaf, identitas sudah digunakan. Silakan coba yang lain.');
});

test('Email Already Registered', async ({ page }) => {
    await page.goto('https://dashboard.melaka.app/register')
    await page.getByTestId("register__checkbox__tnc").check();
    await page.getByTestId('register__text-field__name').fill('Aryazid');
    await page.getByTestId('register__text-field__phone-number').fill('81234567892');
    await page.getByTestId('register__text-field__business-name').fill('Aryazid');
    await page.getByTestId('register__radio-button__brand').check();
    await page.getByTestId('register__text-field__email').fill('aryazid10@gmail.com');
    await page.getByTestId('register__text-field__password').fill('4ry4zid123');
    await page.getByTestId('register__text-field__confirm-password').fill('4ry4zid123');
    await page.getByTestId('register__button__sign-up').click()
    await expect(page.getByTestId('register__text-field__email__error')).toHaveText('Maaf, identitas sudah digunakan. Silakan coba yang lain.');
});

test('Verify Password and Confirm Mismatch Password', async ({ page }) => {
    await page.goto('https://dashboard.melaka.app/register');
    await page.getByTestId("register__checkbox__tnc").check();
    await page.getByTestId('register__text-field__name').fill('Aryazidd');
    await page.getByTestId('register__text-field__phone-number').fill('82674691243');
    await page.getByTestId('register__text-field__business-name').fill('Aryazid Store');
    await page.getByTestId('register__radio-button__brand').check();
    await page.getByTestId('register__text-field__email').fill('aryiaji92@gmail.com');
    await page.getByTestId('register__text-field__password').fill('4ry4zid123');
    await page.getByTestId('register__text-field__confirm-password').fill('4ry4zid124');
    await page.getByTestId('register__button__sign-up').click()
    await expect(page.getByTestId('register__text-field__confirm-password__error')).toHaveText('Belum sesuai dengan kata sandi.');
});

test('Verify Password Strength Validation', async ({ page }) => {
    await page.goto('https://dashboard.melaka.app/register');
    await page.getByTestId("register__checkbox__tnc").check();
    await page.getByTestId('register__text-field__name').fill('Aryazid');
    await page.getByTestId('register__text-field__phone-number').fill('812810532534');
    await page.getByTestId('register__text-field__business-name').fill('Aryazid Retail');
    await page.getByTestId('register__radio-button__brand').check();
    await page.getByTestId('register__text-field__email').fill('45t45gv@gmail.com');
    await page.getByTestId('register__text-field__password').fill('muhammad');
    await expect(page.getByTestId('register__text-field__password__error')).toHaveText('Min. 8 karakter, harus kombinasi dari huruf dan angka.');
    await page.getByTestId('register__text-field__password').fill('12345678');
    await expect(page.getByTestId('register__text-field__password__error')).toHaveText('Min. 8 karakter, harus kombinasi dari huruf dan angka.');
    await page.getByTestId('register__text-field__password').fill('aryazid123');
    await page.getByTestId('register__button__sign-up').click()
    await expect(page.getByTestId('register__text-field__password__error')).toHaveText('The password can not be used because it is too similar to the identifier.');
});

test('Registration with Special Characters in Name, Business Name, and Email Fields', async ({ page }) => {
    await page.goto('https://dashboard.melaka.app/register');
    await page.getByTestId("register__checkbox__tnc").check();
    await page.getByTestId('register__text-field__name').fill('A%^&&%');
    await page.getByTestId('register__text-field__phone-number').fill('81837458934');
    await page.getByTestId('register__text-field__business-name').fill('A%&&%%');
    await page.getByTestId('register__radio-button__brand').check();
    await page.getByTestId('register__text-field__email').fill('a##^%@gmail.com');
    await page.getByTestId('register__text-field__password').fill('4ry4zid12e');
    await page.getByTestId('register__text-field__confirm-password').fill('4ry4zid12e');
    await page.getByTestId('register__button__sign-up').click()
    await expect(page.getByTestId('register__text-field__name__error')).toHaveText('Tidak dapat menggunakan karakter spesial');
    await expect(page.getByTestId('register__text-field__business-name__error')).toHaveText('Tidak dapat menggunakan karakter spesial selain titik (.) koma (,) strip (-)');
    await expect(page.getByTestId('register__text-field__email__error')).toHaveText('Harap isi dengan format yang benar.');
});

test('SQL Injection in Name Fields', async ({ page }) => {
    await page.goto('https://dashboard.melaka.app/register');
    await page.getByTestId("register__checkbox__tnc").check();
    await page.getByTestId('register__text-field__name').fill("'; DROP TABLE users; --");
    await page.getByTestId('register__text-field__phone-number').fill('81281050321');
    await page.getByTestId('register__text-field__business-name').fill('Aryazid Corp');
    await page.getByTestId('register__radio-button__brand').check();
    await page.getByTestId('register__text-field__email').fill('dscwtg@gmail.com');
    await page.getByTestId('register__text-field__password').fill('4ry4z1dd');
    await page.getByTestId('register__text-field__confirm-password').fill('4ry4z1dd');
    await page.getByTestId('register__button__sign-up').click()
    await expect(page.getByTestId('register__text-field__name__error')).toHaveText('Wajib diisi, min. 5 karakter.');
});

test('XSS Injection in Name Fields', async ({ page }) => {
    await page.goto('https://dashboard.melaka.app/register');
    await page.getByTestId("register__checkbox__tnc").check();
    await page.getByTestId('register__text-field__name').fill("<script>alert('XSS')</script>");
    await page.getByTestId('register__text-field__phone-number').fill('81281050321');
    await page.getByTestId('register__text-field__business-name').fill('Aryazid Corp');
    await page.getByTestId('register__radio-button__brand').check();
    await page.getByTestId('register__text-field__email').fill('dscwtg@gmail.com');
    await page.getByTestId('register__text-field__password').fill('4ry4z1dd');
    await page.getByTestId('register__text-field__confirm-password').fill('4ry4z1dd');
    await page.getByTestId('register__button__sign-up').click()
    await expect(page.getByTestId('register__text-field__name__error')).toHaveText('Wajib diisi, min. 5 karakter.');
});