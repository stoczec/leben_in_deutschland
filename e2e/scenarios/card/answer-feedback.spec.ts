import { test, expect } from '../../fixtures';

test.describe('Card answer feedback @critical', () => {
    test('selecting the correct answer shows green', async ({ page }) => {
        await page.goto('/');

        const inputNumber = page.locator('input[role="spinbutton"]').first();
        await inputNumber.click();
        await inputNumber.fill('1');
        await inputNumber.press('Enter');

        await page.locator('input[type="radio"][value="4"]').check({ force: true });

        await expect(page.getByTestId('answer-de-4')).toHaveCSS(
            'background-color',
            'rgb(93, 214, 160)'
        );
    });

    test('selecting a wrong answer shows red', async ({ page }) => {
        await page.goto('/');

        const inputNumber = page.locator('input[role="spinbutton"]').first();
        await inputNumber.click();
        await inputNumber.fill('1');
        await inputNumber.press('Enter');

        await page.locator('input[type="radio"][value="1"]').check({ force: true });

        await expect(page.getByTestId('answer-de-1')).toHaveCSS(
            'background-color',
            'rgb(240, 128, 119)'
        );
    });
});
