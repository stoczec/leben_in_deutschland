import { test, expect } from '../../fixtures';

test.describe('Exam @critical', () => {
    test('start, answer, navigate and submit shows a result', async ({ page }) => {
        await page.goto('/');
        await page.getByTestId('start-exam').click();

        await expect(page.getByTestId('exam-progress')).toContainText('1 / 33');
        await expect(page.getByTestId('exam-timer')).toBeVisible();

        await page.getByTestId('answer-de-1').click();
        await page.getByRole('button', { name: /weiter|next/i }).click();
        await expect(page.getByTestId('exam-progress')).toContainText('2 / 33');

        await page.getByRole('button', { name: /abgeben|submit/i }).first().click();
        await expect(page.getByTestId('exam-result')).toBeVisible();
        await expect(page.getByTestId('exam-result')).toContainText('/ 33');
    });

    test('answer review is read-only', async ({ page }) => {
        await page.goto('/');
        await page.getByTestId('start-exam').click();
        await page.getByRole('button', { name: /abgeben|submit/i }).first().click();
        await expect(page.getByTestId('exam-result')).toBeVisible();

        await page.getByRole('button', { name: /antworten ansehen|review/i }).click();

        await expect(page.getByTestId('answer-de-1').first()).toHaveAttribute('aria-disabled', 'true');
    });

    test('an in-progress exam survives reload', async ({ page }) => {
        await page.goto('/');
        await page.getByTestId('start-exam').click();
        await page.getByTestId('answer-de-1').click();

        await page.reload();

        await expect(page.getByTestId('exam-progress')).toBeVisible();
    });
});
