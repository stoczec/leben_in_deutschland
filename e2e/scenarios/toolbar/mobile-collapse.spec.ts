import { test, expect } from '../../fixtures';

test.describe('Mobile toolbar @regression', () => {
    test('controls collapse behind a toggle on small screens', async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 740 });
        await page.goto('/');

        await expect(page.getByTestId('progress-answered')).toBeVisible();
        await expect(page.getByTestId('start-exam')).toBeHidden();

        await page.getByRole('button', { name: /controls|управление|steuerung/i }).click();

        await expect(page.getByTestId('start-exam')).toBeVisible();
    });
});
