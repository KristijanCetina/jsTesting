import { expect, Locator, Page, Download, Response } from '@playwright/test'

export class RBIComponentPage {
    readonly page: Page
    readonly tabCalculator: Locator
    readonly linkOpenCalculator: Locator

    constructor(page: Page) {    
        this.page = page
        this.tabCalculator=page.locator('//button[.="Calculator"]')
        this.linkOpenCalculator=page.locator('//div[@id="RBICalculatorSubFormDivDoesApply"]//button[.="Open"]')
    }

    async openCUICalculator()  {
        await this.tabCalculator.click()
        await this.linkOpenCalculator.click()
      }
}


