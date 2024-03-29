import { test, expect, type Page } from '@playwright/test';
import sharedSpec from './shared.spec';

test.beforeEach(async ({ page }) => {
    await page.goto(sharedSpec.baseURL + 'login');
});

test.describe('Login to the app with created credentials', () => {
    test('should have been login to app and have elements on page', async ({ page }) => {
        await expect(page).toHaveURL(/.*login/);
        await page.locator('[placeholder="Enter email"]').fill(sharedSpec.email);
        await page.locator('[placeholder="Password"]').fill(sharedSpec.password);
        await page.locator('button[name="Login"]').click();

        await expect(page).toHaveURL(/.*subscription/);
        await expect(page.locator('text=Subsciption')).toBeVisible();

        await expect(page.locator('text=Payments')).toBeVisible();
        await page.locator('text=My Payments').click();
        await expect(page).toHaveURL(/.*MyPayments/);

        await expect(page.locator('text=Calendar')).toBeVisible();
        await page.locator('text=Calendar').click();
        await expect(page).toHaveURL(/.*Calendar_dash/);

        await expect(page.locator('text=News')).toBeVisible();
        await page.locator('text=News').click();
        await expect(page).toHaveURL(/.*News_dash/);

    });

});
