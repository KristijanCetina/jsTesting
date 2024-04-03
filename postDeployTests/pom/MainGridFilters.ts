import { expect, Locator, Page, Download, Response } from '@playwright/test'

export class MainGridFiltersPage {
    readonly page: Page
    readonly buttonExpandFiltersPanel: Locator
    readonly expandVisibility: Locator
    readonly expandDegradationMechanism: Locator
    readonly checkboxVisibilityGlobal: Locator
    readonly linkShowFitlerResultsContent: Locator
    readonly buttonExpandAppliedFiltersPanel: Locator
    readonly buttonRemoveAppliedFilters: Locator
    readonly checkboxCUICS: Locator
    readonly buttonShowResult: Locator

    constructor(page: Page) {
        this.page = page
        this.buttonShowResult = page.locator("//span[.='Show']")
        this.buttonExpandFiltersPanel = page.locator('//*[@class="filtersSidePanelTriggerBtn"]')
        this.expandVisibility = page.locator('//span[@class="filter-expandable-trigger"]/following-sibling::span[.= "Visibility"]')
        this.expandDegradationMechanism = page.locator('//span[.="Degradation Mechanism"]')
        this.checkboxVisibilityGlobal = page.locator('//input[@id="Global"]/following-sibling::span')
        this.checkboxCUICS = page.locator('//input[@id="CUI-CS"]/following-sibling::span')
        this.linkShowFitlerResultsContent = page.locator('//div[@class="filtersShowTotalContent"]/a')
        this.buttonExpandAppliedFiltersPanel = page.locator('//*[@class="filtersSidePanelTriggerBtn hasfiltersApplied"]')
        this.buttonRemoveAppliedFilters = page.locator('//button[@class="btn btn-small btn-clear-filters"]')
    }

    async expandFilterPanel() {
        await this.buttonExpandFiltersPanel.click()
    }

    async expandVisibilityFilterAndCheckGlobal() {
        await this.expandVisibility.click()
        await this.checkboxVisibilityGlobal.click()
        await expect(this.checkboxVisibilityGlobal).toBeChecked()
    }

    async expandDegradationMechanismFilterAndCheckCUICS() {
        await this.expandDegradationMechanism.click()
        await this.checkboxCUICS.click()
        await expect(this.checkboxCUICS).toBeChecked()
    }

    async clickOnLinkShowFilterResultsContent() {
        await this.linkShowFitlerResultsContent.click()
    }

    async removeAppliedFilters() {
        await this.buttonExpandAppliedFiltersPanel.click()
        await this.buttonRemoveAppliedFilters.click()
        await expect(this.buttonExpandAppliedFiltersPanel).not.toBeVisible()
    }
}
