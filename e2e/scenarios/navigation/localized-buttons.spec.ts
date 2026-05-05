import { test, expect } from '../../fixtures';

test.describe('Question navigation @critical', () => {
    test('prev/next buttons follow active language', async ({ page }) => {
        await page.goto('/');

        await page.getByText('Wählen Sie Ihre Muttersprache').click();
        await page.getByText('Русский', { exact: true }).click();

        const inputNumber = page.locator('input[role="spinbutton"]').first();
        await inputNumber.click();
        await inputNumber.fill('2');
        await inputNumber.press('Enter');

        await expect(page.getByRole('button', { name: 'Предыдущий вопрос' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Следующий вопрос' })).toBeVisible();
    });
});
