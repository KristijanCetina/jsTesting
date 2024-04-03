import { expect, Locator, Page, Download, Response } from '@playwright/test';
import { Common } from './Common';

export class ModulePickerPage {
    readonly page: Page;
    readonly common: Common
    readonly dropdownModulePicker: Locator;
    readonly peiExpander: Locator;
    readonly checkboxPeiCivil: Locator;
    readonly buttonPeiCivil: Locator;

    constructor(page: Page) {
        this.page = page;
        this.common = new Common(page)
        this.dropdownModulePicker = page.locator('//div[@id="CenMetodologyDropdownComponent"]');
        this.peiExpander = page.locator("//span[@class='dropdown-menu-item-with-options-btn-spanBtn']/b[@class='caret']")
        this.checkboxPeiCivil = page.locator("(//div[@class='dropdown-menu-option']//input)[2]")
        this.buttonPeiCivil = page.locator("//label[contains(.,'Include CIVIL')]")
    }

    async goToPEI(link) {
        await this.page.goto(link + '#peifloc');
        await this.common.waitForGridToLoad()
        await expect(this.page.locator('//*[@id="CenMetodologyDropdownComponent"]/a/span')).toContainText('PEI');
    }

    async goToRCM(link) {
        await this.page.goto(link + '#rcmfloc');
        await this.common.waitForGridToLoad()
        await expect(this.page.locator('//*[@id="CenMetodologyDropdownComponent"]/a/span')).toHaveText('RCM');
    }

    async goToPLSS(link) {
        await this.page.goto(link + '#plssfloc');
        await this.common.waitForGridToLoad()
        await expect(this.page.locator('//*[@id="CenMetodologyDropdownComponent"]/a/span')).toHaveText('PLSS');
    }

    async goToSIF(link) {
        await this.page.goto(link + '#siffloc');
        await this.common.waitForGridToLoad()
        await expect(this.page.locator('//*[@id="CenMetodologyDropdownComponent"]/a/span')).toHaveText('SIS');
    
    }

    async goToFCM(link) {
        await this.page.goto(link + '#fcmfloc');
        await this.common.waitForGridToLoad()
        await expect(this.page.locator('//*[@id="CenMetodologyDropdownComponent"]/a/span')).toHaveText('FCM');
    }

    async selectCivil() {
        await this.dropdownModulePicker.click()
        await this.peiExpander.hover()
        if (!await this.checkboxPeiCivil.isChecked()) {
            await this.checkboxPeiCivil.hover()
            await this.page.waitForTimeout(1000)
            await this.buttonPeiCivil.click();
        }
        await this.page.waitForLoadState()
    }
}







