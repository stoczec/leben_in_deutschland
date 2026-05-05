import { test, expect } from '../../fixtures';

test.describe('Language @critical @regression', () => {
    test('Arabic switches document direction to rtl and persists', async ({ page }) => {
        await page.goto('/');

        await page.getByText('Wählen Sie Ihre Muttersprache').click();
        await page.getByText('العربية', { exact: true }).click();

        await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
        await expect(page.locator('html')).toHaveAttribute('lang', 'ar');

        await page.reload();
        await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
        await expect(page.locator('html')).toHaveAttribute('lang', 'ar');
    });

    test('non-Arabic locale keeps document direction ltr', async ({ page }) => {
        await page.goto('/');

        await page.getByText('Wählen Sie Ihre Muttersprache').click();
        await page.getByText('Русский', { exact: true }).click();

        await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
        await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    });
});
