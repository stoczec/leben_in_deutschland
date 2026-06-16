import { test, expect } from '../../fixtures';

test.describe('Exam composition @regression', () => {
    test('draws 30 general (id<=300) + 3 state (id>=301) questions', async ({ page }) => {
        await page.goto('/');
        await page.getByTestId('start-exam').click();
        await expect(page.getByTestId('exam-progress')).toContainText('1 / 33');

        const ids: number[] = await page.evaluate(() => {
            const raw = localStorage.getItem('exam');
            return raw ? JSON.parse(raw).ids : [];
        });

        expect(ids).toHaveLength(33);
        expect(new Set(ids).size).toBe(33);
        expect(ids.filter((id) => id <= 300)).toHaveLength(30);
        expect(ids.filter((id) => id >= 301)).toHaveLength(3);
    });
});
