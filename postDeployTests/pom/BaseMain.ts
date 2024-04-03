import { expect, Page, Locator } from '@playwright/test'

export class BaseMainOptions {
    readonly page: Page
    readonly buttonActionItem: Locator
    readonly buttonMyAccount: Locator
    readonly notificationText: Locator
    readonly notificationClose: Locator

    constructor(page: Page) {
        this.page = page
        this.buttonActionItem = page.locator("//button[@title='Action Items']")
        this.buttonMyAccount = page.locator("//span[.='My Account']")
        this.notificationText = page.locator('p[class="CenNotificationText"]')
        this.notificationClose = page.locator('//div[@class="CenNotificationClose"]').first()
    }

    async checkNotification(notification: string) {
        await expect(this.notificationText).toBeVisible()
        const content = await this.notificationText.textContent()
        expect(content).toBe(notification)
    }

    async checkNotificationContains(notification: string) {
        await expect(this.notificationText).toBeVisible({timeout: 60000})
        const content = await this.notificationText.textContent()
        expect(content).toContain(notification)
    }

    async closeNotification() {
        await this.page.waitForTimeout(200)
        if (await this.notificationClose.isVisible()) {
            await this.notificationClose.click()
        }
    }

    async ClickOnPlus() {
        await this.page.click('//i[@class="fa icon-plus"]')
    }

    async goToMyAccount() {
        await this.buttonMyAccount.click()
    }

}
