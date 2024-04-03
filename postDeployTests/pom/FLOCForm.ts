import { expect, Locator, Page, Download, Response } from '@playwright/test'

export class FLOCForm {
    readonly page: Page
    readonly placeholderStartupDateDDMMMYYYY: Locator

    constructor(page: Page) {    
        this.page = page
        this.placeholderStartupDateDDMMMYYYY=page.locator('//input[@placeholder="MM/DD/YYYY" and @name="StartupDate"]')
    }
}