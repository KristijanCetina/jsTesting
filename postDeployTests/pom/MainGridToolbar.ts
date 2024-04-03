import { expect, Locator, Page, Download, Response } from '@playwright/test'
import { BaseMainOptions } from './BaseMain'

export class MainGridToolbarPage {
    readonly page: Page
    readonly checkboxSelectAll: Locator
    readonly buttonCreateNewEntity: Locator
    readonly buttonPin: Locator
    readonly buttonActivate: Locator
    readonly buttonDeactivate: Locator
    readonly buttonImport: Locator
    readonly buttonExport: Locator
    readonly buttonReport: Locator
    readonly inputSearchGrid: Locator
    readonly linkSelectOnly25ItemsOnThisPage: Locator
    readonly lableSelectedItems25: Locator
    readonly selectGridPaging25: Locator
    readonly notificationPinApplied: Locator
    readonly notificationPinRemoved: Locator
    readonly buttonRemovePin: Locator
    readonly breadcrumbPinned: Locator
    readonly countIsPinned25: Locator
    readonly buttonClearAll: Locator
    readonly notificationFiltresRemoved: Locator
    readonly buttonSettings: Locator
    readonly scopeSiteSelector: Locator
    readonly scopePlantSelector: Locator
    readonly scopeUnitSelector: Locator
    readonly buttonScopeShow: Locator
    readonly checkBoxScopeSelectAll: Locator
    readonly buttonFiltersActive: Locator
    readonly buttonDeleteFilters: Locator
    readonly buttonCollectedData: Locator
    readonly scopeButtonSites: Locator
    readonly scopeButtonActiveFilterApplied: Locator
    readonly scopeCheckboxSelectAllSites: Locator
    readonly scopeButtonShow: Locator
    readonly baseMain: BaseMainOptions

    constructor(page: Page) {
        this.page = page
        // Checkboxes
        this.checkboxSelectAll = page.locator('(//cen-toolbar//*[@class="biggerCheckboxMark"])[1]')
        // Buttons - Create
        this.buttonCreateNewEntity = page.locator('(//cen-search-container//button[@class="infoColumnBigBtn btn"])')
        // Buttons - Pining
        this.buttonPin = page.locator('(//cen-toolbar//*[@class="btn btn-small tc-btn-pin toolbarBtnWithPopover"])[1]')
        this.buttonRemovePin = page.locator('(//cen-toolbar//*[@class="btn btn-small tc-btn-pin toolbarBtnWithPopover active"])[1]')
        // Buttons - Activate/Deactivate
        this.buttonActivate = page.locator('(//cen-toolbar//*[@class="btn btn-small toolbarBtnWithPopover tc-btn-activate"])[1]')
        this.buttonDeactivate = page.locator('(//cen-toolbar//*[@class="btn btn-small toolbarBtnWithPopover tc-btn-deactivate"])[1]')
        // Breadcrumb - Pinned items (green)
        this.breadcrumbPinned = page.locator('//li[@class="Animation IsPinned"]')
        // Buttons Import/Export
        this.buttonImport = page.locator('(//cen-toolbar//*[@class="btn btn-small toolbarBtnWithPopover tc-btn-import"])[1]')
        this.buttonExport = page.locator('(//cen-toolbar//*[@class="btn btn-small toolbarBtnWithPopover tc-btn-export"])[1]')
        // Buttons - Report
        this.buttonReport = page.locator("(//button[@data-centest='button-report'])[1]")
        // Button - ClearAll
        this.buttonClearAll = page.locator("(//button[@data-centest='button-clearall'])[1]")
        // Inputs
        this.inputSearchGrid = page.locator('//cen-toolbar//*[@class="mainGrid-toolbar-searchCtl has-info-button"]')
        // Count - 25
        this.countIsPinned25 = page.locator('//span[@class="countIsPinned" and .="25"]')
        // Paging
        this.linkSelectOnly25ItemsOnThisPage = page.locator('//a[contains(.,"Select only 25 items on this page.")]')
        this.lableSelectedItems25 = page.locator('//*[@class="SelectedItemWrap alert alert-info" and .="Selected item(s) 25"]')
        this.selectGridPaging25 = page.locator('//select[contains(@name, "Main_Table_length")]')
        // Notifications
        this.notificationFiltresRemoved = page.locator('//*[@data-centest="notificationText" and .="Filters have been removed successfully."]')
        this.notificationPinApplied = page.locator('//*[@data-centest="notificationText" and .="Pin has been applied."]')
        this.notificationPinRemoved = page.locator('//*[@data-centest="notificationText" and .="Pin has been removed."]')

        this.buttonSettings = page.locator('(//cen-toolbar//*[@class="btn btn-small tc-btn-settings toolbarBtnWithPopover"])[1]')

        //Scope and filter selectors
        this.scopeButtonSites = page.locator('//li[@data-centest="SiteIdTBC"]//*[@class="breadcrumb-content"]/span')
        this.scopeButtonActiveFilterApplied = page.locator(" //li[contains(.,'Active')]//i[@class='fa fa-filter icon-custom-green']")
        this.scopeCheckboxSelectAllSites = page.locator('(//li[@class="breadcrumb-toolbar has-biggerCheckBox clearfix"]//input[@class="biggerCheckbox"])[1]')
        this.scopeButtonShow = page.locator('//*[@class="BreadCrumbsApplyBtnBig"]')
        this.buttonFiltersActive = page.locator("//div[@class='filtersSidePanelTriggerBtn']/i[@class='fa fa-filter']")
        this.buttonDeleteFilters = page.locator("//i[@class='fa fa-xmark icon-custom-grey']")

        this.buttonCollectedData = page.locator(".mainGrid-toolbar-btnCtl-inner [data-centest='button-colecteddata']")
        this.baseMain = new BaseMainOptions(page)
    }

