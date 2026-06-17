import { test, expect } from '../../fixtures';

test.describe('Language @critical @regression', () => {
    test('non-Arabic locale keeps document direction ltr', async ({ page }) => {
        await page.goto('/');

        await page.getByTestId('lang-ru').click();

        await expect(page.locator('html')).toHaveAttribute('dir', 'ltr');
        await expect(page.locator('html')).toHaveAttribute('lang', 'ru');
    });
});
