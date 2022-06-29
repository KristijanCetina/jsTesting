import { test, expect, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:8080');
});

test.describe('Open app and check basic elements', () => {
    test('should have basic elements on frontpage', async ({ page }) => {
        await expect(page.locator('.navbar-brand > img')).toBeVisible();
    })
});