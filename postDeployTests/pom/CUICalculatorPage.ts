import { expect, Locator, Page, Download, Response, Frame } from '@playwright/test'

export class OpenCUICalculatorPage {
    readonly page: Page
    readonly frame: Frame
    readonly frameCUICalculator: Locator
    readonly buttonCloseCUICalculatorFrame: Locator
    readonly loginDialog: Locator
    readonly inputPaswword: Locator
    readonly buttonLogiIn: Locator

    constructor(page: Page) {
        this.page = page
        this.frame = this.frame
        this.frameCUICalculator = this.page.frameLocator('//iframe[@data-bind="attr:{ src: CalculatorURL }"]').locator('text=MMI')
        this.buttonCloseCUICalculatorFrame = this.page.locator('//button[@class="ui-dialog-titlebar-close"]')
        //this.loginDialog=this.page.frameLocator('//iframe[@data-bind="attr:{ src: CalculatorURL }"]').locator('id="logindialog"')
        this.loginDialog = this.frameCUICalculator.locator('id="logindialog"')
        this.inputPaswword = this.frameCUICalculator.locator('//input[@id="Password"]')
        this.buttonLogiIn = this.frameCUICalculator.locator('//input[@id="loginAjaxButton"]')
    }

    async verifyCUICalculator() {
        await expect(this.buttonCloseCUICalculatorFrame).toBeVisible()
        await expect(this.frameCUICalculator).toBeVisible()
        //await expect(this.loginDialog).toBeVisible()
        //await expect(this.inputPaswword).toBeVisible()
        //await expect(this.buttonLogiIn).toBeVisible()
    }

    async closeCUICalculator() {
        await this.buttonCloseCUICalculatorFrame.click()
    }
}