import { test, expect } from '../../fixtures';

test.describe('Deep link @critical', () => {
    test('?frage=N opens that question on load', async ({ page }) => {
        await page.goto('/?frage=100');
        await expect(page.getByText('100 / 310')).toBeVisible();
        await expect(page.locator('[role="radio"]')).toHaveCount(4);
    });
});
