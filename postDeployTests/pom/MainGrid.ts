import { expect, Locator, Page, Download, Response } from '@playwright/test'

export class MainGridPage {
    readonly page: Page
    readonly gridRow1Column2: Locator
    readonly gridRow1Column4Link: Locator
    readonly gridRow1Column1: Locator

    readonly menuFLOC: Locator
    readonly menuEquipment: Locator
    readonly manuECH: Locator
    readonly menuSchedule: Locator
    // readonly mainCML: Locator
    // readonly mainCircuits: Locator
    // readonly mainComponent: Locator
    // readonly mainCMF: Locator

    constructor(page: Page) {  
        this.page = page
        this.gridRow1Column1=page.locator('//table[@data-centest="cengrid"]//tr[1]//td[1]')
        this.gridRow1Column2=page.locator('//table[@data-centest="cengrid"]//tr[1]//td[2]')
        this.gridRow1Column4Link=page.locator('//table[@data-centest="cengrid"]//tr[1]//td[4]//a')

        this.menuFLOC=page.locator('//a[@id="MenuFLOC"]')
        this.menuEquipment=page.locator('//a[@id="MenuEquipment"]')
        this.manuECH=page.locator('//a[@id="MenuConditionHistories"]')
        this.menuSchedule=page.locator('//a[@id="MenuSchedule"]')
    }

    async clickRow1Column1()  {
      await this.gridRow1Column1.click()
    }

    async clickRow1Column2()  {
      await this.gridRow1Column2.click()
    }

    async clickRow1Column4Link()  {
      await this.gridRow1Column4Link.click()
    }
}