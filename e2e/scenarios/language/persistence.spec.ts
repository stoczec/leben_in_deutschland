import { test, expect } from '../../fixtures';

test.describe('Language @critical', () => {
    test('selecting Russian persists across reload', async ({ page }) => {
        const q1Ru = page.getByText('В Германии люди могут открыто высказываться против правительства');
        await page.goto('/');
        await expect(q1Ru).toHaveCount(0);

        await page.getByTestId('lang-ru').click();
        await expect(q1Ru).toBeVisible();

        const stored = await page.evaluate(() => localStorage.getItem('language'));
        expect(stored).toBe('ru');

        await page.reload();
        const persisted = await page.evaluate(() => localStorage.getItem('language'));
        expect(persisted).toBe('ru');
        await expect(q1Ru).toBeVisible();
    });
});
