import { test, expect } from '../../fixtures';

test.describe('Input guards @critical @regression', () => {
    test('out-of-range InputNumber value does not crash the app', async ({ page }) => {
        await page.goto('/');

        const input = page.locator('input[role="spinbutton"]').first();
        await input.click();
        await input.pressSequentially('311', { delay: 60 });
        await page.waitForTimeout(200);

        await expect(page.getByText('Leben in Deutschland').first()).toBeVisible();
        await expect(page.locator('[role="radio"]')).toHaveCount(4);
    });

    test('corrupt currentPage in localStorage still renders cards', async ({ page }) => {
        await page.addInitScript(() => localStorage.setItem('currentPage', '999'));
        await page.goto('/');

        await expect(page.locator('article').first()).toBeVisible();
    });
});
