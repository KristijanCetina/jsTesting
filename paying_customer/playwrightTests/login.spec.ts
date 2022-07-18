import { test, expect, type Page } from '@playwright/test';
import * as globals from './shared.spec';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080/login');
});

test.describe('Login to the app with created credentials', () => {
    test('should have been login to app and have elements on page', async ({ page }) => {
        await expect(page).toHaveURL('http://localhost:8080/login');
        await page.locator('[placeholder="Enter email"]').fill('neaps.drawn0k@icloud.com');
        await page.locator('[placeholder="Password"]').fill('ValidPassword123');
        await page.locator('button[name="Login"]').click();

        await expect(page).toHaveURL('http://localhost:8080/subscription');
        await expect(page.locator('text=Subsciption')).toBeVisible();

        await expect(page.locator('text=Payments')).toBeVisible();
        await page.locator('text=My Payments').click();
        await expect(page).toHaveURL('http://localhost:8080/MyPayments');

        await expect(page.locator('text=Calendar')).toBeVisible();
        await page.locator('text=Calendar').click();
        await expect(page).toHaveURL('http://localhost:8080/Calendar_dash');

        await expect(page.locator('text=News')).toBeVisible();
        await page.locator('text=News').click();
        await expect(page).toHaveURL('http://localhost:8080/News_dash');

    });

});
