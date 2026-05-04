import { test, expect } from '../../fixtures';

test.describe('Boot @smoke', () => {
    test('renders title and language selector', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByText('Leben in Deutschland').first()).toBeVisible();
        await expect(page.getByText('Wählen Sie Ihre Muttersprache')).toBeVisible();
    });
});
