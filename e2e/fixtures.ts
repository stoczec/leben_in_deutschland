import { test as base, expect } from '@playwright/test';

export const test = base.extend({
    page: async ({ page }, use) => {
        page.on('dialog', d => d.accept().catch(() => undefined));
        await use(page);
    },
});

export { expect };
