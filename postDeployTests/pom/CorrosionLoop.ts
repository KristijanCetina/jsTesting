import { expect, Locator, Page, PageScreenshotOptions, Keyboard } from '@playwright/test'

export class CorrosionLoopPage {
    readonly page: Page
    readonly buttonNewIOW: Locator
    readonly buttonNewIOW2: Locator
    readonly buttonPiPickerIcon: Locator
    readonly butttonDropdownDashboard: Locator
    readonly inputSearchDashboard: Locator
    readonly titleGlobalDashboard: Locator
    readonly labelDownstreamGlobalDashboard: Locator
    readonly labelAmericasPTGlobalDashboard: Locator
    readonly labelUpstreamGlobalDashboard: Locator
    readonly labelIntegratedGasGlobalDashboard: Locator
    readonly labelOther: Locator
    readonly inputSearchInGlobalDashboard: Locator
    readonly selectGlobalDashboard: Locator
    readonly piServiceCheck: Locator

    constructor(page: Page) {
        this.page = page
        this.buttonNewIOW = page.locator('(//cen-tabs//*[@title="New"])')
        this.buttonNewIOW2 = page.locator('//div[@id="LightboxLoops_CorrosionLoopOW_"]//div[@class="btn-group pull-left"]//button[@class="btn btn-small" and @title="New"]')
        this.buttonPiPickerIcon = page.locator('(//div[@id="LightboxLoops_CorrosionLoopOW"]//*[@data-centest="pickerIcon"])')
        this.piServiceCheck = page.locator("(//div[text()='DSAMPICOLL' or text()='DSEUPICOLL' or text()='DSAPPICOLL'  or text()='UPPICOLL' or text()='AUSPICOLL' or text()='AUSPICOLL_QGC' or text()='CANPICOLL' or text()='SEICPICOLPROD1' or text()='spdpi-ha-01'])[1]")
    }

    async checkPIService() {
        await this.buttonNewIOW.click()
        await this.buttonNewIOW2.click()
        await this.buttonPiPickerIcon.click()
        await expect(this.piServiceCheck).toBeVisible()
        await this.piServiceCheck.click() 
 



    }
}

