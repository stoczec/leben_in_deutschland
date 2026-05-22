import { test, expect } from '../../fixtures';

test.describe('Keyboard navigation @critical', () => {
    test('arrow keys move between questions in single view', async ({ page }) => {
        await page.goto('/');

        const input = page.locator('input[role="spinbutton"]').first();
        await input.click();
        await input.fill('5');
        await input.press('Enter');
        await expect(page.getByText('5 / 310')).toBeVisible();

        await page.getByText('Leben in Deutschland').first().click(); // blur the number input (header brand)
        await page.keyboard.press('ArrowRight');
        await expect(page.getByText('6 / 310')).toBeVisible();

        await page.keyboard.press('ArrowLeft');
        await expect(page.getByText('5 / 310')).toBeVisible();
    });
});

test.describe('Question search @critical', () => {
    test('searching by question text jumps to that question', async ({ page }) => {
        await page.goto('/');

        await page.getByTestId('question-search').click();
        await page.keyboard.type('Regierung sagen'); // distinctive phrase from question 1
        await page.waitForTimeout(150); // let antd apply the filter before selecting
        await page.keyboard.press('Enter'); // select the highlighted (first filtered) option

        await expect(page.getByText('1 / 310')).toBeVisible();
    });
});
