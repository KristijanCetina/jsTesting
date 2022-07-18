import { test, expect, type Page } from '@playwright/test';
import * as globals from './shared.spec';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080');
});

test.describe('Open app and check basic elements', () => {
    test('should have basic elements on frontpage', async ({ page }) => {
        await expect(page.locator('.navbar-brand > img')).toBeVisible();
        await expect(page.locator('text=Make your payments easier')).toBeVisible();
        await expect(page.locator('[href="/login"]')).toBeVisible();
        await expect(page.locator('[href="/signup"]')).toBeVisible();

    });
    test('should sign up a new user', async ({ page }) => {

        page.locator('text=Sign up').click();
        await expect(page).toHaveURL(/.*signup/)
        await page.locator('[placeholder="Enter your full name"]').fill(globals.default.username);
        await page.locator('[placeholder="Enter email"]').fill(globals.default.email);
        await page.locator('[placeholder="Enter Password"]').fill(globals.default.password);
        await page.locator('[placeholder="Enter your password once again"]').fill(globals.default.password);
        await page.locator('input[name="TermsCheck"]').check();
        await page.locator('text=Sign In').click();
        console.log("User is created. Check your email");
    })
});
