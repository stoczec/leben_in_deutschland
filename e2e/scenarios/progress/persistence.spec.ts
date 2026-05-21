import { test, expect } from '../../fixtures';

const goToQ1 = async (page) => {
    const inputNumber = page.locator('input[role="spinbutton"]').first();
    await inputNumber.click();
    await inputNumber.fill('1');
    await inputNumber.press('Enter');
};

test.describe('Progress @critical', () => {
    test('answering updates counters and persists across reload', async ({ page }) => {
        await page.goto('/');
        await expect(page.getByTestId('progress-answered')).toContainText('0/310');

        await goToQ1(page);
        await page.getByTestId('answer-de-4').click(); // Q1 correct answer is 4

        await expect(page.getByTestId('progress-correct')).toContainText('1');
        await expect(page.getByTestId('progress-answered')).toContainText('1/310');

        await page.reload();
        await expect(page.getByTestId('progress-answered')).toContainText('1/310');

        await goToQ1(page);
        await expect(page.getByTestId('answer-de-4')).toHaveAttribute('aria-checked', 'true');
    });

    test('reset clears all progress', async ({ page }) => {
        await page.goto('/');
        await goToQ1(page);
        await page.getByTestId('answer-de-4').click();
        await expect(page.getByTestId('progress-answered')).toContainText('1/310');

        await page.getByRole('button', { name: /reset progress|zurücksetzen/i }).click();

        await expect(page.getByTestId('progress-answered')).toContainText('0/310');
    });
});
