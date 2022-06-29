import { test, expect, type Page } from '@playwright/test';

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
        page.locator('text=Login').click();
        await expect(page).toHaveURL(/.*login/)
    })
});