    async createNewEnityForm() {
        await this.buttonCreateNewEntity.click()
    }

    async clearAllFilters() {
        await this.buttonClearAll.click()
        await this.waitForGridToLoad()
        await this.baseMain.closeNotification()
    }

    async waitForGridToLoad() {
        await this.page.locator('//div[contains(@id, "Table_processing") and @style="display: block"]').waitFor({ state: 'hidden' })
    }

    async clearScoping() {
        await this.scopeButtonSites.click({ position: { x: 10, y: 7 } })
        if (!await this.scopeCheckboxSelectAllSites.isChecked()) {
            await this.scopeCheckboxSelectAllSites.check()
            await this.scopeButtonShow.click()
            await this.waitForGridToLoad()
            await this.baseMain.closeNotification()
        }
    }

    async selectPaging25() {
        await this.selectGridPaging25.selectOption({ value: "25" })
    }

    async pin25Entities() {
        // To be sure we have selected only 25 we are using link and checking that there are only 25 selected
        await this.checkboxSelectAll.click()
        await this.linkSelectOnly25ItemsOnThisPage.click() // Use link
        await expect(this.lableSelectedItems25).toBeVisible() // Check there are only 25 item selected
        await this.buttonPin.click()
        await expect(this.notificationPinApplied).toBeVisible()
    }

    async verifyPiningOf25Entities() {
        await expect(this.buttonRemovePin).toBeVisible()
        await expect(this.breadcrumbPinned).toBeVisible()
        await expect.soft(this.countIsPinned25).toBeVisible()
    }

    async removePinOf25Entities() {
        // To be sure we have selected only 25 we are using link and checking that there are only 25 selected
        await this.buttonRemovePin.click()
        await expect(this.notificationPinRemoved).toBeVisible()
        await expect(this.notificationPinApplied).not.toBeVisible()
    }

    async verifyRemovalOfPinned25Entities() {
        await expect(this.buttonRemovePin).not.toBeVisible()
        await expect(this.breadcrumbPinned).not.toBeVisible()
        await expect(this.countIsPinned25).not.toBeVisible()
    }

    async resetToFactorySettings() {
        await this.buttonSettings.click()
        await this.page.waitForTimeout(5000)
        await this.page.locator('//button[contains(text(),"Reset to factory")]').click()
        await this.page.locator("//button[.='Reset toolbar to factory']").click()
        await this.page.locator('//button[contains(text(),"Save as default")]').click()
        await this.page.locator('//p[contains(text(),"Grid settings successfully saved.")]').isVisible()
    }

    async checkAndClickIfUnchecked(thisCheckbox): Promise<boolean> {
        const isChecked = await thisCheckbox.isChecked()
        if (!isChecked) {
            await thisCheckbox.click()
            return true
        }
        return false
    }
}