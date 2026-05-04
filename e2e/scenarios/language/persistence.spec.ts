import { test, expect } from '../../fixtures';

test.describe('Language @critical', () => {
    test('selecting Russian persists across reload', async ({ page }) => {
        await page.goto('/');

        await page.getByText('Wählen Sie Ihre Muttersprache').click();
        await page.getByText('Русский', { exact: true }).click();

        const stored = await page.evaluate(() => localStorage.getItem('language'));
        expect(stored).toBe('ru');

        await page.reload();
        const persisted = await page.evaluate(() => localStorage.getItem('language'));
        expect(persisted).toBe('ru');
    });
});
