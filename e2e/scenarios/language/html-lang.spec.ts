import { test, expect } from '../../fixtures';

test.describe('Language @critical', () => {
    test('switching locale updates the html lang attribute', async ({ page }) => {
        await page.goto('/');

        await page.getByTestId('lang-ru').click();

        await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    });
});
