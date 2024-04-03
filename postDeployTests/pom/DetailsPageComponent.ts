import { expect, Locator, Page, Download, Response } from '@playwright/test'

export class DetailsComponentPage {
    readonly page: Page
    readonly linkCUICS: Locator

    constructor(page: Page) {  
        this.page = page
        this.linkCUICS=page.locator('//tbody[@class="component-RBIAnalysis-table"]//a[.="CUI-CS [SB]"]')
    }
}