import { test, expect } from '../../fixtures';

test.describe('Theme @critical', () => {
    test('toggle switches and persists across reload', async ({ page }) => {
        await page.goto('/');

        const html = page.locator('html');
        const before = await html.getAttribute('data-theme');
        expect(['dark', 'light']).toContain(before);

        await page.getByTestId('theme-toggle').click();

        const after = before === 'dark' ? 'light' : 'dark';
        await expect(html).toHaveAttribute('data-theme', after);
        const stored = await page.evaluate(() => localStorage.getItem('theme'));
        expect(stored).toBe(after);

        await page.reload();
        await expect(html).toHaveAttribute('data-theme', after);
    });
});
