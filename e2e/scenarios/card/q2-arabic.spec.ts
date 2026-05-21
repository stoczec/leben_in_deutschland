import { test, expect } from '../../fixtures';

test.describe('Card data @critical @regression', () => {
    test('Q2 Arabic question has no duplicated Q1 prefix', async ({ page }) => {
        await page.addInitScript(() => localStorage.setItem('language', 'ar'));
        await page.goto('/');

        const input = page.locator('input[role="spinbutton"]').first();
        await input.click();
        await input.fill('2');
        await input.press('Enter');

        await expect(page.getByText('ضد الحكومة')).toHaveCount(0);
    });
});
