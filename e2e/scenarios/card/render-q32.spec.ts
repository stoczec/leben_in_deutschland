import { test, expect } from '../../fixtures';

test.describe('Card render @critical @regression', () => {
    test('Q32 renders 4 answers (regression: dataNew.js had typo d1 instead of 1)', async ({ page }) => {
        await page.goto('/');

        const inputNumber = page.locator('input[role="spinbutton"]').first();
        await inputNumber.click();
        await inputNumber.fill('32');
        await inputNumber.press('Enter');

        await expect(page.locator('input[type="radio"]')).toHaveCount(4);
        await expect(page.getByText('Gesetzgebung')).toBeVisible();
    });
});
