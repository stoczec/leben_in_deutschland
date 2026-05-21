import { test, expect } from '../../fixtures';

test.describe('Language a11y @regression', () => {
    test('aria-pressed reflects the active language', async ({ page }) => {
        await page.goto('/');

        await expect(page.getByTestId('lang-de')).toHaveAttribute('aria-pressed', 'true');
        await expect(page.getByTestId('lang-ru')).toHaveAttribute('aria-pressed', 'false');

        await page.getByTestId('lang-ru').click();

        await expect(page.getByTestId('lang-ru')).toHaveAttribute('aria-pressed', 'true');
        await expect(page.getByTestId('lang-de')).toHaveAttribute('aria-pressed', 'false');
    });
});
