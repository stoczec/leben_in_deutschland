import { test, expect } from '../../fixtures';

test.describe('Pagination @critical', () => {
    test('changing page scrolls back to top', async ({ page }) => {
        await page.goto('/');

        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(500);

        await page.getByRole('listitem', { name: '2' }).first().click();
        await page.waitForTimeout(900);

        const settled = await page.evaluate(() => window.scrollY);
        expect(settled).toBeLessThan(30);
    });
});
