import { test, expect } from '../../fixtures';

test.describe('Card answer feedback @critical', () => {
    test('selecting the correct answer shows green', async ({ page }) => {
        await page.goto('/');

        const inputNumber = page.locator('input[role="spinbutton"]').first();
        await inputNumber.click();
        await inputNumber.fill('1');
        await inputNumber.press('Enter');

        await page.getByTestId('answer-de-4').click();

        await expect(page.getByTestId('answer-de-4')).toHaveCSS(
            'background-color',
            'rgb(21, 40, 31)'
        );
    });

    test('selecting a wrong answer shows red', async ({ page }) => {
        await page.goto('/');

        const inputNumber = page.locator('input[role="spinbutton"]').first();
        await inputNumber.click();
        await inputNumber.fill('1');
        await inputNumber.press('Enter');

        await page.getByTestId('answer-de-1').click();

        await expect(page.getByTestId('answer-de-1')).toHaveCSS(
            'background-color',
            'rgb(44, 24, 21)'
        );
    });
});
