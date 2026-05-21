import { test, expect } from '../../fixtures';

test.describe('Filters @critical', () => {
    test('favorites filter shows only bookmarked questions', async ({ page }) => {
        await page.goto('/');

        await page.getByTestId('fav-1').click();
        await page.getByTestId('filter-fav').click();

        await expect(page.getByTestId('filter-fav')).toContainText('1');
        await expect(page.getByTestId('fav-1')).toBeVisible();
        await expect(page.getByTestId('fav-2')).toHaveCount(0);
    });

    test('mistakes filter shows only wrongly answered questions', async ({ page }) => {
        await page.goto('/');

        const input = page.locator('input[role="spinbutton"]').first();
        await input.click();
        await input.fill('1');
        await input.press('Enter');
        await page.getByTestId('answer-de-1').click(); // Q1 correct answer is 4, so this is wrong

        await page.getByTestId('filter-wrong').click();

        await expect(page.getByTestId('filter-wrong')).toContainText('1');
        await expect(page.getByTestId('fav-1')).toBeVisible();
        await expect(page.getByTestId('fav-2')).toHaveCount(0);
    });
});
