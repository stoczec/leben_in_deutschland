import { test, expect } from '../../fixtures';

test.describe('Question navigation @critical', () => {
    test('InputNumber jumps to the requested question id', async ({ page }) => {
        await page.goto('/');

        const inputNumber = page.locator('input[role="spinbutton"]').first();
        await inputNumber.click();
        await inputNumber.fill('100');
        await inputNumber.press('Enter');

        await expect(page.getByText('100', { exact: true }).first()).toBeVisible();
        await expect(page.locator('[role="radio"]')).toHaveCount(4);
    });
});
