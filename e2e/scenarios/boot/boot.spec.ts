import { test, expect } from '../../fixtures';

test.describe('Boot @smoke', () => {
    test('renders title and language switcher', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByText('Leben in Deutschland').first()).toBeVisible();
        await expect(page.getByTestId('lang-de')).toBeVisible();
        await expect(page.getByTestId('lang-ar')).toBeVisible();
    });
});
