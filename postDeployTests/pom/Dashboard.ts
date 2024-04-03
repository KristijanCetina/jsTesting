import { expect, Locator, Page, PageScreenshotOptions, Keyboard } from '@playwright/test'

export class DashboardPage {
    readonly page: Page
    readonly panelDashboard: Locator
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

    constructor(page: Page) {
        this.page = page
        this.panelDashboard = page.locator('//cen-dashboard-selector')
        this.butttonDropdownDashboard = page.locator('//cen-dashboard-selector/button')
        this.inputSearchDashboard = page.locator('//div[@class="dashboard-selector-search"]/input')
        this.selectGlobalDashboard = page.locator('//div[@class="dashboard-selector-dashboard-name" and .="Global Dashboard"]')

        this.titleGlobalDashboard = page.locator('//div[@id="DashboardSelectionDiv"]//h1[.="Global Dashboard"]')
        this.labelDownstreamGlobalDashboard = page.locator('//div[@class="global-dashboard-table__inner GeneralGlobalDashboard"]//*[.="Downstream"]')
        this.labelAmericasPTGlobalDashboard = page.locator('//div[@class="global-dashboard-table__inner GeneralGlobalDashboard"]//*[.="Americas P&T"]')
        this.labelUpstreamGlobalDashboard = page.locator('//div[@class="global-dashboard-table__inner GeneralGlobalDashboard"]//*[.="Upstream"]')
        this.labelIntegratedGasGlobalDashboard = page.locator('//div[@class="global-dashboard-table__inner GeneralGlobalDashboard"]//*[.="Integrated Gas"]')
        this.labelOther = page.locator('//*[.="Other"]')
        this.inputSearchInGlobalDashboard = page.locator('//div[@class="dash__search navbar-search"]/input')
    }

    async openGlobalDashboard() {
        await this.panelDashboard.click()
        await this.butttonDropdownDashboard.click()
        await this.inputSearchDashboard.fill('Global Dashboard')
        //await this.page.keyboard.press('Enter')
        await this.selectGlobalDashboard.click()
        await expect(this.titleGlobalDashboard).toBeVisible()
    }

    async verifyGlobalDashboardSections() {
        await this.page.waitForTimeout(7000)
        await expect(this.labelDownstreamGlobalDashboard).toBeVisible()
        //await expect(this.labelAmericasPTGlobalDashboard).toBeVisible()
        await expect(this.labelUpstreamGlobalDashboard).toBeVisible()
        await expect(this.labelIntegratedGasGlobalDashboard).toBeVisible()
        // await expect(this.labelOther).toBeVisible()
    }
}

