import { test, expect } from '../../fixtures';

test.describe('Land badge @regression', () => {
    test('state question shows the Bundesland badge, general question does not', async ({ page }) => {
        await page.goto('/?frage=301');
        const badge = page.getByTestId('land-badge');
        await expect(badge).toBeVisible();
        await expect(badge).toHaveText(/SH/);

        await page.goto('/?frage=1');
        await expect(page.getByTestId('land-badge')).toHaveCount(0);
    });
});
