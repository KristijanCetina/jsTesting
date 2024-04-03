import { expect, Locator, Page, Download, Response } from '@playwright/test'

export class TopHeaderPage {    
    readonly page: Page
    readonly logoIMS: Locator
    readonly titleIMS: Locator
    readonly labelTestSite: Locator
    readonly linkHeaderSettings: Locator
    readonly linkHeaderHandbook: Locator
    readonly linkHeaderMyAccount: Locator
    readonly dropdownModulePicker: Locator
    readonly dropdownUnitSystemSelector: Locator
    readonly dropdownCurrencyPicker: Locator
    readonly linkLogOffCorpAdm: Locator
    
    constructor(page: Page) {    
        this.page = page
        this.logoIMS=page.locator('//div[@class="brand"]/span[@class="logo"]')
        this.titleIMS=page.locator('//div[@class="brand"]/span[.="Integrity Management System"]')
        this.labelTestSite=page.locator('//*[.="This is the test website"]')
        this.linkHeaderSettings=page.locator('//div[@class="top-header-part"]//span[.="Settings"]')
        this.linkHeaderHandbook=page.locator('//div[@class="top-header-part"]//span[.="Handbook"]')
        this.linkHeaderMyAccount=page.locator('//div[@class="top-header-part"]//span[.="My Account"]')
        this.dropdownModulePicker=page.locator('//div[@id="CenMetodologyDropdownComponent"]')
        this.dropdownUnitSystemSelector=page.locator('//span[@id="unitSystemSelector"]')
        this.dropdownCurrencyPicker=page.locator('//cen-currency-dropdown//a[@id="MainCurrencies"]')
        this.linkLogOffCorpAdm=page.locator('//span[.="Log off: corp  admin"]')
    }
}







